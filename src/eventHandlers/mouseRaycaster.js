import * as THREE from "three";

export default class MouseRaycaster {
  constructor(camera, nodes) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.nodes = nodes;
    this.intersectionNode = null;

    this.hoveredNode = null;
    this.clickedNode = null;
  }

  onPointerMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    let closestInter = null;
    let justHoveredNode;
    for (const node of this.nodes) {
      const inter = this.raycaster.intersectObject(node.mesh);
      if (
        inter.length == 1 &&
        (closestInter == null || closestInter.distance > inter[0].distance)
      ) {
        closestInter = inter[0];
        justHoveredNode = node;
      }
    }

    if (justHoveredNode == null && this.hoveredNode != null) {
      // Left
      this.hoveredNode = null;
    } else if (justHoveredNode == null) {
      // Nothing has been hovered yet
    } else if (
      this.hoveredNode == null ||
      this.hoveredNode.id != justHoveredNode.id
    ) {
      // Just hovered
      this.hoveredNode = justHoveredNode;
    } else if (justHoveredNode.id == this.hoveredNode.id) {
      // Still hovering
    }
  }

  onPointerDown(e) {
    if (e.button == 0) {
      if (this.hoveredNode != null) {
        this.clickedNode = this.hoveredNode;
      } else {
        this.clickedNode = null;
      }
    }
  }
}
