import * as THREE from "three";
import Node from "./node";
import Connection from "./connection";
import NodesLoader from "./nodesLoader";

export const cameraPosition = new THREE.Vector3(0, 0, 16);

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
    this.camera.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    element.appendChild(this.renderer.domElement);

    // Nodes
    this.radius = 5;
    this.nodes = [];
    this.nodesGroup = new THREE.Group();
    this.nodesGroup.rotation.z = Math.PI / 2;
    this.scene.add(this.nodesGroup);

    // Lights
    this.lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.6),
      point: new THREE.PointLight(0xffffff, 0.4),
    };
    this.scene.add(this.lights.ambient);
    this.scene.add(this.lights.point);
    this.lights.point.position.set(0, 0, 2 * this.radius);

    // Fog
    this.scene.fog = new THREE.Fog(
      this.scene.background,
      this.camera.position.z,
      this.camera.position.z + this.radius * 1.25
    );

    // Connection
    this.connection = new Connection([]);
    this.nodesGroup.add(this.connection.group);

    // Events
    this.mouseRotation = new MouseRotation(this.element, this.nodesGroup);
    this.mouseLightMovement = new MouseLightMovement(
      this.element,
      this.lights.point,
      this.radius * 4,
      this.radius * 3
    );
    this.mouseRaycaster = new MouseRaycaster(this.camera, [], this.connection);

    // Loading nodes
    this.nodesLoader = new NodesLoader(this.radius);
    this.nodesLoader.fetch().then(() => {
      this.nodes = this.nodesLoader.nodes;
      for (const node of this.nodes) {
        this.nodesGroup.add(node.group);
      }
      this.connection.nodes = this.nodes;
      this.mouseRaycaster.setNodes(this.nodes);
    });
  }

  update() {
    this.mouseRotation.update();
    for (const node of this.nodes) {
      node.update(this.radius);
    }
  }

  render() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
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
    let id = 0;
    for (const point of Cloud.calcFibonacciSpherePoints(n, radius)) {
      this.nodes.push(
        new Node(point[0], point[1], point[2], {
          id: id++,
          color: Node.randomColor,
          icon: "static/icons/dummy-icon0.png",
        })
      );
      this.nodesGroup.add(this.nodes[this.nodes.length - 1].group);
    }
    this.nodesGroup.rotation.z = Math.PI / 2;
  }

  onWindowResize() {
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }
}

class MouseLightMovement {
  constructor(element, object, areaWidth, areaHeight) {
    this.element = element;
    this.object = object;
    this.width = areaWidth;
    this.height = areaHeight;
  }

  onPointerMove(e) {
    if (this.element.contains(e.target)) {
      const rect = this.element.getBoundingClientRect();
      this.object.position.x =
        (-(e.offsetX - rect.width / 2) / rect.width) * this.width;
      this.object.position.y =
        ((e.offsetY - rect.height / 2) / rect.height) * this.height;
    }
  }
}

class MouseRotation {
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

class MouseRaycaster {
  constructor(camera, nodes, connection) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.nodes = nodes;
    this.intersectionNode = null;

    this.connection = connection;

    this.meshes = [];
    for (const node of nodes) {
      this.meshes.push(node.mesh);
    }
  }

  setNodes(nodes) {
    this.nodes = nodes;
    this.meshes = [];
    for (const node of nodes) {
      this.meshes.push(node.mesh);
    }
  }

  onPointerMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersections = this.raycaster.intersectObjects(this.meshes);
    if (intersections.length != 0) {
      const intersection = intersections[0];
      let intersectedNode;
      let justHovered = false;
      for (const node of this.nodes) {
        justHovered |= node.hover(node.mesh.id == intersection.object.id);
        this.intersectionNode = node;

        if (node.mesh.id == intersection.object.id) {
          // TODO: cleanup
          intersectedNode = node;
        }
      }

      if (justHovered) {
        this.connection.hide();
        this.connection.showRandom(intersectedNode);
      }
    } else {
      this.intersectionNode = null;
      for (const node of this.nodes) {
        node.hover(false);
      }
      this.connection.hide();
    }
  }

  onPointerDown(e) {
    if (e.button == 0) {
      if (this.intersectionNode != null) {
        this.intersectionNode.click(true);
      } else {
        for (const node of this.nodes) {
          node.click(false);
        }
      }
    }
  }
}
