const nearDist = 0.1;
const farDist = 10000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
window.innerWidth / window.innerHeight,
nearDist,
farDist);

camera.position.x = farDist * -2;
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#4DD0E1");
renderer.setPixelRatio(window.devicePixelRatio); // 출력 canvas 흐림방지용
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);

// 큐브
const cubeSize = 120;
const geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize); 
const material = new THREE.MeshNormalMaterial(); // 일반 벡터를 RGB 색상에 매핑
const group = new THREE.Group();
for (let i = 0; i < 350; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  const dist = farDist / 2; //사이 공간
  const distDouble = dist * 2;
  const tau = 2 * Math.PI; 

  mesh.position.x = Math.random() * distDouble - dist;
  mesh.position.y = Math.random() * distDouble - dist;
  mesh.position.z = Math.random() * distDouble - dist;
  mesh.rotation.x = Math.random() * tau;
  mesh.rotation.y = Math.random() * tau;
  mesh.rotation.z = Math.random() * tau;

  // 수동 제어
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();

  group.add(mesh);
}
scene.add(group);

const loader = new THREE.FontLoader();
const textMesh = new THREE.Mesh();
const createTypo = font => {
  const word = "";
  const typoProperties = {
    font: font,
    size: cubeSize,
    height: cubeSize / 2,
    curveSegments: 120,
    bevelEnabled: true,
    bevelThickness: 100,
    bevelSize: 60,
    bevelOffset: 10,
    bevelSegments: 80 };

  const text = new THREE.TextGeometry(word, typoProperties);
  textMesh.geometry = text;
  textMesh.material = material;
  textMesh.position.x = cubeSize * -1000;
  textMesh.position.z = cubeSize * -1000;
  scene.add(textMesh);
};
loader.load(
"https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
createTypo);


// 마우스 오버효과 생성
let mouseX = 0;
let mouseY = 0;
const mouseFX = {
  windowHalfX: window.innerWidth / 2,
  windowHalfY: window.innerHeight / 2,
  coordinates: function (coordX, coordY) {
    mouseX = (coordX - mouseFX.windowHalfX) * 10;
    mouseY = (coordY - mouseFX.windowHalfY) * 10;
  },
  onMouseMove: function (e) {
    mouseFX.coordinates(e.clientX, e.clientY);
  },
  onTouchMove: function (e) {
    mouseFX.coordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  } };

document.addEventListener("mousemove", mouseFX.onMouseMove, false);
document.addEventListener("touchmove", mouseFX.onTouchMove, false);

// 3D 랜더링
const render = () => {
  requestAnimationFrame(render);


  // onMouseMove . onTouchMove 함께작동
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
  camera.lookAt(scene.position); // 회전

  const t = Date.now() * 0.001;
  const rx = Math.sin(t * 0.7) * 0.5;
  const ry = Math.sin(t * 0.3) * 0.5;
  const rz = Math.sin(t * 0.2) * 0.5;
  group.rotation.x = rx;
  group.rotation.y = ry;
  group.rotation.z = rz;
  textMesh.rotation.x = rx;
  textMesh.rotation.y = ry;
  textMesh.rotation.z = rx;

  renderer.render(scene, camera);
};
render();