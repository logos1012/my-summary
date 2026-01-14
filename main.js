"use strict";var l=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var x=(r,e)=>{for(var t in e)l(r,t,{get:e[t],enumerable:!0})},v=(r,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of S(e))!f.call(r,a)&&a!==t&&l(r,a,{get:()=>e[a],enumerable:!(s=g(e,a))||s.enumerable});return r};var b=r=>v(l({},"__esModule",{value:!0}),r);var w={};x(w,{default:()=>u});module.exports=b(w);var i=require("obsidian"),E={},u=class extends i.Plugin{async onload(){await this.loadSettings(),this.addCommand({id:"open-summary-modal",name:"Open summary editor",callback:()=>{this.openSummaryModal()}}),this.addSettingTab(new p(this.app,this))}onunload(){}async loadSettings(){this.settings=Object.assign({},E,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}openSummaryModal(){let e=this.app.workspace.getActiveFile();e&&new h(this.app,this,e).open()}},h=class extends i.Modal{constructor(t,s,a){super(t);this.existingSummary="";this.plugin=s,this.file=a}async onOpen(){let{contentEl:t}=this;t.empty(),t.addClass("my-summary-modal"),t.createEl("h2",{text:"My Summary"}),await this.loadExistingSummary();let a=t.createDiv("my-summary-content-wrapper").createDiv("my-summary-textarea-container");this.textArea=new i.TextAreaComponent(a),this.textArea.inputEl.addClass("my-summary-textarea"),this.textArea.inputEl.placeholder="Enter your summary here...",this.textArea.setValue(this.existingSummary);let n=t.createDiv("my-summary-button-container");n.createEl("button",{text:"Cancel",cls:"my-summary-button my-summary-cancel-button"}).addEventListener("click",()=>{this.close()}),n.createEl("button",{text:"Save",cls:"my-summary-button my-summary-save-button"}).addEventListener("click",async()=>{await this.saveSummary(),this.close()}),this.textArea.inputEl.focus()}onClose(){let{contentEl:t}=this;t.empty()}async loadExistingSummary(){try{let t=await this.app.vault.read(this.file),s=t;if(t.startsWith(`---
`)){let n=t.indexOf(`
---
`,4);n!==-1&&(s=t.substring(n+5))}let a=s.match(/^## 0\. My Summary\n([\s\S]*?)(?=\n---\n|$)/m);if(a&&a[1]){let n=a[1].trim(),m=n.match(/^>\s*\[!summary\]\s*\n((?:>\s*.*\n?)*)/m);m&&m[1]&&(n=m[1].split(`
`).map(y=>y.replace(/^>\s?/,"")).join(`
`).trim()),this.existingSummary=n}}catch(t){console.error("Error loading existing summary:",t)}}async saveSummary(){try{let t=this.textArea.getValue().trim();if(!t)return;let s=await this.app.vault.read(this.file),a="",n=s;if(s.startsWith(`---
`)){let o=s.indexOf(`
---
`,4);o!==-1&&(a=s.substring(0,o+5),n=s.substring(o+5))}let m=/^## 0\. My Summary\n[\s\S]*?(?=\n---\n|$)/m;n=n.replace(m,"").trim(),n.startsWith(`---
`)&&(n=n.substring(4).trim());let d=`## 0. My Summary

> [!summary]
${t.split(`
`).map(o=>`> ${o}`).join(`
`)}

---`,c=a;a&&!a.endsWith(`
`)&&(c+=`
`),c+=d,n&&(c+=`

`+n),await this.app.vault.modify(this.file,c)}catch(t){console.error("Error saving summary:",t)}}},p=class extends i.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"My Summary Settings"}),new i.Setting(e).setName("Keyboard shortcut").setDesc('Configure the keyboard shortcut in Settings \u2192 Hotkeys \u2192 Search for "My Summary"').addButton(t=>t.setButtonText("Open Hotkeys Settings").onClick(()=>{this.app.setting.openTabById("hotkeys"),this.app.setting.activeTab.searchInputEl.value="My Summary",this.app.setting.activeTab.updateHotkeyVisibility()})),new i.Setting(e).setName("About").setDesc("This plugin helps you create and manage personal summaries based on Kim Ik-han's archiving methodology.")}};
