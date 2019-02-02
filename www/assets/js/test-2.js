if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container, stats;
var camera, controls, scene, renderer;
var cross;
init();
animate();
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomIntRandomlySigned(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    sign = Math.random() < 0.5 ? -1 : 1;
    return sign * (Math.floor(Math.random() * (max - min)) + min);
}
function myXY(min, max) {
    var q = getRandomIntRandomlySigned(min, max);
    var z = getRandomIntRandomlySigned(1, max);
    return Math.random() < 0.5 ? {x:q, y:z} : {x:z, y:q};
}
function init() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 5, 10000 );
    camera.position.z = 1500;
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', render );
    // world
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 1,1,1 );
    // scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );
    var geometry = new THREE.CylinderGeometry( 0, 10, 45, 6, 1 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
    for ( var i = 0; i < 50000; i ++ ) {
        var mesh = new THREE.Mesh( geometry, material );
        var xy = myXY(40, 500);
        mesh.position.x = xy.x;
        mesh.position.y = xy.y;
        mesh.position.z = getRandomInt(0, 500000);
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add( mesh );
    }
    // lights
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );
    var light = new THREE.DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    scene.add( light );
    var light = new THREE.AmbientLight( 0x88ffff );
    scene.add( light );
    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );
    // stats = new Stats();
    // container.appendChild( stats.dom );
    //
    window.addEventListener( 'resize', onWindowResize, false );
    //
    render();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();
    render();
}
function animate() {
    requestAnimationFrame( animate );
    controls.update();
}
function render() {
    renderer.render( scene, camera );
    // stats.update();
}