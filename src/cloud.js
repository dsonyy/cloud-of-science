import * as THREE from "three";
import Node from "./node";
import Connection from "./connection";
import NodesLoader from "./loaders/nodesLoader";
import ArticlesLoader from "./loaders/articleLoader";
import PointerRaycaster from "./eventHandlers/pointerRaycaster";
import PointerRotation from "./eventHandlers/pointerRotation";
import PointerLightMovement from "./eventHandlers/pointerLightMovement";
import CloudScaffolding from "./cloudScaffolding";

export const cameraPosition = new THREE.Vector3(0, 0, 16);

export default class Cloud {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.width = parentElement.clientWidth;
    this.height = parentElement.clientHeight;

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
    parentElement.appendChild(this.renderer.domElement);
    this.canvasElement = this.renderer.domElement;

    // Scaffolding
    this.radius = 5;
    this.scaffolding = new CloudScaffolding(this.radius);

    // Nodes
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
    this.lights.point.position.set(-3, -2, 2 * this.radius);

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
    this.pointerRotation = new PointerRotation(this.scaffolding.group);
    this.pointerLightMovement = new PointerLightMovement(
      this.canvasElement,
      this.lights.point,
      this.radius * 4,
      this.radius * 3
    );
    this.pointerRaycaster = new PointerRaycaster(
      this.camera,
      [],
      this.canvasElement
    );

    // Loading nodes
    this.nodesLoader = new NodesLoader(this.scaffolding);
    this.nodesLoader.fetch().then(() => {
      this.nodes = this.nodesLoader.nodes;
      for (const node of this.nodes) {
        this.nodesGroup.add(node.group);
      }
      this.connection.nodes = this.nodes;
      this.pointerRaycaster.nodes = this.nodes;
    });

    // Loading articles
    this.articleLoader = new ArticlesLoader();
  }

  update() {
    this.pointerRotation.update();

    for (const node of this.nodes) {
      node.update(this.radius);
    }

    if (this.pointerRaycaster.tapped) {
      const tappedNode = this.pointerRaycaster.handleTap();

      if (tappedNode) {
        tappedNode.click(true);

        this.articleLoader.reloadArticle(tappedNode.articleName);
        this.articleLoader.showArticle("right");
      } else {
        for (const node of this.nodes) {
          node.click(false);
        }
        this.articleLoader.hideArticle();
      }
    }

    if (this.pointerRaycaster.hovered) {
      const hoveredNode = this.pointerRaycaster.handleHover();
      if (hoveredNode) {
        for (const node of this.nodes) node.hover(false);
        hoveredNode.hover(true);
        this.connection.showRandom(hoveredNode);
      }
    } else {
      for (const node of this.nodes) node.hover(false);
      this.connection.hide();
    }
  }

  render() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.width = this.parentElement.clientWidth;
    this.height = this.parentElement.clientHeight;

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }
}
