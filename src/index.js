import App from "./app";

const app = new App(document.getElementById("cloud"));
function animate() {
  requestAnimationFrame(animate);
  app.update();
}
animate();
