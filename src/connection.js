import * as THREE from "three";
import { NodeRadius } from "./node";
import { MeshLine, MeshLineMaterial } from "meshline";

export default class Connection {
  constructor(nodes) {
    this.nodes = nodes;
    this.group = new THREE.Group();

    this.activeNode = null;
    this.targets = [];
  }

  update() {
    if (this.activeNode == null) return;

    this.group.clear();
    for (const target of this.targets) {
      this.group.add(
        Connection.createConnection(
          this.activeNode.group.position,
          target.group.position
        )
      );
    }
  }

  show(activeNode) {
    if (this.activeNode != null && activeNode.id == this.activeNode.id) return;
    else if (this.activeNode != null && activeNode.id != this.activeNode.id)
      this.hide();

    this.activeNode = activeNode;

    for (const node of this.nodes) {
      if (
        node.id != activeNode.id &&
        node.color.r == activeNode.color.r &&
        node.color.g == activeNode.color.g &&
        node.color.b == activeNode.color.b
      ) {
        this.targets.push(node);
      }
    }

    this.update();
  }

  showRandom(activeNode) {
    if (this.activeNode != null && activeNode.id == this.activeNode.id) return;
    else if (this.activeNode != null && activeNode.id != this.activeNode.id)
      this.hide();

    this.activeNode = activeNode;

    const neighbors = [];
    for (const node of this.nodes) {
      if (node.id != activeNode.id) {
        neighbors.push(node);
      }
    }

    if (neighbors == 0) return;

    for (let i = 0; i < 3; i++) {
      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

      this.targets.push(neighbor);

      this.update();
    }
  }

  hide() {
    this.group.clear();
    this.activeNode = null;
    this.targets = [];
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
    const line = Connection.createMeshLine(A, B);

    return line;
  }

  static createClassicLine(a, b) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([A, B]),
      new THREE.LineBasicMaterial({
        color: 0x0,
        transparent: true,
        linewidth: 1, // TOFIX: this property is not supported by modern OpenGL
        // source: https://stackoverflow.com/questions/11638883/thickness-of-lines-using-three-linebasicmaterial
      })
    );
    line.material.opacity = 0.6;

    return line;
  }

  static createMeshLine(a, b) {
    const line = new MeshLine();
    line.setPoints([a, b]);
    const material = new MeshLineMaterial({
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      color: new THREE.Color(0x222222),
      lineWidth: 0.02,
      opacity: 0.6,
      transparent: true,
      fog: true,
    });
    const mesh = new THREE.Mesh(line, material);
    return mesh;
  }
}
