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
    this.hovered = true;
  }

  handleHover() {
    this.hovered = false;
    return this.hoveredNode;
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

  // onPointerMove(e) {
  //   this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  //   this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  //   this.raycaster.setFromCamera(this.pointer, this.camera);

  //   let closestInter = null;
  //   let justHoveredNode;
  //   for (const node of this.nodes) {
  //     const inter = this.raycaster.intersectObject(node.mesh);
  //     if (
  //       inter.length == 1 &&
  //       (closestInter == null || closestInter.distance > inter[0].distance)
  //     ) {
  //       closestInter = inter[0];
  //       justHoveredNode = node;
  //     }
  //   }

  //   if (justHoveredNode && this.hoveredNode == null) {
  //     this.queue.push({
  //       action: "hover",
  //       justNow: true,
  //       node: justHoveredNode,
  //     });
  //     this.hoveredNode = justHoveredNode;
  //   } else if (justHoveredNode && this.hoveredNode.id == justHoveredNode.id) {
  //     this.queue.push({
  //       action: "hover",
  //       justNow: false,
  //       node: justHoveredNode,
  //     });
  //     this.hoveredNode = justHoveredNode;
  //   } else if (justHoveredNode && this.hoveredNode.id == justHoveredNode.id) {
  //     this.queue.push({
  //       action: "hover",
  //       justNow: true,
  //       node: justHoveredNode,
  //     });
  //     this.hoveredNode = justHoveredNode;
  //   } else if (justHoveredNode && this.hoveredNode.id == justHoveredNode.id) {
  //     this.queue.push({
  //       action: "hover",
  //       justNow: true,
  //       node: justHoveredNode,
  //     });
  //     this.hoveredNode = justHoveredNode;
  //   } else if (justHoveredNode && this.hoveredNode.id != justHoveredNode.id) {
  //     this.queue.push({
  //       action: "leave",
  //       justNow: true,
  //       node: this.hoveredNode,
  //     });
  //     this.hoveredNode = justHoveredNode;
  //     this.queue.push({
  //       action: "hover",
  //       justNow: true,
  //       node: this.hoveredNode,
  //     });
  //   } else if (!justHoveredNode && this.hoveredNode) {
  //     this.queue.push({
  //       action: "leave",
  //       justNow: true,
  //       node: this.hoveredNode,
  //     });
  //     this.hoveredNode = justHoveredNode;
  //   }
  // }

  // onPointerDown(e) {
  //   if (e.button == 0) {
  //     if (
  //       this.clickedNode &&
  //       this.hoveredNode &&
  //       this.hoveredNode.id == this.clickedNode.id
  //     ) {
  //       this.queue.push({
  //         action: "click",
  //         justNow: false,
  //         node: this.clickedNode,
  //       });
  //     } else if (this.hoveredNode) {
  //       this.clickedNode = this.hoveredNode;
  //       this.queue.push({
  //         action: "click",
  //         justNow: true,
  //         node: this.clickedNode,
  //       });
  //     } else {
  //       this.queue.push({
  //         action: "unclick",
  //         justNow: true,
  //         node: this.clickedNode,
  //       });
  //       this.clickedNode = null;
  //     }
  //   }
  // }
}
