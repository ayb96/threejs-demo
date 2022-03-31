import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Object3D } from "three";
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe8e0cd);
// Map
const geometry = new THREE.PlaneBufferGeometry(4800, 2718);
geometry.rotateX(4.7);
var texture1 = new THREE.TextureLoader().load("/highrezmap.jpg");
var alpha = new THREE.TextureLoader().load("/alpha3.jpg");
var normalMap = new THREE.TextureLoader().load("/alpha2.jpg");
const material = new THREE.MeshBasicMaterial({
  //   color: "grey",
  map: texture1,
  alphaMap: alpha,
  transparent: true,
  normalmap: normalMap,
  displacementMap: normalMap,
  // displacementScale: 20,
  // flashShading: true,
});
const museumMap = new THREE.Mesh(geometry, material);
museumMap.position.set(0, -10, 0);
scene.add(museumMap);
const settings = {
  playhead: 0.001,
};
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
// Pointers
const geometry2 = new THREE.PlaneBufferGeometry(400, 400);
// var texture2 = new THREE.TextureLoader().load("/texture.jpg");
const material2 = new THREE.MeshBasicMaterial({ color: "blue" });
const cube = new THREE.Mesh(geometry2, material2);
cube.position.x = 450;
cube.position.y = 10;
cube.position.z = -50;
scene.add(cube);
cube.rotation.x = -Math.PI / 2;
// cube.material.transparent = true;
// cube.material.opacity = 0;
// gui.add(cube.rotation, "x").min(-3).max(3).step(0.05);
// usage:

// cube.rotation.set(new THREE.Vector3(0, 0, -Math.PI / 2));

// gui.add(cube.rotation, "x");

//
const geometry3 = new THREE.PlaneBufferGeometry(400, 400);
// var texture2 = new THREE.TextureLoader().load("/texture.jpg");
const material3 = new THREE.MeshBasicMaterial({ color: "green" });
const cube1 = new THREE.Mesh(geometry3, material3);
cube1.position.x = -200;
cube1.position.y = 1;
cube1.position.z = -600;
cube1.rotation.x = -Math.PI / 2;

scene.add(cube1);
// cube1.material.transparent = true;
// cube1.material.opacity = 0.5;
const geometry4 = new THREE.PlaneBufferGeometry(400, 400);
// var texture2 = new THREE.TextureLoader().load("/texture.jpg");
const material4 = new THREE.MeshBasicMaterial({ color: "green" });
const cube2 = new THREE.Mesh(geometry4, material4);
cube2.position.x = -700;
cube2.position.y = 0.2;
cube2.position.z = 510;
scene.add(cube2);
cube2.rotation.x = -Math.PI / 2;
cube2.material.transparent = true;
cube2.material.opacity = 0.5;

let btn1 = document.querySelector(".btn1");
btn1.addEventListener("click", function (event) {
  camera.position.x = 0;
  // camera.lookAt(0, -7, -30);
  cube.material.transparent = true;
  cube.material.opacity = 0.5;
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

  for (var i = 1; i < intersects.length; i++) {
    // cube2.material.transparent = true;
    cube.material.opacity = 0.7;
    cube2.material.opacity = 0.7;
    cube1.material.opacity = 0.7;
  }
}
document.body.addEventListener("click", onMouseMove);
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  30,
  sizes.width / sizes.height,
  0.5,
  5000
);
camera.position.x = 0;
camera.position.y = 2000;
camera.position.z = 685;

// camera.lookAt(100, 50, 60);
// camera.rotation.set(50, 50, 50);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.panSpeed = 3;
controls.screenSpacePanning = false;

controls.minDistance = 100;
controls.maxDistance = 2800;
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
const bezier = new THREE.CubicBezierCurve3(
  new THREE.Vector3(-0.5, 0.55, 0),
  new THREE.Vector3(-0.5, 0.1, 0),
  new THREE.Vector3(-0.45, 0.1, 0),
  new THREE.Vector3(0, 0.1, 0)
);
// const target = new Object3D();
// target.position.y = 0.1;
// this.scene.add(target);
document.addEventListener("mousemove", onDocumentMouseMove);
document.addEventListener("onwheel", (event) => console.info("wcwcwdcwcw"));
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = .5 * elapsedTime

  // Update Orbital Controls
  controls.update();
  targetX = mouseX * 0.001;
  // targetY = mouseY * 0.001;
  museumMap.position.x += (-50 * targetX - museumMap.position.x) / 10;
  // museumMap.position.y = 20 * targetY;
  // cube.position.x = 10 * targetX;
  // cube1.position.x = 10 * targetX;
  // cube2.position.x = 10 * targetX;
  // museumMap.position.y = 10 * targetY;
  // cube.position.y = 10 * targetY;
  // cube1.position.y = 10 * targetY;
  // cube2.position.y = 10 * targetY;

  // const playhead = settings.playhead;
  // target.position.x = playhead * 0.5;
  // camera.lookAt(target.position);
  // const pos = bezier.getPoint(playhead);
  // camera.position.set(pos.x, pos.y, pos.z);
  // console.log(pos);
  // hoverPieces();
  // camera.lookAt(200, 50, 60);
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
////
//
//
//
//
//
////
//
//
//
//
////
//
//
//
//
//
//
//
//
//
//
//
//
//

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
