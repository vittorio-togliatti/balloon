var SideScroller = SideScroller || {};
 
SideScroller.Menu = function() {};


SideScroller.Menu.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
    this.game.stage.backgroundColor = '#000000';
    this.game.world.setBounds(0, 0, windowWidth, windowHeight);
      
    this.bkg = this.game.add.sprite(0, 0,  'portada');
    //this.bkg.height = 360;
    //this.bkg.width = 640;
    
    this.but_play = this.game.add.sprite(-200, 190, 'btn_jugar',0);
    this.but_play.inputEnabled = true;
    this.but_play.events.onInputDown.add(this.gotEstadoVideo, this);
    var tween = this.game.add.tween(this.but_play).to( { x: 260 }, 1800, Phaser.Easing.Bounce.Out, true);
      
    this.game.time.events.add(100, this.inExtras, this);
      
    this.game.time.events.add(200, this.inCredits, this);
      
    this.game.time.events.add(400, this.inLogo, this);
    
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
    
  gotEstadoVideo: function() {
        this.state.start('Mapa');
        },
    
  inExtras: function() {
        this.but_extras = this.game.add.sprite(-200, 235, 'btn_extras',0);
        this.but_extras.inputEnabled = true;
        this.but_extras.events.onInputDown.add(this.gotEstadoVideo, this);
        var tween = this.game.add.tween(this.but_extras).to( { x: 260 }, 1800, Phaser.Easing.Cubic.Out, true);
        },
    
  inCredits: function() {
        this.but_creditos = this.game.add.sprite(-200, 280, 'btn_creditos',0);
        this.but_creditos.inputEnabled = true;
        this.but_creditos.events.onInputDown.add(this.gotEstadoVideo, this);
        var tween = this.game.add.tween(this.but_creditos).to( { x: 260 }, 1800, Phaser.Easing.Cubic.Out, true);
        },
    
  inLogo: function() {
      this.pinguiIntro = this.game.add.sprite(430, 90, 'intro_pinguino',0);
      this.pinguiIntro.visible = false;
      
      this.intro_logo = this.game.add.sprite(350, -250, 'portada_logo',0);
        var tween = this.game.add.tween(this.intro_logo).to( { y: 20 }, 1800, Phaser.Easing.Cubic.Out, true);
        tween.onComplete.add(this.showPingui, this);
  },
    
  showPingui: function() {
      this.pinguiIntro.visible = true;
      var anim_pingui = this.pinguiIntro.animations.add('intro_pinguino');
      anim_pingui.play(10, true);
      var tween = this.game.add.tween(this.pinguiIntro).to( { x:470,y: 5 }, 2500, Phaser.Easing.Cubic.Out, true);
        
        
  }
    
    
};


