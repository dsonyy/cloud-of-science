import Cloud from "./cloud";

const cloud = new Cloud(document.getElementById("cloud"));
function animate() {
  requestAnimationFrame(animate);
  cloud.update();
  cloud.render();
}
animate();
