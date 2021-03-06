export default class PointerLightMovement {
  constructor(element, object, areaWidth, areaHeight) {
    this.element = element;
    this.object = object;
    this.width = areaWidth;
    this.height = areaHeight;
  }

  onPointerMove(e) {
    if (e.pointerType != "mouse") return;

    if (this.element.contains(e.target)) {
      const rect = this.element.getBoundingClientRect();
      this.object.position.x =
        ((e.offsetX - rect.width / 2) / rect.width) * this.width;
      this.object.position.y =
        (-(e.offsetY - rect.height / 2) / rect.height) * this.height;
    }
  }
}
