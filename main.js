"use strict";var y=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var x=(r,e)=>{for(var t in e)y(r,t,{get:e[t],enumerable:!0})},v=(r,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of S(e))!f.call(r,n)&&n!==t&&y(r,n,{get:()=>e[n],enumerable:!(s=g(e,n))||s.enumerable});return r};var b=r=>v(y({},"__esModule",{value:!0}),r);var w={};x(w,{default:()=>c});module.exports=b(w);var i=require("obsidian"),E={},c=class extends i.Plugin{async onload(){await this.loadSettings(),this.addCommand({id:"open-summary-modal",name:"Open summary editor",callback:()=>{this.openSummaryModal()}}),this.addSettingTab(new p(this.app,this))}onunload(){}async loadSettings(){this.settings=Object.assign({},E,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}openSummaryModal(){let e=this.app.workspace.getActiveFile();e&&new l(this.app,this,e).open()}},l=class extends i.Modal{constructor(t,s,n){super(t);this.existingSummary="";this.plugin=s,this.file=n}async onOpen(){let{contentEl:t}=this;t.empty(),t.addClass("my-summary-modal"),t.createEl("h2",{text:"My Summary"}),await this.loadExistingSummary();let n=t.createDiv("my-summary-content-wrapper").createDiv("my-summary-textarea-container");this.textArea=new i.TextAreaComponent(n),this.textArea.inputEl.addClass("my-summary-textarea"),this.textArea.inputEl.placeholder="Enter your summary here...",this.textArea.setValue(this.existingSummary);let a=t.createDiv("my-summary-button-container");a.createEl("button",{text:"Cancel",cls:"my-summary-button my-summary-cancel-button"}).addEventListener("click",()=>{this.close()}),a.createEl("button",{text:"Save",cls:"my-summary-button my-summary-save-button"}).addEventListener("click",async()=>{await this.saveSummary(),this.close()}),this.textArea.inputEl.focus()}onClose(){let{contentEl:t}=this;t.empty()}async loadExistingSummary(){try{let t=await this.app.vault.read(this.file),s=t;if(t.startsWith(`---
`)){let a=t.indexOf(`
---
`,4);a!==-1&&(s=t.substring(a+5))}let n=s.match(/^## 0\. My Summary\n([\s\S]*?)(?=\n---$|\n---\n|$)/m);if(n&&n[1]){let a=n[1].trim();a.startsWith("> [!summary]")&&(a=a.replace(/^>\s*\[!summary\]\s*\n?/,"").split(`
`).map(o=>o.replace(/^>\s?/,"")).join(`
`).trim()),this.existingSummary=a}}catch(t){console.error("Error loading existing summary:",t)}}async saveSummary(){try{let t=this.textArea.getValue().trim();if(!t)return;let s=await this.app.vault.read(this.file),n="",a=s;if(s.startsWith(`---
`)){let m=s.indexOf(`
---
`,4);m!==-1&&(n=s.substring(0,m+5),a=s.substring(m+5))}let o=/^## 0\. My Summary\n[\s\S]*?(?=\n---\n|$)/m;a=a.replace(o,"").trim(),a.startsWith(`---
`)&&(a=a.substring(4).trim());let d=`## 0. My Summary

> [!summary]
${t.split(`
`).map(m=>`> ${m}`).join(`
`)}

---`,u=n;n&&!n.endsWith(`
`)&&(u+=`
`),u+=d,a&&(u+=`

`+a),await this.app.vault.modify(this.file,u)}catch(t){console.error("Error saving summary:",t)}}},p=class extends i.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"My Summary Settings"}),new i.Setting(e).setName("Keyboard shortcut").setDesc('Configure the keyboard shortcut in Settings \u2192 Hotkeys \u2192 Search for "My Summary"').addButton(t=>t.setButtonText("Open Hotkeys Settings").onClick(()=>{this.app.setting.openTabById("hotkeys"),this.app.setting.activeTab.searchInputEl.value="My Summary",this.app.setting.activeTab.updateHotkeyVisibility()})),new i.Setting(e).setName("About").setDesc("This plugin helps you create and manage personal summaries based on Kim Ik-han's archiving methodology.")}};
