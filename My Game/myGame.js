//Create another new file.  Name this myGame.js.  Copy/paste the following
/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
   preload: preload,
   create: create,
   update: update
});
var platforms;
var player;
var cursors;
var hitPlatform;
var stars;
var scoreText;
var collectStar;

function preload() {
   game.load.image('sky', 'assets/sky.png');
   game.load.image('ground', 'assets/platform.png');
   game.load.image('star', 'assets/star.png');
   game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

function create() {
   game.physics.startSystem(Phaser.Physics.ARCADE);
   //simple background
   game.add.sprite(0, 0, 'sky');
   game.add.sprite(90, 90, 'star');
   //platfirms group conatins the ground and the 2 ledges we can jump on
   platforms = game.add.group();
   platforms.enableBody = true;
   //this is the ground 
   var ground = platforms.create(0, game.world.height - 64, 'ground');
   ground.body.immovable = true;
   //for the ground to not move
   ground.scale.setTo(2, 2);
   var ledge = platforms.create(45, 450, 'ground');
   ledge.body.immovable = true;
   ledge = platforms.create(450, 100, 'ground');
   ledge.body.immovable = true;
   ledge = platforms.create(300, 350, 'ground');
   ledge.body.immovable = true;
   ledge = platforms.create(75, 245, 'ground');
   ledge.body.immovable = true;
   // //the player and it settings 
   player = game.add.sprite(32, game.world.height - 150, 'dude');
   game.physics.arcade.enable(player);
   player.body.gravity.y = 400;
   player.body.collideWorldBounds = true;
   //walking right or left 
   player.animations.add('left', [0, 1, 2, 3], 10, true);
   player.animations.add('right', [5, 6, 7, 8], 10, true);
   //collide the playerand the stars with the platform

   //where the stars start 
   stars = game.add.group();
   stars.enableBody = true;
   for (var i = 0; i < 12; i++) {
      //create a star inside group
      var star = stars.create(i * 70, 0, 'star');
      // gravity
      star.body.gravity.y = 1000;
      //random bounce
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
      //random star bonce

   }

   // scoreText = game.add.text(16, 16, 'score: 0', {
   //    fontSize: '32px ,
   //    fill: '#000'
   // });
   cursors = game.input.keyboard.createCursorKeys();


}

function update() {

   //collide the playerand the stars with the platform
   var hitPlatform = game.physics.arcade.collide(player, platforms);

   game.physics.arcade.collide(stars, platforms);
   game.physics.arcade.overlap(player, stars, collectStar, null, this);




   //reset the player velocity (movement)
   player.body.velocity.x = 3;
   if (cursors.left.isDown) {
      //move to the lift 
      player.body.velocity.x = -150;
      player.animations.play('left');
   }
   else if (cursors.right.isDown) {
      //move right
      player.body.velocity.x = 150;
      player.animations.play('right');
   }
   else {
      //stabd still
      player.animations.stop();
      player.frame = 4;
   }
   //allows the player to jump if they are touvhing the ground
   if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -350;
   }

}

function collectStar(player, star) {
   //collects the star
   star.kill();
}
