import * as THREE from "three";

export default class CloudScaffolding {
  constructor(radius = 5) {
    this.group = new THREE.Group();
    this.radius = radius;
    this.placements = [];
  }

  create(n) {
    const points = this.calcFibonacciSpherePoints(n);
    for (const point of points) {
      const placement = new THREE.Object3D();
      placement.position.set(point[0], point[1], point[2]);
      this.group.add(placement);
      this.placements.push(placement);
    }
  }

  calcFibonacciSpherePoints(samples) {
    let points = [];
    let phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < samples; i++) {
      let y = 1 - (i / (samples - 1)) * 2;
      let r = Math.sqrt(1 - y * y);
      let theta = phi * i;

      let x = Math.cos(theta) * r;
      let z = Math.sin(theta) * r;

      points.push([x * this.radius, y * this.radius, z * this.radius]);
    }
    return points;
  }
}
