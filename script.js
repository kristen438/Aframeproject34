let randomPosition = (l, u) => Math.floor(Math.random() * (u - l) + l);
let scene, clouds = [], trees = [], goose = [];

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function animate() {
  clouds.forEach(cloud => {
    cloud.fly();
  });
  requestAnimationFrame(animate);
}

// Add function to make trees fall one by one
function fallTreesSequentially() {
  trees.forEach((tree, index) => {
    setTimeout(() => {
      // Add a falling animation
      tree.obj.setAttribute('animation', {
        property: 'rotation.x',
        to: 90,
        dur: 1000, // Duration of fall in milliseconds
        easing: 'easeOutQuad'
      });
    }, index * 200); // 200ms delay between each tree falling
  });
}

window.onload = function() {
  scene = document.querySelector("a-scene");

  // Add click event listener to the scene
  scene.addEventListener('click', fallTreesSequentially);

  scene.addEventListener('loaded', function() {
    // Create trees
    for (let i = 0; i < 200; i++) {
      let x = randomPosition(-100, 100);
      let z = randomPosition(-50, 50);
      let tree = new Tree(x, z);
      trees.push(tree);
    }

    // Create clouds
    for (let i = 0; i < 80; i++) {
      let x = rnd(-70, 70);
      let y = rnd(40, 30);
      let z = rnd(-70, 70);
      let cloud = new Cloud(x, y, z);
      clouds.push(cloud);
    }

    animate();
  });
};