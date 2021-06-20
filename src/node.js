import * as THREE from "three";

export default class Node {
  constructor(x, y, z, content) {
    this.content = content;

    const geometry = new THREE.SphereGeometry(0.5, 40, 40);
    const material = new THREE.MeshBasicMaterial({ color: this.content.color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(x, y, z);
  }

  static getRandomColor() {
    const palette = [0xe56566, 0x98469a, 0xb0d4b0, 0xeeb475, 0x6c82be];
    return palette[Math.floor(Math.random() * palette.length)];
  }
}
