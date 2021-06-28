import Cloud from "./cloud";
import Hammer from "hammerjs";
import { debugInfo } from "./debugInfo";

export default class App {
  constructor(element) {
    // General
    this.element = element;

    // Cloud
    this.cloud = new Cloud(element);
    this.canvasElement = this.cloud.canvasElement;

    // Events handling
    window.addEventListener("resize", (e) => this.onResize(e));
    this.element.addEventListener("pointermove", (e) => this.onPointerMove(e));
    this.element.addEventListener("pointerdown", (e) => this.onPointerDown(e));

    // Hammer events handling
    this.hammerManager = new Hammer.Manager(this.canvasElement, {
      recognizers: [[Hammer.Pan]],
    });
    this.hammerManager.on("pan", (e) => this.onPointerPan(e));
  }

  update() {
    debugInfo.update("debug");
    this.cloud.update();
    this.cloud.render();
  }

  onResize(e) {
    this.cloud.onWindowResize(e);
  }

  onPointerMove(e) {
    this.cloud.pointerLightMovement.onPointerMove(e);

    // this.cloud.pointerRaycaster.onPointerMove(e);
    // if (this.cloud.pointerRaycaster.hoveredNode == null) {
    //   this.element.style.cursor = "auto";
    // } else {
    //   this.element.style.cursor = "pointer";
    // }
  }

  onPointerDown(e) {
    // this.cloud.pointerRaycaster.onPointerDown(e);
  }

  onPointerPan(e) {
    this.cloud.PointerRotation.onPointerPan(e);
  }
}
