
//初始化WebGL绘图上下文，初始化着色器程序，建立模型和数据缓存，完成绘制和动画

//1.创建一个场景
var scene = new THREE.Scene();

//2.创建一个摄像机对象
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
	camera.position.z=5;


//3.创建一个WebGL渲染器，并设置大小
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

// renderer.domElement 渲染器中的画布
document.body.appendChild(renderer.domElement);

var cube;

//纹理加载器
var loader = new THREE.TextureLoader();

loader.load('fj.jpg',function(texture){
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2,2);
	
	// 创建一个立方体 ,添加物体
	var length=2;
	var geometry = new THREE.BoxGeometry(length,length,length);
	
	var material = new THREE.MeshLambertMaterial({map:texture,shading:THREE.FlatShading});
	
	//网格模型(纹理 )
	cube = new THREE.Mesh(geometry,material);
	scene.add(cube);
	
	draw();
});


//环境光
var light  = new THREE.AmbientLight('rgb(255,255,255)');
scene.add(light);

var spotLight = new THREE.spotLight('rgb(255,255,255)');
spotLight.position.set(100,1000,1000);
spotLight.castShadow = true;
scene.add(spotLight);


//创建动画
function draw(){
	
	//改变旋转方向和速度
	cube.rotation.x+=0.01;
	cube.rotation.y +=0.01;
	
	renderer.render(scene,camera);
	
	requestAnimationFrame(draw);
}
