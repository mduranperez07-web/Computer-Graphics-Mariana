import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. ESCENA, CÁMARA Y RENDER
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a); // Noche azulada

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 12, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 10, 0);
controls.update();

// 2. ILUMINACIÓN Y PISO
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(15, 30, 20);
dirLight.castShadow = true;
scene.add(dirLight);

const floorGeo = new THREE.PlaneGeometry(40, 40);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// =========================================================
// TODO: CONSTRUIR LA RUEDA DE LA FORTUNA
// =========================================================
const shapesData = [
    {
        name: 'pata 1',
                geometry: new THREE.CylinderGeometry(0.5, 0.5, 4, 32 ),    
                color: 0xffbf00,
                posX: -3,
                posY: 4,
                posZ: 1.5
    },
    {
        name: 'pata 2',
                geometry: new THREE.CylinderGeometry(1, 1, 4, 32 ),    
                color: 0xffbf00,
                posX: 3,
                posY: 4,   
                posZ: 1.5
    },
    {
        name: 'pata 3',
                geometry: new THREE.CylinderGeometry(1, 1, 4, 32 ),    
                color: 0xffbf00,
                posX: -4, 
                posY: 4,   
                posZ: -1.5 
    },
    {
        name: 'pata 4',
                geometry: new THREE.CylinderGeometry(1, 1, 4, 32 ),    
                color: 0xffbf00,
                posX: 4,
                posY: 4,   
                posZ: -1.5
    },
    {
        name: 'esfera',
                geometry: new THREE.SphereGeometry(0.5, 20, 20 ),    
                color: 0xffbf00,
                posX : 0,
                posY : 7,
    },
]
shapesData.forEach( ( shapeData ) => {
    const material = new THREE.MeshStandardMaterial( { color: shapeData.color, wireframe: isWireframe, roughness: 0.3, metalness: 0.2} );
    const mesh = new THREE.Mesh( shapeData.geometry, material );
    mesh.position.x = shapeData.posX;
    mesh.position.x = shapeData.posY;
    mesh.position.x = shapeData.posZ;
    scene.add( mesh );
    mesh.castShadow = true;
} );
// En esta seccion, debes crear la rueda de la fortuna utilizando geometrías y materiales de Three.js. 
const numCabinas = 8;
const radioRueda = 6;
const cabinas = [];


const ruedaGroup = new THREE.Group();
ruedaGroup.position.set (0,10.5,0);
scene.add(ruedaGroup);

const ruedaMaterial = new THREE.MeshStandardMaterial({ color: 0xc9a581, wireframe: isWireframe, roughness: 0.3, metalness: 0.2});
const cabinasMaterial = new THREE.MeshStandardMaterial({ color: 0xc9a581, wireframe: isWireframe, roughness: 0.3, metalness: 0.2});
const techoMaterial = new THREE.MeshStandardMaterial({ color: 0xc9a581, wireframe: isWireframe, roughness: 0.3, metalness: 0.2});

const aroGeometry = new THREE.TorusGeometry (0.15, 16, 64)

const aroAdelante = new THREE.Mesh( aroGeometry, aroMaterial );
mesh.castShadow = true;
ruedaGroup.add(aroFrontal);


const aroAtras = new THREE.Mesh( aroGeometry, aroMaterial );
mesh.castShadow = true;
ruedaGroup.add(aroAtras);

const radioGeometry = new THREE.CylinderGeometry (0.1, 0.1, );


const radioAdelante = new THREE.Mesh(radioGeometry, ruedaMaterial);
    radioAdelante.rotation.z = angulo;
    radioAdelante.position.z = 0.8;
    ruedaGroup.add(radioAdelante);

// Loop de Animación
let velocidadGiro = 0.01;

const techo = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.8, 4), matTecho);
    techo.position.y = 0.5;
    techo.rotation.y = Math.PI / 4;
    techo.castShadow = true;
    cabinaPivot.add(techo);

    ruedaGroup.add(cabinaPivot);
    cabinas.push(cabinaPivot); // Para la contra-rotación
}



function animate() {
    requestAnimationFrame(animate);

    // Aqui colocar el codigo de Rotación de la rueda
        ruedaGroup.rotation.z += velocidadGiro;

        cabinas.forEach((cabina) => {
        cabina.rotation.z = -ruedaGroup.rotation.z;
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});