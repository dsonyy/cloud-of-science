import * as THREE from "three";

const NODE_PALETTE = [0x5fb250, 0xe47e71, 0xcccc00, 0x00a3b4];

function calcFibonacciSpherePoints(samples, radius = 1) {
  let points = [];
  let phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    let y = 1 - (i / (samples - 1)) * 2;
    let r = Math.sqrt(1 - y * y);
    let theta = phi * i;

    let x = Math.cos(theta) * r;
    let z = Math.sin(theta) * r;

    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

function createNodeMesh(palette) {
  const color = palette[Math.floor(Math.random() * palette.length)];
  const geometry = new THREE.SphereGeometry(0.5, 40, 40);
  const material = new THREE.MeshPhongMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function createCloud(nodes, radius = 5) {
  const group = new THREE.Group();
  for (const point of calcFibonacciSpherePoints(nodes, radius)) {
    const nodeMesh = createNodeMesh(NODE_PALETTE);
    nodeMesh.position.set(point[0], point[1], point[2]);
    group.add(nodeMesh);
  }
  group.rotation.z = Math.PI / 2;
  return group;
}

let cloudRotating = false;
let cloudRotatingVelocityX = 0.0;
let cloudRotatingVelocityY = 0.0;
function updateCloudRotation(cloud) {
  //   if (cloudRotating) {
  //     cloud.rotation.x = cloudRotatingVelocityX;
  //     cloud.rotation.y = cloudRotatingVelocityY;
  //   }
  //   cloud.rotation.x += cloudRotatingVelocityX;
  //   cloud.rotation.y += cloudRotatingVelocityY;
  //   if (cloudRotatingVelocityX > 0.01) cloudRotatingVelocityX -= 0.001;
  //   else if (cloudRotatingVelocityX < -0.01) cloudRotatingVelocityX += 0.001;
  //   else cloudRotatingVelocityX = 0;
}

let width = window.innerWidth;
let height = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffffff");
const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
camera.position.z = 16;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
dirLight.position.set(1, 1, 1);

const cloud = createCloud(20);
cloud.add(dirLight);
scene.add(cloud);

function init() {
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointerup", onPointerUp);
}

function animate() {
  requestAnimationFrame(animate);

  updateCloudRotation(cloud);

  render();
}

function render() {
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

init();
animate();

function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function onPointerDown(event) {
  cloudRotatingVelocityX = cloud.rotation.x;
  cloudRotatingVelocityY = cloud.rotation.y;
  cloudRotating = true;
}

function onPointerMove(event) {
  if (cloudRotating) {
    cloud.rotation.x += ((event.offsetY / height) * 2 - 1) * 0.01;
    cloud.rotation.y += ((event.offsetX / width) * 2 - 1) * 0.01;
    console.log(cloudRotatingVelocityX, cloudRotatingVelocityY);
  }

  //   if (Math.abs(cloudRotatingVelocityX) < 0.05)
  //     cloudRotatingVelocityX += event.movementY * 0.001;
  //   if (Math.abs(cloudRotatingVelocityY) < 0.05)
  //     cloudRotatingVelocityY += event.movementX * 0.001;
}

function onPointerUp(event) {
  cloudRotating = false;
  cloudRotatingVelocityX = 0;
  cloudRotatingVelocityY = 0;
}
