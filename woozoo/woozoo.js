

import * as THREE from '../THREE_js/three.module.js'; // three.module.js 파일을 모듈 버전으로 불러옴
import { OrbitControls } from '../THREE_js/OrbitControls.js'; // 마우스로 화면 컨트롤 가능
import { VertexNormalsHelper } from '../THREE_js/VertexNormalsHelper.js'
import { MathUtils } from 'three';

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 0.1;
        this._camera = camera;
        this._scene.add(camera);
    }

    _setupLight() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this._scene.add(ambientLight);

        const color = 0xffffff;  //광원의 색상
        const intensity = 1;  //광원의 세기
        const light = new THREE.DirectionalLight(color, intensity);  //색상과 세기로 광원 생성
        light.position.set(-1, 2, 4); //광원의 위치
        //this._scene.add(light);
        this._camera.add(light);
    }

    _setupModel() {
        const vertices = [];
        for (let i = 0; i < 5000; i++) {
            const x = THREE.MathUtils.randFloatSpread(10);  //randFloatSpread(5) => -5~5까지의 난수
            const y = THREE.MathUtils.randFloatSpread(10);
            const z = THREE.MathUtils.randFloatSpread(10);
            
            vertices.push(x, y, z);
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        );
        
        const sprite = new THREE.TextureLoader().load(
            "../THREE_js/disc.png" );
        
        let colors = [
            "red", "blue", "white", "yellow", "green",
            "crimson", "firebrick", "maroon", "darkred", "brown",
            "sienna", "saddlebrown", "indianred", "rosybrown", "lightcoral",
            "salmon", "darksalmon", "coral", "tomato", "sandybrown",
            "lightsalmon", "peru", "chocolate", "orangered", "orange",
            
            "darkorange", "tan", "peachpuff", "bisque", "moccasin",
            "navajowhite", "wheat", "burlywood", "darkgoldenrod", "goldenrod",
            "gold", "lightgoldenrodyellow", "palegoldenrod", "khaki", "darkkhaki",
            "lawngreen", "greenyellow", "chartreuse", "lime", "limegreen",
            "yellowgreen", "olive", "olivedrab", "darkolivegreen", "forestgreen",

            "darkgreen", "seagreen", "mediumseagreen", "darkseagreen", "lightgreen",
            "palegreen", "springgreen", "mediumspringgreen", "teal", "darkcyan",
            "lightseagreen", "mediumaquamarine", "cadetblue", "steelblue", "aquamarine",
            "powderblue", "paleturquoise", "lightblue", "lightsteelblue", "skyblue",
            "lightskyblue", "mediumturquoise", "turquoise", "darkturquoise", "aqua",

            "cyan", "deepskyblue", "dodgerblue", "cornflowerblue", "royalblue",
            "blue", "mediumblue", "navy", "darkblue", "midnightblue",
            "darkslateblue", "slateblue", "mediumslateblue", "mediumpurple", "darkorchid",
            "darkviolet", "blueviolet", "mediumorchid", "plum", "lavender",
            "thistle", "orchid", "violet", "indigo", "darkmagenta",
        ]

        let colorPick = colors[Math.floor(Math.random()*200)];

        const material = new THREE.PointsMaterial({
            map: sprite,
            alphaTest: 0.5, //alphaTest 값보다 클때만 픽셀이 렌더링된다.
            color: colorPick,
            size: 0.1,
            sizeAttenuation: true // true: 카메라 거리에 따라 크기가 달라짐
        });
        
        const points = new THREE.Points(geometry, material);
        this._scene.add(points);
    }
    

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001;

        this._camera.rotation.y = time/128;
    }
}

window.onload = function() {
    new App();
}