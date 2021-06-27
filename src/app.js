import Cloud from "./cloud";

export default class App {
  constructor(element) {
    // General
    this.element = element;

    // Cloud
    this.cloud = new Cloud(element);

    // Global events handling
    window.addEventListener("resize", (e) => this.onResize(e));
    this.element.addEventListener("mousemove", (e) => this.onMouseMove(e));
    this.element.addEventListener("mousedown", (e) => this.onMouseDown(e));
    this.element.addEventListener("mouseup", (e) => this.onMouseUp(e));
    this.element.addEventListener("mouseleave", (e) => this.onMouseLeave(e));
  }

  update() {
    this.cloud.update();
    this.cloud.render();
  }

  onResize(e) {
    this.cloud.onWindowResize(e);
  }

  onMouseMove(e) {
    this.cloud.mouseLightMovement.onMouseMove(e);
    this.cloud.mouseRaycaster.onMouseMove(e);
    this.cloud.mouseRotation.onMouseMove(e);

    if (this.cloud.mouseRaycaster.hoveredNode == null) {
      this.element.style.cursor = "auto";
    } else {
      this.element.style.cursor = "pointer";
    }
  }

  onMouseDown(e) {
    this.cloud.mouseRaycaster.onMouseDown(e);
    this.cloud.mouseRotation.onMouseDown(e);
  }

  onMouseUp(e) {
    this.cloud.mouseRotation.onMouseUp(e);
  }

  onMouseLeave(e) {
    console.log("left");
    this.cloud.mouseRotation.onMouseLeave(e);
  }
}
