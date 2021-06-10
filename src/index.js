import * as THREE from "three";

function calcFibbonaciSpherePoints(samples, radius = 1) {
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

function createNodeMesh() {
  const geometry = new THREE.SphereGeometry(0.6, 40, 40);
  const material = new THREE.MeshLambertMaterial({ color: 0x5555ff });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function createCloud(nodes, radius = 5) {
  const group = new THREE.Group();
  for (const point of calcFibbonaciSpherePoints(nodes, radius)) {
    // const geometry = new THREE.SphereGeometry(0.6, 40, 40);
    // const material = new THREE.MeshLambertMaterial({ color: 0x5555ff });
    // const mesh = new THREE.Mesh(geometry, material);
    const nodeMesh = createNodeMesh();
    nodeMesh.position.set(point[0], point[1], point[2]);
    group.add(nodeMesh);
  }
  group.rotation.z = Math.PI / 2;
  return group;
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
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(1, 1, 3);
scene.add(dirLight);

const cloud = createCloud(20);
scene.add(cloud);

let mouseX = 0;
let mouseY = 0;

let targetRotation = 0;
let targetRotationOnPointerDown = 0;
let pointerX = 0;
let pointerXOnPointerDown = 0;

function init() {
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("pointerdown", onPointerDown);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  cloud.rotation.y += (targetRotation - cloud.rotation.y) * 0.01;
  camera.lookAt(scene.position);

  dirLight.position.x = 0 + mouseX * 0.002;
  dirLight.position.y = 0 + mouseY * 0.002;

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

function onMouseMove(event) {
  mouseX = event.clientX - width / 2;
  mouseY = event.clientY - height / 2;
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  pointerXOnPointerDown = event.clientX - width / 2;
  targetRotationOnPointerDown = targetRotation;

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  pointerX = event.clientX - width / 2;

  targetRotation =
    targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
}

function onPointerUp(event) {
  if (event.isPrimary === false) return;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
}
