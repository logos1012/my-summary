"use strict";var h=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var x=(o,e)=>{for(var t in e)h(o,t,{get:e[t],enumerable:!0})},b=(o,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of S(e))!f.call(o,n)&&n!==t&&h(o,n,{get:()=>e[n],enumerable:!(a=g(e,n))||a.enumerable});return o};var v=o=>b(h({},"__esModule",{value:!0}),o);var w={};x(w,{default:()=>l});module.exports=v(w);var r=require("obsidian"),E={},l=class extends r.Plugin{async onload(){await this.loadSettings(),this.addCommand({id:"open-summary-modal",name:"Open summary editor",callback:()=>{this.openSummaryModal()}}),this.addSettingTab(new d(this.app,this))}onunload(){}async loadSettings(){this.settings=Object.assign({},E,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}openSummaryModal(){let e=this.app.workspace.getActiveFile();e&&new p(this.app,this,e).open()}},p=class extends r.Modal{constructor(t,a,n){super(t);this.existingSummary="";this.plugin=a,this.file=n}async onOpen(){let{contentEl:t}=this;t.empty(),t.addClass("my-summary-modal"),t.createEl("h2",{text:"My Summary"}),await this.loadExistingSummary();let n=t.createDiv("my-summary-content-wrapper").createDiv("my-summary-textarea-container");this.textArea=new r.TextAreaComponent(n),this.textArea.inputEl.addClass("my-summary-textarea"),this.textArea.inputEl.placeholder="Enter your summary here...",this.textArea.setValue(this.existingSummary);let s=t.createDiv("my-summary-button-container");s.createEl("button",{text:"Cancel",cls:"my-summary-button my-summary-cancel-button"}).addEventListener("click",()=>{this.close()}),s.createEl("button",{text:"Save",cls:"my-summary-button my-summary-save-button"}).addEventListener("click",async()=>{await this.saveSummary(),this.close()}),this.textArea.inputEl.focus()}onClose(){let{contentEl:t}=this;t.empty()}async loadExistingSummary(){try{let t=await this.app.vault.read(this.file);console.log("Loading existing summary from file:",this.file.path);let a=t;if(t.startsWith(`---
`)){let i=t.indexOf(`
---
`,4);i!==-1&&(a=t.substring(i+5))}let n=/^## 0\. My Summary\s*\n([\s\S]*?)(?=\n---|\n##|$)/m,s=a.match(n);if(console.log("Summary match found:",!!s),s&&s[1]){let i=s[1].trim();if(console.log("Raw summary content:",i),i.includes("[!summary]")){let y=i.split(`
`),u=[];for(let m of y)m.includes("[!summary]")||(m.startsWith(">")?u.push(m.substring(1).trim()):u.push(m));i=u.join(`
`).trim()}console.log("Parsed summary content:",i),this.existingSummary=i}else console.log("No summary section found")}catch(t){console.error("Error loading existing summary:",t)}}async saveSummary(){try{let t=this.textArea.getValue().trim();if(!t)return;let a=await this.app.vault.read(this.file),n="",s=a;if(a.startsWith(`---
`)){let c=a.indexOf(`
---
`,4);c!==-1&&(n=a.substring(0,c+5),s=a.substring(c+5))}let i=/^## 0\. My Summary\n[\s\S]*?(?=\n---\n|$)/m;s=s.replace(i,"").trim(),s.startsWith(`---
`)&&(s=s.substring(4).trim());let u=`## 0. My Summary

> [!summary]
${t.split(`
`).map(c=>`> ${c}`).join(`
`)}

---`,m=n;n&&!n.endsWith(`
`)&&(m+=`
`),m+=u,s&&(m+=`

`+s),await this.app.vault.modify(this.file,m)}catch(t){console.error("Error saving summary:",t)}}},d=class extends r.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"My Summary Settings"}),new r.Setting(e).setName("Keyboard shortcut").setDesc('Configure the keyboard shortcut in Settings \u2192 Hotkeys \u2192 Search for "My Summary"').addButton(t=>t.setButtonText("Open Hotkeys Settings").onClick(()=>{this.app.setting.openTabById("hotkeys"),this.app.setting.activeTab.searchInputEl.value="My Summary",this.app.setting.activeTab.updateHotkeyVisibility()})),new r.Setting(e).setName("About").setDesc("This plugin helps you create and manage personal summaries based on Kim Ik-han's archiving methodology.")}};
