import * as THREE from "three";
import { cameraPosition } from "./cloud";

const NodeGeometry = new THREE.SphereGeometry(0.5, 40, 40);
const NodeOutlineGeometry = new THREE.SphereGeometry(0.515, 40, 40);
const NodeOutlineMaterial = new THREE.MeshBasicMaterial({
  color: 0x111111,
  side: THREE.BackSide,
});

export default class Node {
  constructor(x, y, z, content) {
    this.id = content.id;
    this.content = content;
    this.group = new THREE.Group();
    this.hovered = false;
    this.clicked = false;

    // Bubble
    this.material = createGradientMaterial(5, this.content.color);
    this.geometry = NodeGeometry;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
    this.group.add(this.mesh);

    this.colorLightnessFactor = 0.5;
    this.colorMaxLightness = 0.2;

    // Outline
    this.meshOutline = new THREE.Mesh(NodeOutlineGeometry, NodeOutlineMaterial);
    this.meshOutline.position.set(x, y, z);
    this.group.add(this.meshOutline);

    // Icon
    this.icon = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x0,
      })
    );
    this.icon.position.set(
      this.mesh.position.x,
      this.mesh.position.y,
      this.mesh.position.z
    );
    // this.group.add(this.icon);

    // this.map = new THREE.TextureLoader().load(content.icon);
    // const material = new THREE.SpriteMaterial({ map: this.map });
    // this.icon = new THREE.Sprite(material);
    // this.icon.scale.set(1, 1, 1);
    //   this.icon.position.set(
    //     this.mesh.position.x,
    //     this.mesh.position.y,
    //     this.mesh.position.z
    //   );
  }

  static get randomColor() {
    const palette = [0xe56566, 0x98469a, 0xb0d4b0, 0xeeb475, 0x6c82be];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  updateColorWithDistance(cloudRadius = 1) {
    const dist = this.calcDistance(cloudRadius);
    if (dist >= 0) {
      this.material.color.setHex(this.content.color);
    } else {
      const color = new THREE.Color(this.content.color);
      let l = this.colorLightnessFactor * -dist;
      if (l > this.colorMaxLightness) l = this.colorMaxLightness;
      color.offsetHSL(0, 0, l);
      this.material.color = color;
    }
  }

  update() {
    this.icon.lookAt(cameraPosition);
    //  const v = this.icon.getWorldPosition();

    // this.icon.position.x += v.x;
    // this.icon.position.y += v.y;
    // this.icon.position.z += v.z;
  }

  hover(hovered) {
    if (this.hovered == hovered) return;
    this.hovered = hovered;

    if (this.hovered) {
      this.material.color.offsetHSL(0, 0, 0.3);
      document.body.style.cursor = "pointer";
    } else {
      this.material.color.setHex(this.content.color);
      document.body.style.cursor = "auto";
    }
  }

  click(clicked) {
    if (this.clicked == clicked) return;
    this.clicked = clicked;

    if (this.clicked) {
      document.getElementById("article").style.display = "initial";
    } else {
      document.getElementById("article").style.display = "none";
    }
  }

  calcDistance(cloudRadius = 1) {
    const pos = new THREE.Vector3();
    this.mesh.getWorldPosition(pos);
    return pos.z / cloudRadius;
  }
}

function createGradientMaterial(n, color) {
  const colors = new Uint8Array(n);
  for (let c = 0; c <= colors.length; c++) {
    colors[c] = (c / colors.length) * 256;
  }

  const gradientMap = new THREE.DataTexture(
    colors,
    colors.length,
    1,
    THREE.LuminanceFormat
  );
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;
  gradientMap.generateMipmaps = false;

  return new THREE.MeshToonMaterial({
    color: color,
    gradientMap: gradientMap,
  });
}
