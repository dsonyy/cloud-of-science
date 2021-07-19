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
    window.addEventListener("wheel", (e) => this.onWheel(e));
    this.canvasElement.addEventListener("pointermove", (e) =>
      this.onPointerMove(e)
    );
    this.canvasElement.addEventListener("pointerleave", (e) =>
      this.onPointerLeave(e)
    );

    // Hammer events handling
    this.hammerManager = new Hammer.Manager(this.canvasElement, {
      recognizers: [[Hammer.Pan], [Hammer.Tap]],
    });
    this.hammerManager.on("pan", (e) => this.onPointerPan(e));
    this.hammerManager.on("tap", (e) => this.onPointerTap(e));
  }

  update() {
    debugInfo.update("debug");
    this.cloud.update();
    this.cloud.render();
  }

  onResize(e) {
    this.cloud.onWindowResize(e);
  }

  onWheel(e) {
    this.cloud.onWheel(e);
  }

  onPointerMove(e) {
    this.cloud.pointerLightMovement.onPointerMove(e);

    this.cloud.pointerRaycaster.onPointerMove(e);
    if (this.cloud.pointerRaycaster.hovered) {
      this.element.style.cursor = "pointer";
    } else {
      this.element.style.cursor = "auto";
    }
  }

  onPointerLeave(e) {
    this.cloud.pointerRaycaster.onPointerLeave(e);
  }

  onPointerPan(e) {
    this.cloud.pointerRotation.onPointerPan(e);
  }

  onPointerTap(e) {
    this.cloud.pointerRaycaster.onPointerTap(e);
  }
}
