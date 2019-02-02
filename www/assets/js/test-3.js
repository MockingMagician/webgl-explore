
if ( !WebGLDetector.webgl ) {
    //Do something or implement better methods
    //WebGLDetector.addGetWebGLMessage();
} else {
    //Globals
    let controls, camera, scene, renderer, catTexture;
    ;

    //Define initControls
    function initControls() {
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
    }

    //Define initCamera
    function initCamera() {
        camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 750;
    }

    //Define initScene
    function initScene() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0.5,0.5,0.5 );
        // scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );
    }

    //Define init
    function init() {
        initCamera();
        initControls();
        initScene();
        // world
        scene.add(cat());
        // lights
        var spotLight = new THREE.SpotLight( 0xffffff, 0.5, 150, 0.82, 1, 2 );
        spotLight.position.set( 750, 1000, 750 );
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;
        scene.add( spotLight );
        // var light = new THREE.DirectionalLight( 0x002288 );
        // light.position.set( -10, -10, -10 );
        // // scene.add( light );
        var light = new THREE.AmbientLight( 0xffffff, 0.85 );
        scene.add( light );
        // renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container = document.getElementById( 'container' );
        container.appendChild( renderer.domElement );
        //
        window.addEventListener( 'resize', onWindowResize, false );
        //
        render();
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        if (controls) controls.handleResize();
        render();
    }

    function animate() {
        requestAnimationFrame( animate );
        if (controls) controls.update();
    }

    function render() {
        renderer.render( scene, camera );
    }

    function sphere(radius) {
        var geometry = new THREE.SphereGeometry( radius, 32, 32 );
        var material = new THREE.MeshToonMaterial( { map: catTexture } );
        var s = new THREE.Mesh( geometry, material );
        s.rotateY(-Math.PI / 2);

        return s;
    }

    function ear() {
        var geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 4, 150 );
        var material = new THREE.MeshToonMaterial( { map: catTexture } );
        var ear = new THREE.Mesh( geometry, material );
        ear.scale.x = ear.scale.y = ear.scale.z = 3.5;
        var group = new THREE.Group();
        group.add(ear);
        group.add(Xmirroring(ear.clone()));

        return group;
    }

    function Xmirroring(object){
        object.scale.x = object.scale.x * -1;

        return object;
    }

    function earRight() {
        var earRight = ear();
        earRight.rotateX(Math.PI / 2.5);
        earRight.rotateY(-Math.PI / 3);
        earRight.position.x += 50;
        earRight.position.y += 45;
        earRight.position.z -= 25;

        return earRight;
    }

    function earLeft() {
        var earLeft = Xmirroring(ear());
        earLeft.rotateX(Math.PI / 2.5);
        earLeft.rotateY(Math.PI / 3);
        earLeft.position.x -= 50;
        earLeft.position.y += 45;
        earLeft.position.z -= 25;

        return earLeft;
    }

    function cat() {
        var group = new THREE.Group();
        group.add(sphere(50));
        group.add(earRight());
        group.add(earLeft());

        return group;
    }

    !function textureLoader(){
        var loader = new THREE.TextureLoader();

        loader.load(
            // resource URL
            'assets/images/catface.png',

            // onLoad callback
            function ( texture ) {
                catTexture = texture;
                init();
                animate();
            },

            // onProgress callback currently not supported
            undefined,

            // onError callback
            function ( err ) {
                console.error( 'An error happened.' );
            }
        );
    }();



}