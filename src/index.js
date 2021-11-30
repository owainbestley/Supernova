import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import * as Tone from "tone";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./styles.css";

let scene, camera, renderer;
let colour, intensity, light;
let ambientLight;
let gridHelper;

let orbit;

let sceneHeight, sceneWidth;

let clock, delta, interval;

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", init);

function init() {
  // remove overlay
  let overlay = document.getElementById("overlay");
  overlay.remove();

  //create our clock and set interval at 30 fpx
  clock = new THREE.Clock();
  delta = 0;
  interval = 1 / 25;

  //create our scene
  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdedede);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 10;
  //specify our renderer and add it to our document
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //create the orbit controls instance so we can use the mouse move around our scene
  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableZoom = true;

  // lighting
  colour = 0xffffff;
  intensity = 1;
  light = new THREE.DirectionalLight(colour, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  gridHelper = new THREE.GridHelper(1000, 100);
  scene.add(gridHelper);

  window.addEventListener("resize", onWindowResize, false); //resize callback
  play();
}

// stop animating (not currently used)
function stop() {
  renderer.setAnimationLoop(null);
}

// simple render function

function render() {
  renderer.render(scene, camera);
}

// start animating

function play() {
  //using the new setAnimationLoop method which means we are WebXR ready if need be
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

//our update function

function update() {
  orbit.update();
  //update stuff in here
  delta += clock.getDelta();

  if (delta > interval) {
    // The draw or time dependent code are here

    delta = delta % interval;
  }
}

function onWindowResize() {
  //resize & align
  sceneHeight = window.innerHeight;
  sceneWidth = window.innerWidth;
  renderer.setSize(sceneWidth, sceneHeight);
  camera.aspect = sceneWidth / sceneHeight;
  camera.updateProjectionMatrix();
}
