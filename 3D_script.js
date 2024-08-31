// Import Three.js
import * as THREE from 'three';

import { TextureLoader } from 'three';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';

document.getElementById('Canvas3D').width = window.innerWidth;
document.getElementById('Canvas3D').height = window.innerHeight;

// Step 2: Set up the Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('Canvas3D'),
    alpha: true,
	antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);
//renderer.domElement.classList.add('renderer');
//renderer.domElement.style.width='80vw';
//renderer.domElement.style.height='80vh';
//scene.background = new THREE.Color('rgba(0,0,0,0)');
scene.background=new THREE.Color('black');
//const controls = new OrbitControls( camera, renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 2, 0 );
const loader = new GLTFLoader();

camera.position.set(0,3,10);
camera.lookAt(0,2,0);

const ambient_light = new THREE.AmbientLight(0);
scene.add(ambient_light)

let A = new THREE.Color('hsla(266,0%,70%,1)')

const directionalLightA = new THREE.DirectionalLight(A, 10);
directionalLightA.position.set(5, 5, 5);
directionalLightA.castShadow = true; // default false
scene.add(directionalLightA);
//Set up shadow properties for the light
directionalLightA.shadow.mapSize.width = 512; // default
directionalLightA.shadow.mapSize.height = 512; // default
directionalLightA.shadow.camera.near = 0.5; // default
directionalLightA.shadow.camera.far = 500; // default






const geometry = new THREE.PlaneGeometry( 25, 20 );
const material = new THREE.MeshPhysicalMaterial( {color: new THREE.Color('white'), side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.receiveShadow = true;
plane.rotation.set(Math.PI/2,0,0);
plane.position.set(0,-0.06,0)


// Load a glTF resource
loader.load(
	// resource URL
	'Models/TVS.glb',
	// called when the resource is loaded
	function ( gltf ) {

        gltf.scene.position.set(0, 0, 0); // X, Y, Z coordinates

        // Rotate the model
        gltf.scene.rotation.set(0, 3*Math.PI / 2, 0); // X, Y, Z rotation in radians

        // Scale the model
        gltf.scene.scale.set(1, 1, 1); // X, Y, Z scale
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;  // Enable casting shadows
              child.receiveShadow = true;  // Enable receiving shadows
            }
          });

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const canvas0 = document.getElementById('0canvas');
const canvasTexture0 = new THREE.CanvasTexture(canvas0);
canvasTexture0.flipY = false;

const canvas1 = document.getElementById('1canvas');
const canvasTexture1 = new THREE.CanvasTexture(canvas1);
canvasTexture1.needsUpdate = true; 

const canvas2 = document.getElementById('2canvas');
const canvasTexture2 = new THREE.CanvasTexture(canvas2);
canvasTexture2.needsUpdate = true;

const canvas3 = document.getElementById('3canvas');
const canvasTexture3 = new THREE.CanvasTexture(canvas3);
canvasTexture3.needsUpdate = true; 

const canvas4 = document.getElementById('4canvas');
const canvasTexture4 = new THREE.CanvasTexture(canvas4);
canvasTexture4.needsUpdate = true; 

const canvas5 = document.getElementById('5canvas');
const canvasTexture5 = new THREE.CanvasTexture(canvas5);
canvasTexture5.needsUpdate = true; 

loader.load(
	// resource URL
	'Models/planes/0.glb',
	// called when the resource is loaded
	function ( gltf ) {

        gltf.scene.position.set(0, 0, 0); // X, Y, Z coordinates

        // Rotate the model
        gltf.scene.rotation.set(0, 3*Math.PI / 2, 0); // X, Y, Z rotation in radians

        // Scale the model
        gltf.scene.scale.set(1, 1, 1); // X, Y, Z scale
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
				
              child.material.map = canvasTexture3; // Apply the canvas texture
              child.material.needsUpdate = true; // Ensure material is updated
              child.material.map.repeat.set(1, 1); // Adjust repeat values to fit if needed
              child.material.map.offset.set(0, 0);
			  
            }
          });

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

loader.load(
	// resource URL
	'Models/planes/1.glb',
	// called when the resource is loaded
	function ( gltf ) {

        gltf.scene.position.set(0, 0, 0); // X, Y, Z coordinates

        // Rotate the model
        gltf.scene.rotation.set(0, 3*Math.PI / 2, 0); // X, Y, Z rotation in radians

        // Scale the model
        gltf.scene.scale.set(1, 1, 1); // X, Y, Z scale
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.material.map = canvasTexture1; // Apply the canvas texture
              child.material.needsUpdate = true; // Ensure material is updated
              child.material.map.repeat.set(1, 1); // Adjust repeat values to fit if needed
              child.material.map.offset.set(0, 0);
            }
          });

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

 
loader.load(
	// resource URL
	'Models/planes/2.glb',
	// called when the resource is loaded
	function ( gltf ) {

        gltf.scene.position.set(0, 0, 0); // X, Y, Z coordinates

        // Rotate the model
        gltf.scene.rotation.set(0, 3*Math.PI / 2, 0); // X, Y, Z rotation in radians

        // Scale the model
        gltf.scene.scale.set(1, 1, 1); // X, Y, Z scale
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.material.map = canvasTexture4; // Apply the canvas texture
              child.material.needsUpdate = true; // Ensure material is updated
              child.material.map.repeat.set(1, 1); // Adjust repeat values to fit if needed
              child.material.map.offset.set(0, 0);
            }
          });

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


loader.load(
	// resource URL
	'Models/planes/3.glb',
	// called when the resource is loaded
	function ( gltf ) {

        gltf.scene.position.set(0, 0, 0); // X, Y, Z coordinates

        // Rotate the model
        gltf.scene.rotation.set(0, 3*Math.PI / 2, 0); // X, Y, Z rotation in radians

        // Scale the model
        gltf.scene.scale.set(1, 1, 1); // X, Y, Z scale
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.material.map = canvasTexture2; // Apply the canvas texture
              child.material.needsUpdate = true; // Ensure material is updated
              child.material.map.repeat.set(1, 1); // Adjust repeat values to fit if needed
              child.material.map.offset.set(0, 0);
            }
          });

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


loader.load(
	// resource URL
	'Models/planes/4.glb',
	// called when the resource is loaded
	function ( gltf ) {

        gltf.scene.position.set(0, 0, 0); // X, Y, Z coordinates

        // Rotate the model
        gltf.scene.rotation.set(0, 3*Math.PI / 2, 0); // X, Y, Z rotation in radians

        // Scale the model
        gltf.scene.scale.set(1, 1, 1); // X, Y, Z scale
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.material.map = canvasTexture0; // Apply the canvas texture
              child.material.needsUpdate = true; // Ensure material is updated
              child.material.map.repeat.set(1, 1); // Adjust repeat values to fit if needed
              child.material.map.offset.set(0, 0);
            }
          });

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


loader.load(
	// resource URL
	'Models/planes/5.glb',
	// called when the resource is loaded
	function ( gltf ) {

        gltf.scene.position.set(0, 0, 0); // X, Y, Z coordinates

        // Rotate the model
        gltf.scene.rotation.set(0, 3*Math.PI / 2, 0); // X, Y, Z rotation in radians

        // Scale the model
        gltf.scene.scale.set(1, 1, 1); // X, Y, Z scale
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.material.map = canvasTexture1; // Apply the canvas texture
              child.material.needsUpdate = true; // Ensure material is updated
              child.material.map.repeat.set(1, 1); // Adjust repeat values to fit if needed
              child.material.map.offset.set(0, 0);
            }
          });

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

loader.load(
	// resource URL
	'Models/planes/6.glb',
	// called when the resource is loaded
	function ( gltf ) {

        gltf.scene.position.set(0, 0, 0); // X, Y, Z coordinates

        // Rotate the model
        gltf.scene.rotation.set(0, 3*Math.PI / 2, 0); // X, Y, Z rotation in radians

        // Scale the model
        gltf.scene.scale.set(1, 1, 1); // X, Y, Z scale
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.material.map = canvasTexture3; // Apply the canvas texture
              child.material.needsUpdate = true; // Ensure material is updated
              child.material.map.repeat.set(1, 1); // Adjust repeat values to fit if needed
              child.material.map.offset.set(0, 0);
            }
          });

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

canvasTexture0.flipY = false; 
canvasTexture1.flipY = false; 
canvasTexture2.flipY = false; 
canvasTexture3.flipY = false; 
canvasTexture4.flipY = false; 
canvasTexture5.flipY = false; 

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.1,   // Strength of bloom
  0.9,   // Radius of bloom
  0.8   // Threshold for bloom
);
composer.addPass(bloomPass);

function animate() {
    requestAnimationFrame(animate);
    canvasTexture0.needsUpdate = true;
    canvasTexture1.needsUpdate = true;
    canvasTexture2.needsUpdate = true;
    canvasTexture3.needsUpdate = true;
    canvasTexture4.needsUpdate = true;
    canvasTexture5.needsUpdate = true;
    renderer.render(scene, camera);
	composer.render();
}
animate();