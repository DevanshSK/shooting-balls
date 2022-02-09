//Initalise project
const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

//Width and height of canvas.
canvas.width = innerWidth;
canvas.height = innerHeight;

//Creates player
class Player {
  constructor(x,y,radius,color){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath();
    c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

// Creates projectiles
class Projectile {
  constructor (x, y, radius, color, velocity){

    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update(){
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}


const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x,y,30,'blue');


//Array for management of multiple instances of projectile
const projectiles = [];

//Animation loop for projectiles
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach(projectile => {
    projectile.update();
  })
}

//Automatically registers this event listener to window.
addEventListener('click', (event) => {
  //Projectile math
  const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }

  projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', velocity
  ));
}) 

animate();