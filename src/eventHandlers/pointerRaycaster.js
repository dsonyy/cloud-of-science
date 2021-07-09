import * as THREE from "three";

export default class PointerRaycaster {
  constructor(camera, nodes, canvasElement) {
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.camera = camera;
    this.nodes = nodes;
    this.canvasElement = canvasElement;

    this.tappedNode = null;
    this.tapped = false;

    this.hoveredNode = null;
    this.hovered = false;
  }

  onPointerMove(e) {
    if (e.pointerType != "mouse") return;

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    this.raycaster.setFromCamera(
      new THREE.Vector2(
        (x / this.canvasElement.width) * 2 - 1,
        -(y / this.canvasElement.height) * 2 + 1
      ),
      this.camera
    );

    let closestInter = null;
    let hoveredNode = null;
    for (const node of this.nodes) {
      const inter = this.raycaster.intersectObject(node.mesh);
      if (
        inter.length == 1 &&
        (closestInter == null || closestInter.distance > inter[0].distance)
      ) {
        closestInter = inter[0];
        hoveredNode = node;
      }
    }

    this.hoveredNode = hoveredNode;
    if (this.hoveredNode) this.hovered = true;
    else this.hovered = false;
  }

  handleHover() {
    return this.hoveredNode;
  }

  onPointerLeave(e) {
    this.hovered = false;
    this.hoveredNode = null;
  }

  onPointerTap(e) {
    this.pointer.x = e.center.x;
    this.pointer.y = e.center.y;

    this.raycaster.setFromCamera(
      new THREE.Vector2(
        (e.center.x / this.canvasElement.width) * 2 - 1,
        -(e.center.y / this.canvasElement.height) * 2 + 1
      ),
      this.camera
    );

    let closestInter = null;
    let tappedNode = null;
    for (const node of this.nodes) {
      const inter = this.raycaster.intersectObject(node.mesh);
      if (
        inter.length == 1 &&
        (closestInter == null || closestInter.distance > inter[0].distance)
      ) {
        closestInter = inter[0];
        tappedNode = node;
      }
    }

    this.tappedNode = tappedNode;
    this.tapped = true;
  }

  handleTap() {
    this.tapped = false;
    return this.tappedNode;
  }

  get side() {
    console.log(this.pointer.x, this.canvasElement.width / 2);
    if (this.pointer.x >= this.canvasElement.width / 2) return "right";
    else return "left";
  }
}
