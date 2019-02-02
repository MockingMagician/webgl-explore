var camera, scene, renderer;
var geometry, material, mesh, group, camControls;

init();
animate();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function sphere(radius) {

    var geometry = new THREE.SphereGeometry( radius, 32, 32 );
    var material = new THREE.MeshNormalMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );

    return sphere

}

function ear() {
    var geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 );
    var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );

    return cube;
}

function init() {

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 1;
    camControls = new THREE.TrackballControls(camera);

    group = new THREE.Group();

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    group.add( sphere(0.2) );
//        group.add( ear() );


    geometry = new THREE.CircleBufferGeometry( 0.1, 0, 11 );
    material = new THREE.MeshNormalMaterial();

    var circle = new THREE.Mesh( geometry, material );
    circle.position.set(0.1, 0.1, -0.05);
    circle.rotation.z = 1;

    group.add( circle );

    scene.add(group);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camControls.update();

}

function animate() {

    requestAnimationFrame( animate );

//        scene.rotation.x += 0.001;
    group.rotation.y += -0.003;

    renderer.render( scene, camera );

}

function fillBody() {

    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render( scene, camera );

}

window.addEventListener('load', fillBody);
window.addEventListener('resize', fillBody);