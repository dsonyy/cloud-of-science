import * as THREE from "three";

let width = window.innerWidth;
let height = window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffffff");
// const camera = new THREE.OrthographicCamera(
//   -width / 128,
//   width / 128,
//   -height / 128,
//   height / 128,
//   0.1,
//   1000
// );
const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
camera.position.z = 16;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const group = new THREE.Group();
scene.add(group);

const n = 15;
for (let i = 0; i < n; i++) {
  const geometry = new THREE.SphereGeometry(0.6, 40, 40);
  const material = new THREE.MeshLambertMaterial({ color: 0x5555ff });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.setFromSpherical(
    new THREE.Spherical(
      5,
      2 * Math.PI * Math.random(),
      2 * Math.PI * Math.random()
    )
  );
  group.add(mesh);
}
for (let i = 0; i < n; i++) {
  const geometry = new THREE.SphereGeometry(0.4, 40, 40);
  const material = new THREE.MeshBasicMaterial({ color: 0x2222aa });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.setFromSpherical(
    new THREE.Spherical(
      5,
      2 * Math.PI * Math.random(),
      2 * Math.PI * Math.random()
    )
  );
  mesh.rotation.set(
    2 * Math.PI * Math.random(),
    2 * Math.PI * Math.random(),
    2 * Math.PI * Math.random()
  );
  group.add(mesh);
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(1, 1, 3);
scene.add(dirLight);

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
  group.rotation.y += (targetRotation - group.rotation.y) * 0.01;
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
