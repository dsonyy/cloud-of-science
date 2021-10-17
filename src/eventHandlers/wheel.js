import * as THREE from "three";

export default class Wheel {
  constructor(camera, fog) {
    this.camera = camera;
    this.fog = fog;

    this.factor = 0.01;

    this.home = this.camera.position.z;
    this.max = 27;
    this.min = 14;
  }

  update(e) {
    const z = -this.factor * e.deltaY;
    if (
      this.camera.position.z + z >= this.min &&
      this.camera.position.z + z <= this.max
    ) {
      this.camera.position.z += z;
      this.fog.near += z;
      this.fog.far += z;
    }
  }
}
