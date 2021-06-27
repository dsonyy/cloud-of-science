import Cloud from "./cloud";
import Hammer from "hammerjs";

export default class App {
  constructor(element) {
    // General
    this.element = element;

    // Cloud
    this.cloud = new Cloud(element);

    // Events handling
    window.addEventListener("resize", (e) => this.onResize(e));
    this.element.addEventListener("pointermove", (e) => this.onPointerMove(e));
    this.element.addEventListener("pointerdown", (e) => this.onPointerDown(e));

    // Hammer events handling
    this.hammerManager = new Hammer.Manager(this.element, {
      recognizers: [[Hammer.Pan], [Hammer.Pinch]],
    });
    this.hammerManager.on("pan", (e) => this.onPointerPan(e));
    this.hammerManager.on("pinch", (e) => this.onPointersPinch(e));
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

    if (this.cloud.pointerRaycaster.hoveredNode == null) {
      this.element.style.cursor = "auto";
    } else {
      this.element.style.cursor = "pointer";
    }
  }

  onPointerDown(e) {
    this.cloud.pointerRaycaster.onPointerDown(e);
  }

  onPointerPan(e) {
    this.cloud.PointerRotation.onPointerPan(e);
  }

  onPointersPinch(e) {
    this.cloud.PointerRotation.onPointersPinch(e);
  }
}
