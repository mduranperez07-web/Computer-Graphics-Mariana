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

const isWireframe = false;

// 3. ESTRUCTURA DE SOPORTE (PATAS)
const shapesData = [
  {
    name: 'pata 1',
    geometry: new THREE.CylinderGeometry(0.3, 0.5, 12, 32),
    color: 0x81B063,
    posX: -3,
    posY: 5,
    posZ: 1.5,
    rotZ: -0.35
  },
  {
    name: 'pata 2',
    geometry: new THREE.CylinderGeometry(0.3, 0.5, 12, 32),
    color: 0x81B063,
    posX: 3,
    posY: 5,
    posZ: 1.5,
    rotZ: 0.35
  },
  {
    name: 'pata 3',
    geometry: new THREE.CylinderGeometry(0.3, 0.5, 12, 32),
    color: 0x81B063,
    posX: -3,
    posY: 5,
    posZ: -1.5,
    rotZ: -0.3
  },
  {
    name: 'pata 4',
    geometry: new THREE.CylinderGeometry(0.3, 0.5, 12, 32),
    color: 0x81B063,
    posX: 3,
    posY: 5,
    posZ: -1.5,
    rotZ: 0.3
  },
  {
    name: 'eje central',
    geometry: new THREE.CylinderGeometry(0.4, 0.4, 3.5, 32),
    color: 0xffbf00,
    posX: 0,
    posY: 10.5,
    posZ: 0,
    rotX: Math.PI / 2
  }
];

shapesData.forEach((shapeData) => {
  const material = new THREE.MeshStandardMaterial({
    color: shapeData.color,
    wireframe: isWireframe,
    roughness: 0.3,
    metalness: 0.2
  });
  const mesh = new THREE.Mesh(shapeData.geometry, material);
  mesh.position.set(shapeData.posX, shapeData.posY, shapeData.posZ);

  if (shapeData.rotZ) mesh.rotation.z = shapeData.rotZ;
  if (shapeData.rotX) mesh.rotation.x = shapeData.rotX;

  mesh.castShadow = true;
  scene.add(mesh);
});

// 4. RUEDA DE LA FORTUNA
const numCabinas = 8;
const radioRueda = 6;
const cabinas = [];

const ruedaGroup = new THREE.Group();
ruedaGroup.position.set(0, 10.5, 0);
scene.add(ruedaGroup);

// Materiales unificados
const ruedaMaterial = new THREE.MeshStandardMaterial({ color: 0x6374B0, wireframe: isWireframe, roughness: 0.3, metalness: 0.2 });
const aroMaterial = new THREE.MeshStandardMaterial({ color: 0xc6374B0, wireframe: isWireframe, roughness: 0.3, metalness: 0.2 });
const cestaMaterial = new THREE.MeshStandardMaterial({ color: 0x6374B0, wireframe: isWireframe, roughness: 0.3, metalness: 0.1 });
const techoMaterial = new THREE.MeshStandardMaterial({ color: 0x63B087, wireframe: isWireframe, roughness: 0.3, metalness: 0.1 });

// Aros exterior e interior (Frontal y Trasero)
const aroGeometry = new THREE.TorusGeometry(radioRueda, 0.15, 16, 64);

const aroAdelante = new THREE.Mesh(aroGeometry, aroMaterial);
aroAdelante.position.z = 0.9;
aroAdelante.castShadow = true;
ruedaGroup.add(aroAdelante);

const aroAtras = new THREE.Mesh(aroGeometry, aroMaterial);
aroAtras.position.z = -0.9;
aroAtras.castShadow = true;
ruedaGroup.add(aroAtras);

// Geometry de los radios (Estructura interna)
const radioGeometry = new THREE.CylinderGeometry(0.08, 0.08, radioRueda * 2, 16);

for (let i = 0; i < numCabinas; i++) {
  const angulo = (i * Math.PI * 2) / numCabinas;

  // Radios frontales y traseros
  const radioAdelante = new THREE.Mesh(radioGeometry, ruedaMaterial);
  radioAdelante.rotation.z = angulo;
  radioAdelante.position.z = 0.9;
  radioAdelante.castShadow = true;
  ruedaGroup.add(radioAdelante);

  const radioTrasero = new THREE.Mesh(radioGeometry, ruedaMaterial);
  radioTrasero.rotation.z = angulo;
  radioTrasero.position.z = -0.9;
  radioTrasero.castShadow = true;
  ruedaGroup.add(radioTrasero);

  // Pivote para cada cabina (Mantiene la góndola vertical durante la rotación)
  const cabinaPivot = new THREE.Group();
  cabinaPivot.position.x = Math.cos(angulo) * radioRueda;
  cabinaPivot.position.y = Math.sin(angulo) * radioRueda;

  const cesta = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.2), cestaMaterial);
  cesta.position.y = -0.4;
  cesta.castShadow = true;
  cabinaPivot.add(cesta);

  const techo = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.8, 4), techoMaterial);
  techo.position.y = 0.5;
  techo.rotation.y = Math.PI / 4;
  techo.castShadow = true;
  cabinaPivot.add(techo);

  ruedaGroup.add(cabinaPivot);
  cabinas.push(cabinaPivot);
}

// 5. ANIMACIÓN Y RENDER LOOP
const velocidadGiro = 0.01;

function animate() {
  requestAnimationFrame(animate);

  // Rotación general del grupo de la rueda
  ruedaGroup.rotation.z += velocidadGiro;

  // Contra-rotación de las cabinas para mantener la gravedad vertical
  cabinas.forEach((cabina) => {
    cabina.rotation.z = -ruedaGroup.rotation.z;
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Ajuste dinámico de ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});