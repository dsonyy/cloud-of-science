import * as THREE from "three";

export default class Cloud {
  constructor(element) {
    this.element = element;
    this.width = element.clientWidth;
    this.height = element.clientHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#ffffff");

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      40,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 16;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    element.appendChild(this.renderer.domElement);

    // Lights
    this.lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.8),
      dir: new THREE.DirectionalLight(0xffffff, 0.2),
    };
    this.scene.add(this.lights.ambient);
    this.scene.add(this.lights.dir);
    this.lights.dir.position.set(1, 1, 1);

    // Nodes
    this.nodes = Cloud.createNodes(20);
    this.scene.add(this.nodes);
  }

  update() {
    console.log(this.element);
  }

  render() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  static calcFibonacciSpherePoints(samples, radius = 1) {
    let points = [];
    let phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < samples; i++) {
      let y = 1 - (i / (samples - 1)) * 2;
      let r = Math.sqrt(1 - y * y);
      let theta = phi * i;

      let x = Math.cos(theta) * r;
      let z = Math.sin(theta) * r;

      points.push([x * radius, y * radius, z * radius]);
    }
    return points;
  }

  static createNodeMesh(palette) {
    const color = palette[Math.floor(Math.random() * palette.length)];
    const geometry = new THREE.SphereGeometry(0.5, 40, 40);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  static createNodes(nodes, radius = 5) {
    const group = new THREE.Group();
    const palette = [0x5fb250, 0xe47e71, 0xcccc00, 0x00a3b4];
    for (const point of this.calcFibonacciSpherePoints(nodes, radius)) {
      const nodeMesh = this.createNodeMesh(palette);
      nodeMesh.position.set(point[0], point[1], point[2]);
      group.add(nodeMesh);
    }
    group.rotation.z = Math.PI / 2;
    return group;
  }
}
