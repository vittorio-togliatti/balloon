var SideScroller = SideScroller || {};
 
SideScroller.Boot = function(){};
 
//setting game configuration and loading the assets for the loading screen
 
SideScroller.Boot.prototype = {
 
  preload: function() {
 
    //assets we'll use in the loading screen
    this.load.image('preloadbar', 'img/portada_menu/preloader-bar.png');
    this.load.image('preloadbkg', 'img/portada_menu/preloader-fondo.png');
 
  },
 
  create: function() {
    this.bkg = this.game.add.sprite(0, 0,  'preloadbkg');
    this.game.stage.backgroundColor = '#C9C9C9';
 
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
    //physics system arcade
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
      
    // Start the P2 Physics Engine
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    //  Turn on impact events for the world, without this we get no collision callbacks
    this.game.physics.p2.setImpactEvents(true);
    // Set the gravity
    this.game.physics.p2.gravity.y = gravity_value;
      
      
    //start full screen
    this.game.scale.startFullScreen(true);
 
    this.state.start('Preload');
 
  }
 
};