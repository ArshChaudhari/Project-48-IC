class Bullet {
  constructor(x, y, w, h) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
      isStatic: true
    };

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.image = loadImage("./others/bullet.png");
    Matter.World.add(world, this.body);
  }

  shoot() {
    var velocity = p5.Vector.fromAngle(gun.angle/45) ;
    velocity.mult(40);

    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
     translate(pos.x, pos.y);
     rotate(angle);
     imageMode(CENTER);
     image(this.image, 0, 0, this.w, this.h);
    pop();
  }
}
