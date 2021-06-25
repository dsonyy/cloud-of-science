import * as THREE from "three";

export default class MouseRaycaster {
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
