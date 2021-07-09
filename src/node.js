import * as THREE from "three";
import { Text } from "troika-three-text";

export const NodeRadius = 0.6;
export const NodeOutlineRadius = NodeRadius + 0.015;

const NodeGeometry = new THREE.SphereGeometry(NodeRadius, 40, 40);
const NodeOutlineGeometry = new THREE.SphereGeometry(NodeOutlineRadius, 40, 40);
const NodeOutlineMaterial = new THREE.MeshBasicMaterial({
  color: 0x111111,
  side: THREE.BackSide,
});

export default class Node {
  constructor(scaffoldingPlacement, content) {
    // Content
    this.id = content.id;
    this.color = new THREE.Color(
      content.color[0] / 255,
      content.color[1] / 255,
      content.color[2] / 255
    );
    this.title = content.title;
    this.articleName = content.articleName;

    this.placement = scaffoldingPlacement;

    this.group = new THREE.Group();
    this.group.position.set(
      this.placement.position.x,
      this.placement.position.y,
      this.placement.position.z
    );
    this.hovered = false;
    this.clicked = false;

    // Bubble
    this.material = createGradientMaterial(5, this.color.getHex());
    this.geometry = NodeGeometry;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.group.add(this.mesh);

    this.colorLightnessFactor = 0.5;
    this.colorMaxLightness = 0.2;

    // Outline
    this.meshOutline = new THREE.Mesh(NodeOutlineGeometry, NodeOutlineMaterial);
    this.group.add(this.meshOutline);

    // Icon
    this.map = new THREE.TextureLoader().load(content.iconSrc);
    const material = new THREE.SpriteMaterial({ map: this.map });
    this.icon = new THREE.Sprite(material);
    this.icon.scale.set(1, 1, 1);
    this.group.add(this.icon);

    // Title text
    this.text = new Text();
    this.text.text = "\n".repeat(7) + this.title.toUpperCase();
    this.text.fontSize = 0.2;
    this.text.font = "static/fonts/arial.ttf";
    this.text.anchorX = "center";
    this.text.anchorY = "middle";
    this.text.color = 0x222222;
    this.text.visible = false;
    this.text.sync();
    this.group.add(this.text);

    // Test arrow
    this.arrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(),
      1,
      0x0
    );
    this.arrow.visible = true;
    this.group.add(this.arrow);
  }

  static get randomColor() {
    const palette = [0xe56566, 0x98469a, 0xb0d4b0, 0xeeb475, 0x6c82be];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  update(cloudRadius) {
    // Icon opacity
    const dist = (this.calcDistance(cloudRadius) + 1) / 2;
    if (dist > 0.95) {
      this.icon.material.opacity = 1;
    } else {
      this.icon.material.opacity = dist;
    }

    // Scaffolding placement position
    let pos = new THREE.Vector3();
    this.placement.getWorldPosition(pos);
    this.group.position.set(pos.x, pos.y, pos.z);

    // Text
    this.text.lookAt(0, 0, 16);
  }

  hover(hovered) {
    if (this.hovered == hovered) return false;
    this.hovered = hovered;

    if (this.hovered) {
      this.material.color.offsetHSL(0, 0, 0.3);
      this.text.visible = true;
    } else {
      this.material.color.set(this.color);
      this.text.visible = false;
    }
    return true;
  }

  click(clicked) {
    if (this.clicked == clicked) return false;
    this.clicked = clicked;
    return true;
  }

  calcDistance(cloudRadius) {
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
    side: THREE.BackSide,
  });
}
