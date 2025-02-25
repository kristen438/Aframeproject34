let randomPosition = (l, u) => Math.floor(Math.random() * (u - l) + l);
let scene, clouds = [], trees = [], goose = [], rocks = []; // Added rocks array

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Add Rock class
class Rock {
  constructor(x, z) {
    this.obj = document.createElement('a-entity');
    let scale = Math.random() * 1.5 + 0.5; // Random size between 0.5 and 2

    this.obj.setAttribute('geometry', {
      primitive: 'dodecahedron',
      radius: scale
    });

    this.obj.setAttribute('material', {
      color: '#696969',
      roughness: 0.8,
      metalness: 0.2
    });

    this.obj.setAttribute('position', {
      x: x,
      y: scale/2,
      z: z
    });

    this.obj.setAttribute('rotation', {
      x: Math.random() * 360,
      y: Math.random() * 360,
      z: Math.random() * 360
    });

    scene.appendChild(this.obj);
  }
}

function animate() {
  clouds.forEach(cloud => {
    cloud.fly();
  });
  requestAnimationFrame(animate);
}

function fallTreesSequentially() {
  trees.forEach((tree, index) => {
    setTimeout(() => {
      tree.obj.setAttribute('animation', {
        property: 'rotation.x',
        to: 90,
        dur: 1000,
        easing: 'easeOutQuad'
      });
    }, index * 200);
  });
}

window.onload = function() {
  scene = document.querySelector("a-scene");

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
    for (let i = 0; i < 50; i++) {
      let x = rnd(-70, 70);
      let y = rnd(40, 30);
      let z = rnd(-70, 70);
      let cloud = new Cloud(x, y, z);
      clouds.push(cloud);
    }

    // Create rocks
    for (let i = 0; i < 80; i++) {
      let x = randomPosition(-100, 100);
      let z = randomPosition(-50, 50);
      let rock = new Rock(x, z);
      rocks.push(rock);
    }

    animate();
  });
};
