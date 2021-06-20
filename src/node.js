import * as THREE from "three";

export default class Node {
  constructor(x, y, z, content) {
    this.content = content;

    // Ball
    this.geometry = new THREE.SphereGeometry(0.5, 40, 40);
    this.material = new THREE.MeshBasicMaterial({
      color: this.content.color,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);

    this.colorLightnessFactor = 0.5;
    this.colorMaxLightness = 0.2;

    // Icon
    this.map = new THREE.TextureLoader().load(content.icon);
    const material = new THREE.SpriteMaterial({ map: this.map });
    this.icon = new THREE.Sprite(material);
  }

  static get randomColor() {
    const palette = [0xe56566, 0x98469a, 0xb0d4b0, 0xeeb475, 0x6c82be];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  updateColorWithDistance(cloudRadius = 1) {
    const dist = this.calcDistance(cloudRadius);
    if (dist >= 0) {
      this.material.color.setHex(this.content.color);
    } else {
      const color = new THREE.Color(this.content.color);
      let l = this.colorLightnessFactor * -dist;
      if (l > this.colorMaxLightness) l = this.colorMaxLightness;

      color.offsetHSL(0, 0, l);
      this.material.color = color;
    }
  }

  calcDistance(cloudRadius = 1) {
    const pos = new THREE.Vector3();
    this.mesh.getWorldPosition(pos);
    return pos.z / cloudRadius;
  }
}
