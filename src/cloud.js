import * as THREE from "three";
import Node from "./node";

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

    // Nodes
    this.radius = 5;
    this.nodes = [];
    this.nodesGroup = new THREE.Group();
    this.nodeIconsGroup = new THREE.Group();
    this.constructEmptyNodes(20, this.radius);
    this.scene.add(this.nodesGroup);
    this.scene.add(this.nodeIconsGroup);

    // Lights
    this.lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.6),
      //dir: new THREE.DirectionalLight(0xffffff, 0.3),
      point: new THREE.PointLight(0xffffff, 0.4),
    };
    this.scene.add(this.lights.ambient);
    this.scene.add(this.lights.point);
    // this.scene.add(this.lights.dir);
    this.lights.point.position.set(0, 0, 2 * this.radius);

    // Fog
    this.scene.fog = new THREE.Fog(
      this.scene.background,
      this.camera.position.z,
      this.camera.position.z + this.radius * 2
    );

    this.mouseRotation = new MouseRotation(this.element, this.nodesGroup);
    this.mouseLightMovement = new MouseLightMovement(
      this.element,
      this.lights.point,
      this.radius * 4,
      this.radius * 3
    );
  }

  update() {
    this.mouseRotation.update();

    for (const node of this.nodes) {
      node.updateColorWithDistance(this.radius);
    }
  }

  render() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
    // this.effectOutline.render(this.scene, this.camera);
  }

  static calcFibonacciSpherePoints(samples, radius) {
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

  constructEmptyNodes(n, radius) {
    for (const point of Cloud.calcFibonacciSpherePoints(n, radius)) {
      this.nodes.push(
        new Node(point[0], point[1], point[2], {
          color: Node.randomColor,
          // icon: "static/sprite0.png",
        })
      );
      this.nodesGroup.add(this.nodes[this.nodes.length - 1].mesh);
      this.nodeIconsGroup.add(this.nodes[this.nodes.length - 1].icon);
    }
    this.nodesGroup.rotation.z = Math.PI / 2;
  }
}

class MouseLightMovement {
  constructor(element, object, areaWidth, areaHeight) {
    this.element = element;
    this.object = object;
    this.width = areaWidth;
    this.height = areaHeight;
    document.addEventListener("pointermove", (e) => this.onPointerMove(e));
  }

  onPointerMove(e) {
    if (this.element.contains(e.target)) {
      const rect = this.element.getBoundingClientRect();
      this.object.position.x =
        ((e.offsetX - rect.width / 2) / rect.width) * this.width;
      this.object.position.y =
        (-(e.offsetY - rect.height / 2) / rect.height) * this.height;
    }
  }
}

class MouseRotation {
  constructor(element, object) {
    this.element = element;
    this.object = object;

    this.pointerHolding = false;
    this.slowingDown = false;

    this.slowDownFactor = 0.97;
    this.moveSpeedFactor = 0.0001;
    this.moveSpeedMax = 400;
    this.moveSpeedMin = 3;

    this.vectorX = 0;
    this.vectorY = 10;

    document.addEventListener("pointermove", (e) => this.onPointerMove(e));
    document.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    document.addEventListener("pointerup", (e) => this.onPointerUp(e));
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
