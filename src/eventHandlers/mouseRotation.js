import * as THREE from "three";

export default class MouseRotation {
  constructor(element, object) {
    this.element = element;
    this.object = object;

    this.pointerHolding = false;
    this.slowingDown = false;

    this.slowDownFactor = 0.92;
    this.moveSpeedFactor = 0.0001;
    this.moveSpeedMax = 400;
    this.moveSpeedMin = 3;

    this.vectorX = 0;
    this.vectorY = 10;
  }

  update() {
    if (Math.abs(this.vectorY) > this.moveSpeedMax)
      this.vectorY = Math.sign(this.vectorY) * this.moveSpeedMax;
    if (Math.abs(this.vectorX) > this.moveSpeedMax)
      this.vectorX = Math.sign(this.vectorX) * this.moveSpeedMax;

    if (this.pointerHolding) {
      this.object.rotateOnWorldAxis(
        new THREE.Vector3(0, 1, 0),
        this.vectorY * this.moveSpeedFactor
      );
      this.object.rotateOnWorldAxis(
        new THREE.Vector3(1, 0, 0),
        this.vectorX * this.moveSpeedFactor
      );
    } else {
      this.object.rotateOnWorldAxis(
        new THREE.Vector3(0, 1, 0),
        this.vectorY * this.moveSpeedFactor
      );
      this.object.rotateOnWorldAxis(
        new THREE.Vector3(1, 0, 0),
        this.vectorX * this.moveSpeedFactor
      );

      // Slowing down
      if (this.slowingDown) {
        this.vectorY *= this.slowDownFactor;
        if (Math.abs(this.vectorY) < this.moveSpeedMin) this.vectorY = 0;

        this.vectorX *= this.slowDownFactor;
        if (Math.abs(this.vectorX) < this.moveSpeedMin) this.vectorX = 0;
      }
    }
  }

  onPointerMove(e) {
    if (this.pointerHolding) {
      this.vectorY += e.movementX;
      this.vectorX += e.movementY;
    }
  }

  onPointerDown(e) {
    if (this.element.contains(e.target)) {
      this.vectorY = 0;
      this.vectorX = 0;
      this.pointerHolding = true;
    }
  }

  onPointerUp(e) {
    this.pointerHolding = false;
    this.slowingDown = true;
  }
}
