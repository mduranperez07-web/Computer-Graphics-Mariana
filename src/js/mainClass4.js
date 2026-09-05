import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const backgroundColor = 0x0b0c10; // Dark background color
scene.background = new THREE.Color( backgroundColor );
camera.position.set(0, -1.5, 15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

const light = new THREE.DirectionalLight( 0xffffff, 1.2 );
light.position.set( 5, 10, 7 );
scene.add( light );

const meshes = [];
let isWireframe = false;

const shapesData = [
    {
        name: 'Sol',
                geometry: new THREE.SphereGeometry( 2.4, 70, 70 ),    
                color: 0xffbf00,
                posX: 0    
    },
    {
        name: 'mercurio',
                geometry: new THREE.SphereGeometry( 0.5, 20, 20 ),    
                color: 0xfa9632,
                posX: 5
    },
    {
        name: 'venus',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0xd18604,
                posX: 7

    },
    {
        name: 'tierra',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0x00e676,
                posX: 10

    },
    {
        name: 'marte',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0xff5145,
                posX: 13

    },
    {
        name: 'saturno',//en saturno viven los hijos que nunca tuvimos
                geometry: new THREE.SphereGeometry( 1.5, 32, 32 ),   
                
                color: 0xffb845,
                posX: 16
    },
    {
        name: 'urano',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0xdb934b,
                posX: 20

    },
    {
        name: 'neptuno',
                geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
                color: 0x1988ff,
                posX: 24


    },

];

 shapesData.forEach( ( shapeData ) => {
        const material = new THREE.MeshStandardMaterial( { color: shapeData.color, wireframe: isWireframe, roughness: 0.3, metalness: 0.2} );
        const mesh = new THREE.Mesh( shapeData.geometry, material );
        mesh.position.x = shapeData.posX;
        scene.add( mesh );
        meshes.push( mesh );
        } );

const saturnGeometry = new THREE.SphereGeometry( 1, 32, 32 );//en saturno viven los hijos que nunca tuvimos
const saturnMaterial = new THREE.MeshStandardMaterial({ color: 0xc9a581, wireframe: isWireframe, roughness: 0.3, metalness: 0.2});
const saturn = new THREE.Mesh( saturnGeometry, saturnMaterial );
saturn.position.x = 7;

scene.add(saturn);
meshes.push(saturn);


const ringGeometry = new THREE.RingGeometry(1.5, 2, 40 );
const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x787774, side: THREE.DoubleSide });
const ring = new THREE.Mesh( ringGeometry, ringMaterial);

ring.position.x = 20;
ring.rotation.x = Math.PI / 2;
scene.add(ring);

  const size = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );
  
  // Axes Helper
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

function animate( time ) {
  controls.update();
  
  meshes.forEach( ( mesh ) => {
    const speed = 0.0009;   
    mesh.rotation.x = time * speed;
    mesh.rotation.y = time * speed;
    });

    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );