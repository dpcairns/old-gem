var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
var renderer = new THREE.WebGLRenderer();
var xMeet, isCollided, splineP;
var jumpCounter = 0;
var isJumping = false;
var gemCount = 0;
var ceilingHeight = 82;
var movingLeft = false;
var movingRight = true;
var speed = .3;
var topScore = 0;
document.getElementById('jump').innerHTML = 'CLICK/TAP or SPACE to jump like a kirby--don\'t touch the floor or ceiling!';
document.getElementById('move').innerHTML = 'DOUBLECLICK/DOUBLETAP or ARROWS to change direction';
document.getElementById('camera').innerHTML = 'SHIFT + UP or SHIFT + DOWN to zoom';

var gemPos = { x: 30, y: 30 };
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.style.overflow = 'hidden';
window.debug = {
    get: function(){
        console.log('>>>>>>>>>>>>>>>>>> CAMERA >>>>>>>>>>>>>>>>>>');
        for (prop in camera.position){
            if (typeof camera.position[prop] !== 'function'){
                console.log(prop, + ': ', camera.position[prop]);
            }
        }
        console.log('>>>>>>>>>>>>>>>>>> MESH ROTATION >>>>>>>>>>>>>>>>>>');
        for (prop in mesh.rotation){
            if (typeof mesh.rotation[prop] !== 'function'){
                console.log(prop, + ': ', mesh.rotation[prop]);
            }
        }
    }
};


var spline = new THREE.SplineCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(4, 0, 0),
    new THREE.Vector3(5, 0, 0),
    new THREE.Vector3(6, 0, 0),
    new THREE.Vector3(7, 0, 0),
    new THREE.Vector3(8, 0, 0),
    new THREE.Vector3(9, 0, 0),
    new THREE.Vector3(10, 5, 0),
    new THREE.Vector3(11, 5, 0),
    new THREE.Vector3(12, 5, 0),
    new THREE.Vector3(13, 5, 0),
    new THREE.Vector3(14, 5, 0),
    new THREE.Vector3(15, 5, 0),
    new THREE.Vector3(16, 5, 0),
    new THREE.Vector3(17, 5, 0),
    new THREE.Vector3(18, 5, 0),
    new THREE.Vector3(19, 5, 0),
    new THREE.Vector3(20, 7, 0),
    new THREE.Vector3(21, 7, 0),
    new THREE.Vector3(22, 7, 0),
    new THREE.Vector3(23, 7, 0),
    new THREE.Vector3(24, 7, 0),
    new THREE.Vector3(25, 10, 0),
    new THREE.Vector3(26, 10, 0),
    new THREE.Vector3(27, 10, 0),
    new THREE.Vector3(28, 10, 0),
    new THREE.Vector3(29, 10, 0),
    new THREE.Vector3(30, 10, 0),
    new THREE.Vector3(31, 10, 0),
    new THREE.Vector3(32, 10, 0),
    new THREE.Vector3(33, 10, 0),
    new THREE.Vector3(34, 10, 0),
    new THREE.Vector3(35, 10, 0),
    new THREE.Vector3(36, 10, 0),
    new THREE.Vector3(37, 10, 0),
    new THREE.Vector3(38, 10, 0),
    new THREE.Vector3(39, 10, 0),
    new THREE.Vector3(40, 15, 0),
    new THREE.Vector3(41, 15, 0),
    new THREE.Vector3(42, 15, 0),
    new THREE.Vector3(43, 15, 0),
    new THREE.Vector3(44, 15, 0),
    new THREE.Vector3(45, 15, 0),
    new THREE.Vector3(46, 15, 0),
    new THREE.Vector3(47, 15, 0),
    new THREE.Vector3(48, 15, 0),
    new THREE.Vector3(49, 15, 0),
    new THREE.Vector3(50, 30, 0),
    new THREE.Vector3(51, 30, 0),
    new THREE.Vector3(52, 30, 0),
    new THREE.Vector3(53, 30, 0),
    new THREE.Vector3(54, 30, 0),
    new THREE.Vector3(55, 20, 0),
    new THREE.Vector3(56, 20, 0),
    new THREE.Vector3(57, 20, 0),
    new THREE.Vector3(58, 20, 0),
    new THREE.Vector3(59, 20, 0),
    new THREE.Vector3(61, 7, 0),
    new THREE.Vector3(62, 7, 0),
    new THREE.Vector3(63, 7, 0),
    new THREE.Vector3(64, 7, 0),
    new THREE.Vector3(65, 10, 0),
    new THREE.Vector3(66, 10, 0),
    new THREE.Vector3(67, 10, 0),
    new THREE.Vector3(68, 10, 0),
    new THREE.Vector3(69, 10, 0),
    new THREE.Vector3(70, 10, 0),
    new THREE.Vector3(71, 10, 0),
    new THREE.Vector3(72, 10, 0),
    new THREE.Vector3(73, 10, 0),
    new THREE.Vector3(74, 10, 0),
    new THREE.Vector3(75, 10, 0),
    new THREE.Vector3(76, 10, 0),
    new THREE.Vector3(77, 10, 0),
    new THREE.Vector3(78, 10, 0),
    new THREE.Vector3(79, 10, 0),
    new THREE.Vector3(80, 15, 0),
    new THREE.Vector3(81, 15, 0),
    new THREE.Vector3(82, 15, 0),
    new THREE.Vector3(83, 15, 0),
    new THREE.Vector3(84, 15, 0),
    new THREE.Vector3(85, 15, 0),
    new THREE.Vector3(86, 15, 0),
    new THREE.Vector3(87, 15, 0),
    new THREE.Vector3(88, 15, 0),
    new THREE.Vector3(89, 15, 0),
    new THREE.Vector3(90, 30, 0),
    new THREE.Vector3(91, 30, 0),
    new THREE.Vector3(92, 30, 0),
    new THREE.Vector3(93, 30, 0),
    new THREE.Vector3(94, 30, 0),
    new THREE.Vector3(95, 20, 0),
    new THREE.Vector3(96, 20, 0),
    new THREE.Vector3(97, 20, 0),
    new THREE.Vector3(98, 20, 0),
    new THREE.Vector3(99, 20, 0),
    new THREE.Vector3(100, 20, 0),
    new THREE.Vector3(101, 0, 0),
    new THREE.Vector3(102, 0, 0),
    new THREE.Vector3(103, 0, 0),
    new THREE.Vector3(104, 0, 0),
    new THREE.Vector3(105, 0, 0),
    new THREE.Vector3(106, 0, 0),
    new THREE.Vector3(107, 0, 0),
    new THREE.Vector3(108, 0, 0),
    new THREE.Vector3(109, 0, 0),
    new THREE.Vector3(110, 5, 0),
    new THREE.Vector3(111, 5, 0),
    new THREE.Vector3(112, 5, 0),
    new THREE.Vector3(113, 5, 0),
    new THREE.Vector3(114, 5, 0),
    new THREE.Vector3(115, 5, 0),
    new THREE.Vector3(116, 5, 0),
    new THREE.Vector3(117, 5, 0),
    new THREE.Vector3(118, 5, 0),
    new THREE.Vector3(119, 5, 0),
    new THREE.Vector3(120, 7, 0),
    new THREE.Vector3(121, 7, 0),
    new THREE.Vector3(122, 7, 0),
    new THREE.Vector3(123, 7, 0),
    new THREE.Vector3(124, 7, 0),
    new THREE.Vector3(125, 10, 0),
    new THREE.Vector3(126, 10, 0),
    new THREE.Vector3(127, 10, 0),
    new THREE.Vector3(128, 10, 0),
    new THREE.Vector3(129, 10, 0),
    new THREE.Vector3(130, 10, 0),
    new THREE.Vector3(131, 10, 0),
    new THREE.Vector3(132, 10, 0),
    new THREE.Vector3(133, 10, 0),
    new THREE.Vector3(134, 10, 0),
    new THREE.Vector3(135, 10, 0),
    new THREE.Vector3(136, 10, 0),
    new THREE.Vector3(137, 10, 0),
    new THREE.Vector3(138, 10, 0),
    new THREE.Vector3(139, 10, 0),
    new THREE.Vector3(140, 15, 0),
    new THREE.Vector3(141, 15, 0),
    new THREE.Vector3(142, 15, 0),
    new THREE.Vector3(143, 15, 0),
    new THREE.Vector3(144, 15, 0),
    new THREE.Vector3(145, 15, 0),
    new THREE.Vector3(146, 15, 0),
    new THREE.Vector3(147, 15, 0),
    new THREE.Vector3(148, 15, 0),
    new THREE.Vector3(149, 15, 0),
    new THREE.Vector3(150, 30, 0),
    new THREE.Vector3(151, 30, 0),
    new THREE.Vector3(152, 30, 0),
    new THREE.Vector3(153, 30, 0),
    new THREE.Vector3(154, 30, 0),
    new THREE.Vector3(155, 20, 0),
    new THREE.Vector3(156, 20, 0),
    new THREE.Vector3(157, 20, 0),
    new THREE.Vector3(158, 20, 0),
    new THREE.Vector3(159, 20, 0),
    new THREE.Vector3(161, 7, 0),
    new THREE.Vector3(162, 7, 0),
    new THREE.Vector3(163, 7, 0),
    new THREE.Vector3(164, 7, 0),
    new THREE.Vector3(165, 10, 0),
    new THREE.Vector3(166, 10, 0),
    new THREE.Vector3(167, 10, 0),
    new THREE.Vector3(168, 10, 0),
    new THREE.Vector3(169, 10, 0),
    new THREE.Vector3(170, 10, 0),
    new THREE.Vector3(171, 10, 0),
    new THREE.Vector3(172, 10, 0),
    new THREE.Vector3(173, 10, 0),
    new THREE.Vector3(174, 10, 0),
    new THREE.Vector3(175, 10, 0),
    new THREE.Vector3(176, 10, 0),
    new THREE.Vector3(177, 10, 0),
    new THREE.Vector3(178, 10, 0),
    new THREE.Vector3(179, 10, 0),
    new THREE.Vector3(180, 15, 0),
    new THREE.Vector3(181, 15, 0),
    new THREE.Vector3(182, 15, 0),
    new THREE.Vector3(183, 15, 0),
    new THREE.Vector3(184, 15, 0),
    new THREE.Vector3(185, 15, 0),
    new THREE.Vector3(186, 15, 0),
    new THREE.Vector3(187, 15, 0),
    new THREE.Vector3(188, 15, 0),
    new THREE.Vector3(189, 15, 0),
    new THREE.Vector3(190, 15, 0),
    new THREE.Vector3(191, 15, 0),
    new THREE.Vector3(192, 15, 0),
    new THREE.Vector3(193, 10, 0),
    new THREE.Vector3(194, 10, 0),
    new THREE.Vector3(195, 10, 0),
]);

var topSpline = new THREE.SplineCurve3([
    new THREE.Vector3(0, ceilingHeight, 0),
    new THREE.Vector3(1, ceilingHeight, 0),
    new THREE.Vector3(2, ceilingHeight, 0),
    new THREE.Vector3(3, ceilingHeight, 0),
    new THREE.Vector3(4, ceilingHeight, 0),
    new THREE.Vector3(5, ceilingHeight, 0),
    new THREE.Vector3(6, ceilingHeight, 0),
    new THREE.Vector3(7, ceilingHeight, 0),
    new THREE.Vector3(8, ceilingHeight, 0),
    new THREE.Vector3(9, ceilingHeight, 0),
    new THREE.Vector3(10, ceilingHeight, 0),
    new THREE.Vector3(11, ceilingHeight, 0),
    new THREE.Vector3(12, ceilingHeight, 0),
    new THREE.Vector3(13, ceilingHeight, 0),
    new THREE.Vector3(14, ceilingHeight, 0),
    new THREE.Vector3(15, ceilingHeight, 0),
    new THREE.Vector3(16, ceilingHeight, 0),
    new THREE.Vector3(17, ceilingHeight, 0),
    new THREE.Vector3(18, ceilingHeight, 0),
    new THREE.Vector3(19, ceilingHeight, 0),
    new THREE.Vector3(20, ceilingHeight, 0),
    new THREE.Vector3(21, ceilingHeight, 0),
    new THREE.Vector3(22, ceilingHeight, 0),
    new THREE.Vector3(23, ceilingHeight, 0),
    new THREE.Vector3(24, ceilingHeight, 0),
    new THREE.Vector3(25, ceilingHeight, 0),
    new THREE.Vector3(26, ceilingHeight, 0),
    new THREE.Vector3(27, ceilingHeight, 0),
    new THREE.Vector3(28, ceilingHeight, 0),
    new THREE.Vector3(29, ceilingHeight, 0),
    new THREE.Vector3(30, ceilingHeight, 0),
    new THREE.Vector3(31, ceilingHeight, 0),
    new THREE.Vector3(32, ceilingHeight, 0),
    new THREE.Vector3(33, ceilingHeight, 0),
    new THREE.Vector3(34, ceilingHeight, 0),
    new THREE.Vector3(35, ceilingHeight, 0),
    new THREE.Vector3(36, ceilingHeight, 0),
    new THREE.Vector3(37, ceilingHeight, 0),
    new THREE.Vector3(38, ceilingHeight, 0),
    new THREE.Vector3(39, ceilingHeight, 0),
    new THREE.Vector3(40, ceilingHeight, 0),
    new THREE.Vector3(41, ceilingHeight, 0),
    new THREE.Vector3(42, ceilingHeight, 0),
    new THREE.Vector3(43, ceilingHeight, 0),
    new THREE.Vector3(44, ceilingHeight, 0),
    new THREE.Vector3(45, ceilingHeight, 0),
    new THREE.Vector3(46, ceilingHeight, 0),
    new THREE.Vector3(47, ceilingHeight, 0),
    new THREE.Vector3(48, ceilingHeight, 0),
    new THREE.Vector3(49, ceilingHeight, 0),
    new THREE.Vector3(50, ceilingHeight, 0),
    new THREE.Vector3(51, ceilingHeight, 0),
    new THREE.Vector3(52, ceilingHeight, 0),
    new THREE.Vector3(53, ceilingHeight, 0),
    new THREE.Vector3(54, ceilingHeight, 0),
    new THREE.Vector3(55, ceilingHeight, 0),
    new THREE.Vector3(56, ceilingHeight, 0),
    new THREE.Vector3(57, ceilingHeight, 0),
    new THREE.Vector3(58, ceilingHeight, 0),
    new THREE.Vector3(59, ceilingHeight, 0),
    new THREE.Vector3(61, ceilingHeight, 0),
    new THREE.Vector3(62, ceilingHeight, 0),
    new THREE.Vector3(63, ceilingHeight, 0),
    new THREE.Vector3(64, ceilingHeight, 0),
    new THREE.Vector3(65, ceilingHeight, 0),
    new THREE.Vector3(66, ceilingHeight, 0),
    new THREE.Vector3(67, ceilingHeight, 0),
    new THREE.Vector3(68, ceilingHeight, 0),
    new THREE.Vector3(69, ceilingHeight, 0),
    new THREE.Vector3(70, ceilingHeight, 0),
    new THREE.Vector3(71, ceilingHeight, 0),
    new THREE.Vector3(72, ceilingHeight, 0),
    new THREE.Vector3(73, ceilingHeight, 0),
    new THREE.Vector3(74, ceilingHeight, 0),
    new THREE.Vector3(75, ceilingHeight, 0),
    new THREE.Vector3(76, ceilingHeight, 0),
    new THREE.Vector3(77, ceilingHeight, 0),
    new THREE.Vector3(78, ceilingHeight, 0),
    new THREE.Vector3(79, ceilingHeight, 0),
    new THREE.Vector3(80, ceilingHeight, 0),
    new THREE.Vector3(81, ceilingHeight, 0),
    new THREE.Vector3(82, ceilingHeight, 0),
    new THREE.Vector3(83, ceilingHeight, 0),
    new THREE.Vector3(84, ceilingHeight, 0),
    new THREE.Vector3(85, ceilingHeight, 0),
    new THREE.Vector3(86, ceilingHeight, 0),
    new THREE.Vector3(87, ceilingHeight, 0),
    new THREE.Vector3(88, ceilingHeight, 0),
    new THREE.Vector3(89, ceilingHeight, 0),
    new THREE.Vector3(90, ceilingHeight, 0),
    new THREE.Vector3(91, ceilingHeight, 0),
    new THREE.Vector3(92, ceilingHeight, 0),
    new THREE.Vector3(93, ceilingHeight, 0),
    new THREE.Vector3(94, ceilingHeight, 0),
    new THREE.Vector3(95, ceilingHeight, 0),
    new THREE.Vector3(96, ceilingHeight, 0),
    new THREE.Vector3(97, ceilingHeight, 0),
    new THREE.Vector3(98, ceilingHeight, 0),
    new THREE.Vector3(99, ceilingHeight, 0),
    new THREE.Vector3(100, ceilingHeight, 0),
    new THREE.Vector3(101, ceilingHeight, 0),
    new THREE.Vector3(102, ceilingHeight, 0),
    new THREE.Vector3(103, ceilingHeight, 0),
    new THREE.Vector3(104, ceilingHeight, 0),
    new THREE.Vector3(105, ceilingHeight, 0),
    new THREE.Vector3(106, ceilingHeight, 0),
    new THREE.Vector3(107, ceilingHeight, 0),
    new THREE.Vector3(108, ceilingHeight, 0),
    new THREE.Vector3(109, ceilingHeight, 0),
    new THREE.Vector3(110, ceilingHeight, 0),
    new THREE.Vector3(111, ceilingHeight, 0),
    new THREE.Vector3(112, ceilingHeight, 0),
    new THREE.Vector3(113, ceilingHeight, 0),
    new THREE.Vector3(114, ceilingHeight, 0),
    new THREE.Vector3(115, ceilingHeight, 0),
    new THREE.Vector3(116, ceilingHeight, 0),
    new THREE.Vector3(117, ceilingHeight, 0),
    new THREE.Vector3(118, ceilingHeight, 0),
    new THREE.Vector3(119, ceilingHeight, 0),
    new THREE.Vector3(120, ceilingHeight, 0),
    new THREE.Vector3(121, ceilingHeight, 0),
    new THREE.Vector3(122, ceilingHeight, 0),
    new THREE.Vector3(123, ceilingHeight, 0),
    new THREE.Vector3(124, ceilingHeight, 0),
    new THREE.Vector3(125, ceilingHeight, 0),
    new THREE.Vector3(126, ceilingHeight, 0),
    new THREE.Vector3(127, ceilingHeight, 0),
    new THREE.Vector3(128, ceilingHeight, 0),
    new THREE.Vector3(129, ceilingHeight, 0),
    new THREE.Vector3(130, ceilingHeight, 0),
    new THREE.Vector3(131, ceilingHeight, 0),
    new THREE.Vector3(132, ceilingHeight, 0),
    new THREE.Vector3(133, ceilingHeight, 0),
    new THREE.Vector3(134, ceilingHeight, 0),
    new THREE.Vector3(135, ceilingHeight, 0),
    new THREE.Vector3(136, ceilingHeight, 0),
    new THREE.Vector3(137, ceilingHeight, 0),
    new THREE.Vector3(138, ceilingHeight, 0),
    new THREE.Vector3(139, ceilingHeight, 0),
    new THREE.Vector3(140, ceilingHeight, 0),
    new THREE.Vector3(141, ceilingHeight, 0),
    new THREE.Vector3(142, ceilingHeight, 0),
    new THREE.Vector3(143, ceilingHeight, 0),
    new THREE.Vector3(144, ceilingHeight, 0),
    new THREE.Vector3(145, ceilingHeight, 0),
    new THREE.Vector3(146, ceilingHeight, 0),
    new THREE.Vector3(147, ceilingHeight, 0),
    new THREE.Vector3(148, ceilingHeight, 0),
    new THREE.Vector3(149, ceilingHeight, 0),
    new THREE.Vector3(150, ceilingHeight, 0),
    new THREE.Vector3(151, ceilingHeight, 0),
    new THREE.Vector3(152, ceilingHeight, 0),
    new THREE.Vector3(153, ceilingHeight, 0),
    new THREE.Vector3(154, ceilingHeight, 0),
    new THREE.Vector3(155, ceilingHeight, 0),
    new THREE.Vector3(156, ceilingHeight, 0),
    new THREE.Vector3(157, ceilingHeight, 0),
    new THREE.Vector3(158, ceilingHeight, 0),
    new THREE.Vector3(159, ceilingHeight, 0),
    new THREE.Vector3(161, ceilingHeight, 0),
    new THREE.Vector3(162, ceilingHeight, 0),
    new THREE.Vector3(163, ceilingHeight, 0),
    new THREE.Vector3(164, ceilingHeight, 0),
    new THREE.Vector3(165, ceilingHeight, 0),
    new THREE.Vector3(166, ceilingHeight, 0),
    new THREE.Vector3(167, ceilingHeight, 0),
    new THREE.Vector3(168, ceilingHeight, 0),
    new THREE.Vector3(169, ceilingHeight, 0),
    new THREE.Vector3(170, ceilingHeight, 0),
    new THREE.Vector3(171, ceilingHeight, 0),
    new THREE.Vector3(172, ceilingHeight, 0),
    new THREE.Vector3(173, ceilingHeight, 0),
    new THREE.Vector3(174, ceilingHeight, 0),
    new THREE.Vector3(175, ceilingHeight, 0),
    new THREE.Vector3(176, ceilingHeight, 0),
    new THREE.Vector3(177, ceilingHeight, 0),
    new THREE.Vector3(178, ceilingHeight, 0),
    new THREE.Vector3(179, ceilingHeight, 0),
    new THREE.Vector3(180, ceilingHeight, 0),
    new THREE.Vector3(181, ceilingHeight, 0),
    new THREE.Vector3(182, ceilingHeight, 0),
    new THREE.Vector3(183, ceilingHeight, 0),
    new THREE.Vector3(184, ceilingHeight, 0),
    new THREE.Vector3(185, ceilingHeight, 0),
    new THREE.Vector3(186, ceilingHeight, 0),
    new THREE.Vector3(187, ceilingHeight, 0),
    new THREE.Vector3(188, ceilingHeight, 0),
    new THREE.Vector3(189, ceilingHeight, 0),
    new THREE.Vector3(190, ceilingHeight, 0),
    new THREE.Vector3(191, ceilingHeight, 0),
    new THREE.Vector3(192, ceilingHeight, 0),
    new THREE.Vector3(193, ceilingHeight, 0),
    new THREE.Vector3(194, ceilingHeight, 0),
    new THREE.Vector3(195, ceilingHeight, 0),
]);

var blue = 0x0000FF;
var red = '#E44424';

var geometry = new THREE.TubeGeometry(spline, 100, 3.5, 20, false);
var topGeo = new THREE.TubeGeometry(topSpline, 100, 3.5, 20, false);
var sphereGeo = new THREE.SphereGeometry(5, 10, 5);
var gemGeo = new THREE.SphereGeometry(2, 10, 5);

            
var material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('magenta'),
    vertexColors: THREE.VertexColors,
});
      

var gemMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('yellow'),
    vertexColors: THREE.VertexColors,
});



geometry.vertices.forEach(function(v, i){
    if (i % 2 !== 0){
        v.z = v.z / 2;
    }
});

var groundMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('lightgreen'),
});

geometry.faces.forEach(function(face, i){
    if (i < 2040){
        face.color = new THREE.Color(blue);
    } else {
        face.color = new THREE.Color(red);
    }
});



var mesh = new THREE.Mesh(geometry, material);
var sphereMesh = new THREE.Mesh(sphereGeo, material);
var gemMesh = new THREE.Mesh(gemGeo, gemMaterial);
var topMesh = new THREE.Mesh(topGeo, gemMaterial);

var geometry3 = new THREE.PlaneGeometry(10000, 10000, 100, 100);
var mesh3 = new THREE.Mesh(geometry3, groundMaterial);
mesh3.rotation.x = -90 * Math.PI / 180;
mesh3.position.y = -100;
mesh3.position.z = 2000;

scene.add(mesh3);

scene.add(new THREE.AmbientLight(0xffffff, .1));
scene.add(new THREE.PointLight(0xffffff, 1));

scene.add(mesh);
scene.add(sphereMesh);
scene.add(gemMesh);
scene.add(topMesh);


scene.background = new THREE.Color('lightblue');


camera.position.x = sphereMesh.position.x;
camera.position.y = 20;
camera.position.z = 56;
sphereMesh.position.x = 5;
sphereMesh.position.y = 70;
gemMesh.position.x = gemPos.x;
gemMesh.position.y = gemPos.y;

var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  // camera.position.x = sphereMesh.position.x;
    camera.position.y = sphereMesh.position.y;

    splineP = spline.points.map(function(v){
        return { x: v.x, y: v.y };
    });


    xMeet = splineP.map(function(item){return item.x;}).indexOf(Math.floor(sphereMesh.position.x));

    isCollided = function(){
        if (splineP[xMeet] !== undefined && sphereMesh.position.y <= splineP[xMeet]['y'] + 8){
            return true;
        } else {
            return false;
        }
    };
  
    if (splineP[xMeet] !== undefined && isCollided()){
        gemCount = 0;
        document.getElementById('score').innerHTML = 'buzzzzzzz!!! floor is lava';
        topMesh.position.y = 0;
        ceilingHeight = 82;
        speed = .35;
        sphereMesh.position.y = splineP[xMeet]['y'] + 8;
    }

  
    if (!isCollided() && sphereMesh.position.y > 0 && !isJumping){
        sphereMesh.position.y -= .3;
    } else if (isJumping){
        sphereMesh.position.y += .5;
        jumpCounter++;
        if (jumpCounter > 30){
            jumpCounter = 0;
            isJumping = false;
        }
  
    }
  
  
    if (gemMesh.position.distanceTo(sphereMesh.position) < 5){
        gemCount++;
    
        if (gemCount >= topScore){
            topScore = gemCount;
        }
        document.getElementById('score').innerHTML = 'YOUR SCORE: ' + gemCount.toString();
        document.getElementById('topScore').innerHTML = 'TOP SCORE: ' + topScore.toString();

        gemPos = { x: Math.floor(Math.random() * 195), y: 50 };
        gemMesh.position.x = gemPos.x;
        gemMesh.position.y = gemPos.y;
        ceilingHeight = 82 - gemCount;
    
        if (speed < .6){
            speed = speed + .03;
        }
        if (ceilingHeight < 50){
            ceilingHeight = 50;
        } else {
            topMesh.position.y--;
        }
        document.getElementById('jump').innerHTML = '';
        document.getElementById('move').innerHTML = '';
        document.getElementById('camera').innerHTML = '';
    }
  

  
    if (sphereMesh.position.y > ceilingHeight - 7){
        jumpCounter = 61;
        gemCount = 0;
        document.getElementById('score').innerHTML = 'buzzzzzzz!!! ceiling is lava too';
        speed = .35;
        topMesh.position.y = 0;
        ceilingHeight = 82;
    }
  
    if (sphereMesh.position.x > 200){
        sphereMesh.position.x = 0;
        camera.position.x = 0;
        camera.rotation.y = 0;
        if (isCollided()){
            sphereMesh.position.y = splineP[xMeet]['y'] + 8;
        }
    }
  
    
    if (movingLeft){
        sphereMesh.position.x = sphereMesh.position.x - speed;
        sphereMesh.rotation.z += .07;
        camera.rotation.y += .0005;
        camera.position.x = camera.position.x - speed;
    }
  
    if (movingRight){
        sphereMesh.position.x = sphereMesh.position.x + speed;
        sphereMesh.rotation.z -= .07;
        camera.rotation.y -= .0005;
        camera.position.x = camera.position.x + speed;
        if (isCollided()){
            sphereMesh.position.y = splineP[xMeet]['y'] + 8;
        }
    }
  
    if (sphereMesh.position.x < 0){
        sphereMesh.position.x = 195;
        camera.position.x = 195;
        camera.rotation.y = 0;

    }
  

    document.body.addEventListener('mousemove', onMouseMove, false);
    document.body.addEventListener('click', onClick, false);
    document.body.addEventListener('mouseup', onMouseUp, false);
    document.body.addEventListener('keydown', onKeyDown, false);
    document.body.addEventListener('dblclick', onDoubleClick, false);

};

var onKeyDown = function(e){
    if (e.which === 37){
        if (e.shiftKey){
            camera.rotation.y += .01;
        }
        if (e.ctrlKey){
      //mesh.rotation.y -= .1
        } else {
            movingLeft = true;
            movingRight = false;
        }
    }
    if (e.which === 38){
        if (e.shiftKey){
            camera.position.z--;
        } else if (e.ctrlKey){
      //mesh.rotation.x -= .1
        } else {
      //sphereMesh.position.z--
        }
    }
    if (e.which === 39){
        if (e.shiftKey){
            camera.rotation.y -= .01;
        }
        if (e.ctrlKey){
      //mesh.rotation.y += .1
        } else {
            movingLeft = false;
            movingRight = true;

        }
    }
    if (e.which === 40){
        if (e.shiftKey){
            camera.position.z++;
        } else if (e.ctrlKey){
      //mesh.rotation.x += .1
        } else {
      //camera.position.y++
        }
    }
    if (e.which === 32){
        isJumping = true;
    }
};
var globalZoom = 'high';
var onClick = function(e){
    isJumping = true;

};

var onDoubleClick = function(){
    movingLeft = !movingLeft;
    movingRight = !movingRight;
};

var onMouseUp = function(e){
  // mesh.position.x = e.clientX / 10
};

var onMouseMove = function(e){
  // var mouse = {}
  // mouse.x = e.clientX
  // mouse.y = e.clientY
  // mesh.rotation.x = mouse.y / -250
  //
  // mesh.rotation.y = mouse.x / -250
};

render();
