import * as THREE from "three";

const connectionMaterial = new THREE.LineBasicMaterial({
  color: 0x0,
  side: THREE.BackSide,
});

export default class Connection {
  constructor(nodes) {
    this.nodes = nodes;
    this.group = new THREE.Group();
  }

  show(activeNode) {
    // TODO: working with real Nodes data
  }

  showRandom(activeNode) {
    const neighbors = [];
    for (const node of this.nodes) {
      if (node.id != activeNode.id) {
        neighbors.push(node);
      }
    }

    for (const neigbor of neighbors) {
      const a = neigbor.position;
      const b = activeNode.position;
      this.group.add(Connection.createLineGeometry(a, b));
    }
  }

  hide() {
    this.group.clear();
  }

  static createLineGeometry(a, b) {
    return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([a, b]),
      connectionMaterial
    );
  }
}
