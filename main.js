"use strict";var p=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var v=Object.prototype.hasOwnProperty;var b=(o,e)=>{for(var t in e)p(o,t,{get:e[t],enumerable:!0})},E=(o,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of x(e))!v.call(o,n)&&n!==t&&p(o,n,{get:()=>e[n],enumerable:!(a=S(e,n))||a.enumerable});return o};var w=o=>E(p({},"__esModule",{value:!0}),o);var M={};b(M,{default:()=>h});module.exports=w(M);var r=require("obsidian"),A={},h=class extends r.Plugin{async onload(){await this.loadSettings(),this.addCommand({id:"open-summary-modal",name:"Open summary editor",callback:()=>{this.openSummaryModal()}}),this.addSettingTab(new g(this.app,this))}onunload(){}async loadSettings(){this.settings=Object.assign({},A,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}openSummaryModal(){let e=this.app.workspace.getActiveFile();e&&new d(this.app,this,e).open()}},d=class extends r.Modal{constructor(t,a,n){super(t);this.existingSummary="";this.plugin=a,this.file=n}async onOpen(){let{contentEl:t}=this;t.empty(),t.addClass("my-summary-modal"),t.createEl("h2",{text:"My Summary"}),await this.loadExistingSummary();let n=t.createDiv("my-summary-content-wrapper").createDiv("my-summary-textarea-container");this.textArea=new r.TextAreaComponent(n),this.textArea.inputEl.addClass("my-summary-textarea"),this.textArea.inputEl.placeholder="Enter your summary here...",this.textArea.setValue(this.existingSummary);let s=t.createDiv("my-summary-button-container");s.createEl("button",{text:"Cancel",cls:"my-summary-button my-summary-cancel-button"}).addEventListener("click",()=>{this.close()}),s.createEl("button",{text:"Save",cls:"my-summary-button my-summary-save-button"}).addEventListener("click",async()=>{await this.saveSummary(),this.close()}),this.textArea.inputEl.focus()}onClose(){let{contentEl:t}=this;t.empty()}async loadExistingSummary(){try{let t=await this.app.vault.read(this.file);console.log("Loading existing summary from file:",this.file.path);let a=t;if(t.startsWith(`---
`)){let i=t.indexOf(`
---
`,4);i!==-1&&(a=t.substring(i+5))}let n=/^## 0\. My Summary\s*\n([\s\S]*?)(?:\n---)/m,s=a.match(n);if(console.log("Summary match found:",!!s),s&&s[1]){let i=s[1].trim();if(console.log("Raw summary content:",i),i.includes("[!summary]")){let y=i.split(`
`),l=[],c=!1;for(let m=0;m<y.length;m++){let u=y[m];if(u.includes("[!summary]")){c=!1;continue}if(u.startsWith(">")){let f=u.replace(/^>\s?/,"");f.trim()&&l.push(f)}else u.trim()&&l.push(u)}i=l.join(`
`).trim()}console.log("Parsed summary content:",i),i&&(this.existingSummary=i)}else console.log("No summary section found")}catch(t){console.error("Error loading existing summary:",t)}}async saveSummary(){try{let t=this.textArea.getValue().trim();if(!t)return;let a=await this.app.vault.read(this.file),n="",s=a;if(a.startsWith(`---
`)){let m=a.indexOf(`
---
`,4);m!==-1&&(n=a.substring(0,m+5),s=a.substring(m+5))}let i=/^## 0\. My Summary[\s\S]*?\n---/m;s=s.replace(i,"").trim();let l=`## 0. My Summary

> [!summary]
${t.split(`
`).map(m=>`> ${m}`).join(`
`)}

---`,c=n;n&&!n.endsWith(`
`)&&(c+=`
`),c+=l,s&&(c+=`

`+s),await this.app.vault.modify(this.file,c)}catch(t){console.error("Error saving summary:",t)}}},g=class extends r.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"My Summary Settings"}),new r.Setting(e).setName("Keyboard shortcut").setDesc('Configure the keyboard shortcut in Settings \u2192 Hotkeys \u2192 Search for "My Summary"').addButton(t=>t.setButtonText("Open Hotkeys Settings").onClick(()=>{this.app.setting.openTabById("hotkeys"),this.app.setting.activeTab.searchInputEl.value="My Summary",this.app.setting.activeTab.updateHotkeyVisibility()})),new r.Setting(e).setName("About").setDesc("This plugin helps you create and manage personal summaries based on Kim Ik-han's archiving methodology.")}};
