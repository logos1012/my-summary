import { App, Plugin, PluginSettingTab, Setting, Command, TFile, Modal, TextAreaComponent } from 'obsidian';

// 플러그인 설정 인터페이스
interface MySummarySettings {
  // 향후 추가 설정을 위한 인터페이스
}

const DEFAULT_SETTINGS: MySummarySettings = {
  // 기본 설정값
}

export default class MySummaryPlugin extends Plugin {
  settings: MySummarySettings;

  async onload() {
    await this.loadSettings();

    // 커맨드 등록 - 요약 팝업 열기
    this.addCommand({
      id: 'open-summary-modal',
      name: 'Open summary editor',
      callback: () => {
        this.openSummaryModal();
      }
    });

    // 설정 탭 추가
    this.addSettingTab(new MySummarySettingTab(this.app, this));
  }

  onunload() {
    // 플러그인 언로드 시 정리 작업
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  // 요약 모달 열기
  openSummaryModal() {
    const activeFile = this.app.workspace.getActiveFile();

    if (!activeFile) {
      // 활성화된 파일이 없는 경우
      return;
    }

    new SummaryModal(this.app, this, activeFile).open();
  }
}

// 요약 입력 모달 클래스
class SummaryModal extends Modal {
  plugin: MySummaryPlugin;
  file: TFile;
  textArea: TextAreaComponent;
  existingSummary: string = '';

  constructor(app: App, plugin: MySummaryPlugin, file: TFile) {
    super(app);
    this.plugin = plugin;
    this.file = file;
  }

  async onOpen() {
    const { contentEl } = this;

    contentEl.empty();
    contentEl.addClass('my-summary-modal');

    // 모달 제목
    contentEl.createEl('h2', { text: 'My Summary' });

    // 기존 요약 내용 가져오기
    await this.loadExistingSummary();

    // 텍스트 영역 생성
    const textAreaContainer = contentEl.createDiv();
    this.textArea = new TextAreaComponent(textAreaContainer);
    this.textArea.inputEl.addClass('my-summary-textarea');
    this.textArea.inputEl.placeholder = 'Enter your summary here...';
    this.textArea.setValue(this.existingSummary);

    // 버튼 컨테이너
    const buttonContainer = contentEl.createDiv('my-summary-button-container');

    // 취소 버튼
    const cancelButton = buttonContainer.createEl('button', {
      text: 'Cancel',
      cls: 'my-summary-button my-summary-cancel-button'
    });
    cancelButton.addEventListener('click', () => {
      this.close();
    });

    // 저장 버튼
    const saveButton = buttonContainer.createEl('button', {
      text: 'Save',
      cls: 'my-summary-button my-summary-save-button'
    });
    saveButton.addEventListener('click', async () => {
      await this.saveSummary();
      this.close();
    });

    // 텍스트 영역에 포커스
    this.textArea.inputEl.focus();
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }

  // 기존 요약 내용 로드
  async loadExistingSummary() {
    try {
      const content = await this.app.vault.read(this.file);

      // 프론트매터가 있는지 확인
      let contentWithoutFrontmatter = content;
      if (content.startsWith('---\n')) {
        const endOfFrontmatter = content.indexOf('\n---\n', 4);
        if (endOfFrontmatter !== -1) {
          contentWithoutFrontmatter = content.substring(endOfFrontmatter + 5);
        }
      }

      // "## 0. My Summary" 섹션 찾기
      const summaryMatch = contentWithoutFrontmatter.match(/^## 0\. My Summary\n([\s\S]*?)(?=\n## |$)/m);

      if (summaryMatch && summaryMatch[1]) {
        this.existingSummary = summaryMatch[1].trim();
      }
    } catch (error) {
      console.error('Error loading existing summary:', error);
    }
  }

  // 요약 저장
  async saveSummary() {
    try {
      const summaryText = this.textArea.getValue().trim();

      if (!summaryText) {
        return;
      }

      let content = await this.app.vault.read(this.file);

      // 프론트매터 처리
      let frontmatter = '';
      let contentWithoutFrontmatter = content;

      if (content.startsWith('---\n')) {
        const endOfFrontmatter = content.indexOf('\n---\n', 4);
        if (endOfFrontmatter !== -1) {
          frontmatter = content.substring(0, endOfFrontmatter + 5);
          contentWithoutFrontmatter = content.substring(endOfFrontmatter + 5);
        }
      }

      // 기존 "## 0. My Summary" 섹션 제거
      const summaryRegex = /^## 0\. My Summary\n[\s\S]*?(?=\n## |$)/m;
      contentWithoutFrontmatter = contentWithoutFrontmatter.replace(summaryRegex, '').trim();

      // 새로운 요약 섹션 생성
      const newSummarySection = `## 0. My Summary\n\n${summaryText}\n`;

      // 최종 콘텐츠 조합
      let finalContent = frontmatter;
      if (frontmatter && !frontmatter.endsWith('\n')) {
        finalContent += '\n';
      }
      finalContent += newSummarySection;
      if (contentWithoutFrontmatter) {
        finalContent += '\n' + contentWithoutFrontmatter;
      }

      // 파일에 저장
      await this.app.vault.modify(this.file, finalContent);

    } catch (error) {
      console.error('Error saving summary:', error);
    }
  }
}

// 설정 탭 클래스
class MySummarySettingTab extends PluginSettingTab {
  plugin: MySummaryPlugin;

  constructor(app: App, plugin: MySummaryPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'My Summary Settings' });

    // 단축키 설정 안내
    new Setting(containerEl)
      .setName('Keyboard shortcut')
      .setDesc('Configure the keyboard shortcut in Settings → Hotkeys → Search for "My Summary"')
      .addButton(button => button
        .setButtonText('Open Hotkeys Settings')
        .onClick(() => {
          // 핫키 설정 페이지 열기
          (this.app as any).setting.openTabById('hotkeys');
          (this.app as any).setting.activeTab.searchInputEl.value = 'My Summary';
          (this.app as any).setting.activeTab.updateHotkeyVisibility();
        }));

    // 향후 추가 설정 항목들을 여기에 추가할 수 있습니다
    new Setting(containerEl)
      .setName('About')
      .setDesc('This plugin helps you create and manage personal summaries based on Kim Ik-han\'s archiving methodology.');
  }
}