import Cloud from "./cloud";

export default class App {
  constructor(element) {
    // General
    this.element = element;

    // Cloud
    this.cloud = new Cloud(element);

    // Global events handling
    window.addEventListener("resize", (e) => this.onResize(e));
    this.element.addEventListener("pointermove", (e) => this.onPointerMove(e));
    this.element.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    this.element.addEventListener("pointerup", (e) => this.onPointerUp(e));
  }

  update() {
    this.cloud.update();
    this.cloud.render();
  }

  onResize(e) {
    this.cloud.onWindowResize(e);
  }

  onPointerMove(e) {
    this.cloud.mouseLightMovement.onPointerMove(e);
    this.cloud.mouseRaycaster.onPointerMove(e);
    this.cloud.mouseRotation.onPointerMove(e);

    if (this.cloud.mouseRaycaster.hoveredNode == null) {
      this.element.style.cursor = "auto";
    } else {
      this.element.style.cursor = "pointer";
    }
  }

  onPointerDown(e) {
    this.cloud.mouseRaycaster.onPointerDown(e);
    this.cloud.mouseRotation.onPointerDown(e);
  }

  onPointerUp(e) {
    this.cloud.mouseRotation.onPointerUp(e);
  }
}
