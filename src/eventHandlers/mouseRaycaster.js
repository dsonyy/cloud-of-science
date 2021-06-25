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

    this.queue = [];
  }

  onMouseMove(e) {
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

    if (justHoveredNode && this.hoveredNode == null) {
      this.queue.push({
        action: "hover",
        justNow: true,
        node: justHoveredNode,
      });
      this.hoveredNode = justHoveredNode;
    } else if (justHoveredNode && this.hoveredNode.id == justHoveredNode.id) {
      this.queue.push({
        action: "hover",
        justNow: false,
        node: justHoveredNode,
      });
      this.hoveredNode = justHoveredNode;
    } else if (justHoveredNode && this.hoveredNode.id == justHoveredNode.id) {
      this.queue.push({
        action: "hover",
        justNow: true,
        node: justHoveredNode,
      });
      this.hoveredNode = justHoveredNode;
    } else if (justHoveredNode && this.hoveredNode.id == justHoveredNode.id) {
      this.queue.push({
        action: "hover",
        justNow: true,
        node: justHoveredNode,
      });
      this.hoveredNode = justHoveredNode;
    } else if (justHoveredNode && this.hoveredNode.id != justHoveredNode.id) {
      this.queue.push({
        action: "leave",
        justNow: true,
        node: this.hoveredNode,
      });
      this.hoveredNode = justHoveredNode;
      this.queue.push({
        action: "hover",
        justNow: true,
        node: this.hoveredNode,
      });
    } else if (!justHoveredNode && this.hoveredNode) {
      this.queue.push({
        action: "leave",
        justNow: true,
        node: this.hoveredNode,
      });
      this.hoveredNode = justHoveredNode;
    }
  }

  onMouseDown(e) {
    if (e.button == 0) {
      if (
        this.clickedNode &&
        this.hoveredNode &&
        this.hoveredNode.id == this.clickedNode.id
      ) {
        this.queue.push({
          action: "click",
          justNow: false,
          node: this.clickedNode,
        });
      } else if (this.hoveredNode) {
        this.clickedNode = this.hoveredNode;
        this.queue.push({
          action: "click",
          justNow: true,
          node: this.clickedNode,
        });
      } else {
        this.queue.push({
          action: "unclick",
          justNow: true,
          node: this.clickedNode,
        });
        this.clickedNode = null;
      }
    }
  }
}
