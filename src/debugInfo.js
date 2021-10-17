export class DebugInfo {
  constructor() {
    this.content = {};
  }

  update(id) {
    let str = "";
    for (const [key, value] of Object.entries(this.content)) {
      str += key + ":\t" + value + "\n";
    }
    const element = document.getElementById(id);
    if (element) element.innerHTML = str;
  }
}

export const debugInfo = new DebugInfo("debug");
