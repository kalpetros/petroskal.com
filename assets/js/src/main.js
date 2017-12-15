$(function() {
    $('.is-hidden').fadeIn(500);
    
    var mouseX = 0,
	mouseY = 0,

	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2,

	camera,
	scene,
	renderer;

    init();
    animate();

    function init() {

	var particle;

	var container = document.querySelector('.lines');

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 100;

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias: false, alpha: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	var geometry = new THREE.Geometry();

	var spriteMaterial = new THREE.SpriteMaterial({color: 0xe0e0e0});

	for (var i = 0; i < 100; i ++) {
	    particle = new THREE.Sprite(spriteMaterial);
	    particle.position.x = Math.random() * 2 - 1;
	    particle.position.y = Math.random() * 2 - 1;
	    particle.position.z = Math.random() * 2 - 1;
	    particle.position.normalize();
	    particle.position.multiplyScalar(Math.random() * 10 + 450);
	    particle.scale.x = particle.scale.y = 10;
	    scene.add(particle);

	    geometry.vertices.push(particle.position);
	}

	var material = new THREE.LineBasicMaterial({ color: 0x222222, opacity: 0.2 });
	var line = new THREE.Line(geometry, material);
	scene.add(line);

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);

	window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart(event) {
	if (event.touches.length > 1) {

	    event.preventDefault();

	    mouseX = event.touches[0].pageX - windowHalfX;
	    mouseY = event.touches[0].pageY - windowHalfY;
	}
    }

    function onDocumentTouchMove(event) {
	if (event.touches.length == 1) {

	    event.preventDefault();

	    mouseX = event.touches[ 0 ].pageX - windowHalfX;
	    mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
    }

    function animate() {
	requestAnimationFrame(animate);

	render();
    }

    function render() {
	camera.position.x += (mouseX - camera.position.x) * .05;
	camera.position.y += (- mouseY + 200 - camera.position.y) * .05;
	camera.lookAt(scene.position);

	renderer.render(scene, camera);
    }
});
