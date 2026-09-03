import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const backgroundColor = 0x0b0c10; // Dark background color
scene.background = new THREE.Color( backgroundColor );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

const light = new THREE.DirectionalLight( 0xffffff, 1.2 );
light.position.set( 5, 10, 7 );
scene.add( light );
const shapesData = [
    {
        name: 'Sol',
                geometry: new THREE.SphereGeometry( 1, 70, 70 ),    
                color: 0xffffff,
                posX: 0    
    },
    {
        name: 'mercurio',
                geometry: new THREE.SphereGeometry( 1, 20, 20 ),    
                color: 0x00e676,
                posX: -3

    },
    {
        name: 'venus',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0x00e676,
                posX: -5

    },
    {
        name: 'tierra',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0x00e676,
                posX: 3

    },
    {
        name: 'marte',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0x00e676,
                posX: 5

    },
    {
        name: 'saturno',//en saturno viven los hijos que nunca tuvimos
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),   
                
                color: 0x00e676,
                posX: 7
    },
   
    {
        name: 'urano',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0x00e676,
                posX: -7

    },
    {
        name: 'neptuno',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0x00e676,
                posX: 9

    },

];

    const meshes = [];
let isWireframe = false;

    shapesData.forEach( ( shapeData ) => {
        const material = new THREE.MeshStandardMaterial( { color: shapeData.color, wireframe: isWireframe, roughness: 0.3, metalness: 0.2} );
        const mesh = new THREE.Mesh( shapeData.geometry, material );
        mesh.position.x = shapeData.posX;
        scene.add( mesh );
        meshes.push( mesh );
        } );

        const controls = new OrbitControls( camera, renderer.domElement );
        camera.position.set( 0, -1.5, 9 );
        controls.update();

        function animate( time ) {
  renderer.render( scene, camera );
  controls.update();

  const size = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );
  
  // Axes Helper
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  meshes.forEach( ( mesh ) => {
    const speed = 0.0009;   
    
    mesh.rotation.x = time * speed;
    mesh.rotation.y = time * speed;

    });

    renderer.render(
        scene,
        camera
  );

}
