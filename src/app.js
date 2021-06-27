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
    this.element.addEventListener("pointerleave", (e) =>
      this.onPointerLeave(e)
    );
  }

  update() {
    this.cloud.update();
    this.cloud.render();
  }

  onResize(e) {
    this.cloud.onWindowResize(e);
  }

  onPointerMove(e) {
    this.cloud.pointerLightMovement.onPointerMove(e);
    this.cloud.pointerRaycaster.onPointerMove(e);
    this.cloud.pointerRotation.onPointerMove(e);

    if (this.cloud.pointerRaycaster.hoveredNode == null) {
      this.element.style.cursor = "auto";
    } else {
      this.element.style.cursor = "pointer";
    }
  }

  onPointerDown(e) {
    this.cloud.pointerRaycaster.onPointerDown(e);
    this.cloud.pointerRotation.onPointerDown(e);
  }

  onPointerUp(e) {
    this.cloud.pointerRotation.onPointerUp(e);
  }

  onPointerLeave(e) {
    this.cloud.pointerRotation.onPointerLeave(e);
  }
}
