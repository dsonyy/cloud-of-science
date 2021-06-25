import * as THREE from "three";

export default class MouseRaycaster {
  constructor(camera, nodes, connection) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.nodes = nodes;
    this.intersectionNode = null;
    this.connection = connection;

    this.hoveredNode = null;
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
      console.log(justHoveredNode.title);
    } else if (justHoveredNode.id == this.hoveredNode.id) {
      // Still hovering
    }

    // if (this.hoveredNode != null && !this.hoveredNode.hovered) {
    //   console.log(this.hoveredNode.title);
    //   this.hoveredNode.hovered = true;
    // }

    // const intersections = this.raycaster.intersectObjects(this.meshes);
    // if (intersections.length != 0) {
    //   const intersection = intersections[0];
    //   let intersectedNode;
    //   let justHovered = false;
    //   for (const node of this.nodes) {
    //     justHovered |= node.hover(node.mesh.id == intersection.object.id);
    //     this.intersectionNode = node;

    //     if (node.mesh.id == intersection.object.id) {
    //       // TODO: cleanup
    //       intersectedNode = node;
    //     }
    //   }

    //   if (justHovered) {
    //     this.connection.hide();
    //     this.connection.showRandom(intersectedNode);
    //   }
    // } else {
    //   this.intersectionNode = null;
    //   for (const node of this.nodes) {
    //     node.hover(false);
    //   }
    //   this.connection.hide();
    // }
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
