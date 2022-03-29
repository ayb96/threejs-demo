import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb5b0b0);
// Map
const geometry = new THREE.PlaneBufferGeometry(100, 100);
geometry.rotateX(4.7);
var texture1 = new THREE.TextureLoader().load("/replace.jpg");
const height = loader.load("/displ.jpg");
const material = new THREE.MeshBasicMaterial({
  //   color: "grey",
  map: texture1,
  displacementMap: height,
  // displacementScale: height,
  flashShading: true,
});
const museumMap = new THREE.Mesh(geometry, material);
museumMap.position.set(0, -10, 0);
scene.add(museumMap);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
// Pointers
const geometry2 = new THREE.BoxGeometry(4, 4, 4, 4, 4, 4);
// var texture2 = new THREE.TextureLoader().load("/texture.jpg");
const material2 = new THREE.MeshBasicMaterial({ color: "grey" });
const cube = new THREE.Mesh(geometry2, material2);
cube.position.x = 0;
cube.position.y = -7;
cube.position.z = -30;
scene.add(cube);

const geometry3 = new THREE.BoxGeometry(4, 4, 4, 4, 4, 4);
// var texture2 = new THREE.TextureLoader().load("/texture.jpg");
const material3 = new THREE.MeshBasicMaterial({ color: "grey" });
const cube1 = new THREE.Mesh(geometry3, material3);
cube1.position.x = 30;
cube1.position.y = -7;
cube1.position.z = 40;
scene.add(cube1);

const geometry4 = new THREE.BoxGeometry(4, 4, 4, 4, 4, 4);
// var texture2 = new THREE.TextureLoader().load("/texture.jpg");
const material4 = new THREE.MeshBasicMaterial({ color: "grey" });
const cube2 = new THREE.Mesh(geometry4, material4);
cube2.position.x = 10;
cube2.position.y = -7;
cube2.position.z = 10;
scene.add(cube2);

let btn1 = document.querySelector(".btn1");
btn1.addEventListener("click", function (event) {
  camera.position.x = 0;
  // camera.lookAt(0, -7, -30);
  cube.material.transparent = true;
  cube.material.opacity = 0.3;
  cube.material.color.setHex(0xff0000);
});
let btn2 = document.querySelector(".btn2");
btn2.addEventListener("click", function (event) {
  camera.position.x = 50;
  cube2.material.color.setHex(0xff0000);
});
let btn3 = document.querySelector(".btn3");
btn3.addEventListener("click", function (event) {
  camera.position.x = -100;
  cube1.material.color.setHex(0xff0000);
});
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    console.log("testttt");
  }
}
document.body.addEventListener("click", onMouseMove);
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
// camera.rotation.set(50, 50, 50);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.panSpeed = 2;
controls.screenSpacePanning = false;

controls.minDistance = 1;
controls.maxDistance = 40;
controls.maxPolarAngle = Math.PI / 2;

controls.mouseButtons = {
  RIGHT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY,
  LEFT: THREE.MOUSE.PAN,
};
// controls.update();
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = .5 * elapsedTime

  // Update Orbital Controls
  controls.update();
  // hoverPieces();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
//////////// POPUP ////////////
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
