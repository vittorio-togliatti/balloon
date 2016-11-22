var SideScroller = SideScroller || {};
 
SideScroller.Video = function() {};


SideScroller.Video.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
    //Parametrizacion en millisegundos
    this.params = {"tiempoEntradaNinos":4000,
                   "tiempoHablado1":7000,
                   "tiempoHablado2":7000,
                   "tiempoHablado3":7000,
                   "tiempoHablado4":5000,
                   "tiempoHablado5":5000,
                   "tiempoSalidaNinos":3000,
                   "tiempoEntradaGlobo":3000,
                   "tiempoSubidaGlobo":4000
                  }
    //Fin Parametrizacion
    
   
    this.clicAudio = this.add.audio('audio_button');
    this.bkg = this.game.add.sprite(0, 0,'img_intro');
      
    this.nens = this.game.add.sprite(-400, 167,'sheet_intro_runtalk',0);
    var nens_run = this.nens.animations.add('run',[0,1]);
    this.nens.animations.add('talk',[2,3]);
    this.nens.play('run', 5, true);
   
      
    var tween = this.game.add.tween(this.nens).to( { x: 100 }, this.params.tiempoEntradaNinos, Phaser.Easing.linear, true);
    tween.onComplete.add(this.speak1, this);
      
    this.boton_next = this.game.add.sprite(520, 315, 'img_saltarintro');
    this.boton_next.inputEnabled = true;
    this.boton_next.events.onInputDown.add(this.gotoEstadoMapa, this);
      
      
    this.introMusic = this.game.add.audio('audio_intro');
    this.introMusic.play();
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
 
    
  gotoEstadoMapa: function(){
      this.introMusic.stop();
      this.clicAudio.play();
      this.state.start('Mapa');
    },
 
  speak1: function(){
    this.nens.play('talk', 5, true);
    this.texto = this.game.add.sprite(35, 20,'sheet_intro_textos',0);
    this.game.time.events.add(this.params.tiempoHablado1, this.speak2, this);
    },
 
  speak2: function(){
    this.texto.kill();
    this.texto = this.game.add.sprite(35, 20,'sheet_intro_textos',1);
    this.game.time.events.add(this.params.tiempoHablado2, this.speak3, this);
    },
 
  speak3: function(){
    this.texto.kill();
    this.texto = this.game.add.sprite(35, 20,'sheet_intro_textos',2);
    this.game.time.events.add(this.params.tiempoHablado3, this.speak4, this);
    },
 
  speak4: function(){
    this.texto.kill();
    this.texto = this.game.add.sprite(35, 20,'sheet_intro_textos',3);
    this.game.time.events.add(this.params.tiempoHablado4, this.speak5, this);
    },
 
  speak5: function(){
    this.texto.kill();
    this.texto = this.game.add.sprite(35, 20,'sheet_intro_textos',4);
    this.game.time.events.add(this.params.tiempoHablado5, this.nens_salen, this);
    },
 
  nens_salen: function(){
    this.texto.kill();
    this.nens.play('run', 5, true);
    var tween = this.game.add.tween(this.nens).to( { x: 650 }, this.params.tiempoSalidaNinos, Phaser.Easing.linear, true);
    tween.onComplete.add(this.entraGlobo, this);
    },
    
  entraGlobo: function(){
      this.bkg2 = this.game.add.sprite(640, 0,'img_intro');
      this.intro_globo = this.game.add.sprite(700, -266, 'sheet_intro_globo',0);
      this.intro_globo.animations.add('anim');
      this.intro_globo.play('anim', 5, true);
      
      this.world.bringToTop(this.boton_next);
      
      var tween = this.game.add.tween(this.bkg).to( { x: -640 }, this.params.tiempoEntradaGlobo, Phaser.Easing.linear, true);
      
      var tween = this.game.add.tween(this.bkg2).to( { x: 0 }, this.params.tiempoEntradaGlobo, Phaser.Easing.linear, true);
      
      var tween = this.game.add.tween(this.intro_globo).to( { x: 60 }, this.params.tiempoEntradaGlobo, Phaser.linear, true);
      
      tween.onComplete.add(this.subeGlobo, this);
    },
 
  subeGlobo: function(){
    var tween = this.game.add.tween(this.intro_globo).to( { y: -600 }, this.params.tiempoSubidaGlobo, Phaser.Easing.Cubic.In, true);
      
    tween.onComplete.add(this.gotoEstadoMapa, this);
    }
    
};


