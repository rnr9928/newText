const nearDist = 0.1;
const farDist = 12000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100,
window.innerWidth / window.innerHeight,
nearDist,
farDist);

camera.position.x = 5000;
camera.position.z = 500;


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("black");
renderer.setPixelRatio(window.devicePixelRatio); // 출력 canvas 흐림방지용
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);

// 큐브
const cubeSize = 150;
const geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize); 
const material = new THREE.MeshNormalMaterial(); // 일반 벡터를 RGB 색상에 매핑
const group = new THREE.Group();
for (let i = 0; i < 350; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  const dist = farDist / 3; //사이 공간
  const distDouble = dist * 2;
  const tau = 2 * Math.PI; 

  mesh.position.x = Math.random() * distDouble - dist;
  mesh.position.y = Math.random() * distDouble - dist;
  mesh.position.z = Math.random() * distDouble - dist;
  mesh.rotation.x = Math.random() * tau;
  mesh.rotation.y = Math.random() * tau;
  mesh.rotation.z = Math.random() * tau;

  group.add(mesh);
}
scene.add(group);
 
const loader = new THREE.FontLoader();
const textMesh = new THREE.Mesh();
const createTypo = font => {

  const word = "Cookie\n Cloud";
  
  const typoProperties = {
    font: font,
    size: cubeSize ,
    height: cubeSize / 2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 6,
    bevelOffset: 1,
    bevelSegments: 8 
  };

  const text = new THREE.TextGeometry(word, typoProperties);
  textMesh.geometry = text;
  textMesh.material = material;
  textMesh.position.x = cubeSize * -2;
  textMesh.position.z = cubeSize * -1;
  scene.add(textMesh);
  
};
loader.load(
"https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
createTypo);



// 마우스 오버효과 생성
let mouseX = 10;
let mouseY = 10;
const mouseFX = {
  windowHalfX: window.innerWidth / 2,
  windowHalfY: window.innerHeight / 2,
  coordinates: function (coordX, coordY) {
    mouseX = (coordX - mouseFX.windowHalfX) * 7;
    mouseY = (coordY - mouseFX.windowHalfY) * 7;
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
  camera.position.x += (mouseX - camera.position.x) *0.05;
  camera.position.y += (mouseY * -1 - camera.position.y)*0.05 ;
  camera.lookAt(scene.position); // 회전

  const t = Date.now() * 0.00;
  const rx = Math.sin(t * 0.2) * 0.3;
  const ry = Math.sin(t * 0.4) * 0.3;
  const rz = Math.sin(t * 0.6) * 0.3;
  group.rotation.x = rx;
  group.rotation.y = ry;
  group.rotation.z = rz;
  textMesh.rotation.x = rx;
  textMesh.rotation.y = ry;
  textMesh.rotation.z = rx;

  renderer.render(scene, camera);
};
render();