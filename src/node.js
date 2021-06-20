import * as THREE from "three";

const NodeGeometry = new THREE.SphereGeometry(0.5, 40, 40);

export default class Node {
  constructor(x, y, z, content) {
    this.content = content;

    // Ball
    this.material = createGradientMaterial(
      5,
      this.content.color
    ); /*new THREE.MeshLambertMaterial({
      color: this.content.color,
      fog: true,
    });*/
    this.mesh = new THREE.Mesh(NodeGeometry, this.material);
    this.mesh.position.set(x, y, z);

    this.colorLightnessFactor = 0.5;
    this.colorMaxLightness = 0.2;

    // Icon
    this.map = new THREE.TextureLoader().load(content.icon);
    const material = new THREE.SpriteMaterial({ map: this.map });
    this.icon = new THREE.Sprite(material);
  }

  static get randomColor() {
    const palette = [0xe56566, 0x98469a, 0xb0d4b0, 0xeeb475, 0x6c82be];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  updateColorWithDistance(cloudRadius = 1) {
    // const dist = this.calcDistance(cloudRadius);
    // if (dist >= 0) {
    //   this.material.color.setHex(this.content.color);
    // } else {
    //   const color = new THREE.Color(this.content.color);
    //   let l = this.colorLightnessFactor * -dist;
    //   if (l > this.colorMaxLightness) l = this.colorMaxLightness;
    //   color.offsetHSL(0, 0, l);
    //   this.material.color = color;
    // }
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
