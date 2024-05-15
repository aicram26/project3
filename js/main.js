let scene, camera, renderer, ufo, mixer, Wall1, Wall2, Wall3, Wall4, ceiling, floor, poem, poemMesh;


// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
 
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let sceneContainer = document.querySelector("#scene-container")

function init() {

    ;// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
scene = new THREE.Scene();
scene.background = new THREE.Color(0);
const light = new THREE.DirectionalLight(0xffffff,3);
light.position.set(3,4,5);
scene.add(light);

// const helper = new THREE.DirectionalLightHelper(light, 5);
// scene.add(helper);

const lightLeft = new THREE.DirectionalLight(0xffffff,3);
light.position.set(-3,4,5);
scene.add(lightLeft);

// const helperLeft = new THREE.DirectionalLightHelper(light, 5);
// scene.add(helperLeft);

camera = new THREE.PerspectiveCamera(
    70, //set field of view
    sceneContainer.clientWidth / sceneContainer.clientHeight, //set aspect ratio
    0.01,  //set camera for near plane
    3000 //set camera for far plane
);

renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);



// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models



let mixer;
    loader.load('assets/ufo.gltf',function (gltf){
        ufo =gltf.scene;
        scene.add(ufo);
        ufo.scale.set(2,2,2);
        ufo.position.set(0, -15, 0);
        ufo.rotation.y += 0.01;
        mixer = new THREE.AnimationMixer(ufo); 
        const clips = gltf.animations;

        clips.forEach(function (clip) {
           const action = mixer.clipAction(clip); 
             action.play(); 
        });
})
// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene



//wall1
const Wall1Loader = new THREE.TextureLoader();
Wall1 = Wall1Loader.load('./textures/wall1.png');
const Wall1Material = new THREE.MeshBasicMaterial({ map: Wall1, transparent: true });
const Wall1Geometry = new THREE.BoxGeometry(20, 20, 0);
const Wall1Mesh = new THREE.Mesh(Wall1Geometry, Wall1Material);
Wall1Mesh.position.set(0, 0, -10);
scene.add(Wall1Mesh);


 //wall2
 const Wall2Loader = new THREE.TextureLoader();
 Wall2 = Wall2Loader.load('./textures/wall2.png');
 const Wall2Material = new THREE.MeshBasicMaterial({ map: Wall2, transparent: true });
 const Wall2Geometry = new THREE.BoxGeometry(20, 20, 0); 
 const Wall2Mesh = new THREE.Mesh(Wall2Geometry, Wall2Material);
 Wall2Mesh.position.set(0, 0, 10);
 scene.add(Wall2Mesh);

//wall3
const Wall3Loader = new THREE.TextureLoader();
Wall3 = Wall3Loader.load('./textures/wall3.png');
const Wall3Material = new THREE.MeshBasicMaterial({ map: Wall3, transparent: true });
const Wall3Geometry = new THREE.BoxGeometry(0, 20, 20);
const Wall3Mesh = new THREE.Mesh(Wall3Geometry, Wall3Material);
Wall3Mesh.position.set(-10, 0, 0);
scene.add(Wall3Mesh);

//wall4
const Wall4Loader = new THREE.TextureLoader();
Wall4 = Wall4Loader.load('./textures/wall4.png');
const Wall4Material = new THREE.MeshBasicMaterial({ map: Wall4, transparent: true });
const Wall4Geometry = new THREE.BoxGeometry(0, 20, 20);
const Wall4Mesh = new THREE.Mesh(Wall4Geometry, Wall4Material);
Wall4Mesh.position.set(10, 0, 0);
scene.add(Wall4Mesh);

 //floor 
 const floorLoader = new THREE.TextureLoader();
 floor = floorLoader.load('./textures/floor.png');
 const floorMaterial = new THREE.MeshBasicMaterial({ map: floor, transparent: true });
 const floorGeometry = new THREE.BoxGeometry(20, 0, 20);
 const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
 floorMesh.position.set(0, -10, 0); 

 scene.add(floorMesh);

  //ceiling
  const ceilingLoader = new THREE.TextureLoader();
  ceiling = ceilingLoader.load('./textures/ceiling.png');
  const ceilingMaterial = new THREE.MeshBasicMaterial({ map: ceiling, transparent: true });
  const ceilingGeometry = new THREE.BoxGeometry(20, 0, 20);
  const ceilingMesh = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceilingMesh.position.set(0, 10, 0); // x, y, z
  scene.add(ceilingMesh);

  //add poem
  const poemLoader = new THREE.TextureLoader();
  poem = poemLoader.load('./textures/poem.png');
  const poemMaterial = new THREE.MeshBasicMaterial({ map: poem, transparent: true });
  const poemGeometry = new THREE.BoxGeometry(0, 1, 1);
  poemMesh = new THREE.Mesh(poemGeometry, poemMaterial);
  poemMesh.position.set(5, 0, 0);
  scene.add(poemMesh);


// const geometry = new THREE.BoxGeometry(4, 0.5, 8, 25);
// const texture = new THREE.TextureLoader ().load('textures/martianalley.png');
// const material = new THREE.MeshStandardMaterial( { map:texture } );
// cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
camera.position.z = 3;
camera.position.x = 3;
//controls.update();
}
const clock = new THREE.Clock();

function animate() {
 if (mixer)
    mixer.update(clock.getDelta());
  
   
    requestAnimationFrame( animate );
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    poemMesh.rotation.y = 190;
    poemMesh.scale.set(5,5,5);

    // ufo.position.x = Math.sin(Date.now() / 2000)* 4;
    // ufo.position.y = Math.sin(Date.now() / 4000)* 4;
    // ufo.position.z = Math.sin(Date.now() / 5000)* 4;


    // cube.position.x = Math.sin(Date.now() / 2000)* 4;
    // cube.position.y = Math.sin(Date.now() / 4000)* 4;
    // cube.position.z = Math.sin(Date.now() / 5000)* 4;

 
    if (ufo){
        ufo.rotation.y = Math.sin(Date.now() / 1000) * .5;
    }

    renderer.render( scene, camera );
}
  
   
function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}
 window.addEventListener('resize',onWindowResize, false);

init();

animate();
