import * as THREE from "three";
import { NodeRadius } from "./node";

const connectionMaterial = new THREE.LineBasicMaterial({
  color: 0x0,
  transparent: true,
  linewidth: 1, // TOFIX: this property is not supported by modern OpenGL
  // source: https://stackoverflow.com/questions/11638883/thickness-of-lines-using-three-linebasicmaterial
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

    if (neighbors == 0) return;

    for (let i = 0; i < 3; i++) {
      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      this.group.add(
        Connection.createConnection(neighbor.position, activeNode.position)
      );
    }
  }

  hide() {
    this.group.clear();
  }

  static createConnection(a, b) {
    // Normalized vector a->b
    const norm = new THREE.Vector3();
    norm.subVectors(b, a).normalize();

    // Shrink vector
    const shrink = new THREE.Vector3();
    shrink.copy(norm);
    shrink.multiplyScalar(NodeRadius);

    // Shrinking a
    const A = new THREE.Vector3();
    A.copy(a);
    A.add(shrink);

    // Shrinking b
    const B = new THREE.Vector3();
    B.copy(b);
    B.add(shrink.negate());

    // Creating line object
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([A, B]),
      connectionMaterial
    );
    line.material.opacity = 0.6;
    return line;
  }
}
