var SideScroller = SideScroller || {};
 
SideScroller.Game = function() {};


SideScroller.Game.prototype = {
 
  preload: function(){
 
      this.game.time.advancedTiming = true;
      
      var item = localStorage.getItem('gameData');
      this.dataObj = item;
      //alert(this.dataObj);
    },
 
  create: function() {
    this.game.stage.backgroundColor = '#C9C9C9';
    this.MINIMUM_SWIPE_LENGTH = 30;
    this.game.world.setBounds(0, 0, windowWidth * 2, windowHeight);
      
    this.end = false;
    this.powerup = 0;
    
    //Create audio files
    this.audio_collision  = this.add.audio('explosion');
    this.audio_shoot  = this.add.audio('shoot');
    this.audio_goal  = this.add.audio('goal');
    this.audio_up  = this.add.audio('up');
    //this.audio_fuego  = this.add.audio('fuego');
      
    
    //  Create collision groups
    this.globoCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.gruasCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.fabricasCollisionGroup = this.game.physics.p2.createCollisionGroup();
    //this.sueloCollisionGroup = this.game.physics.p2.createCollisionGroup(); //Controlo a mano
    this.paquetesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.avionesCollisionGroup = this.game.physics.p2.createCollisionGroup();
      
    //Background
    //this.bkg = this.game.add.sprite(0, 0,  'america_bg');
    //this.game.physics.arcade.enable(this.bkg);
      
    this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_america_back');
    this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_america_middle');
    this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_america_front');
      
    //barra energia
    this.barraEnergia = this.game.add.sprite(70, 20, 'barra_energia',0);
    this.game.physics.p2.enable([this.barraEnergia], false);
    this.barraEnergia.body.fixedRotation = true;
    this.barraEnergia.body.data.gravityScale = 0;
    this.barraEnergia.body.damping = 0;
    this.barraEnergia.body.static = true;

    //El globo
    this.player = this.game.add.sprite(200, 150, 'tile_globo',0);
    this.anim_desinfla_globo = this.player.animations.add('desinfla',[2,3]);
    this.anim_acelera_globo = this.player.animations.add('acelera',[1]);
    this.game.physics.p2.enable([this.player], false);
    this.player.body.clearShapes();
    this.player.body.loadPolygon("sprite_physics", "globo");
    this.player.body.data.gravityScale = 1;
    this.player.body.fixedRotation = true;
    this.player.body.setCollisionGroup(this.globoCollisionGroup);
    this.player.body.collides( [this.gruasCollisionGroup,this.fabricasCollisionGroup,this.avionesCollisionGroup], this.hitGrua, this);
      
    //El suelo
    this.ground = this.add.tileSprite(0,windowHeight - 35,windowWidth,35,'suelo');
    this.physics.arcade.enable(this.ground);
    this.ground.enableBody = true;
    this.ground.body.collideWorldBounds = true;
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
    
    //objetos suelo
    this.objetos = this.game.add.group();
    this.objetos.enableBody = true;
    this.objetos.physicsBodyType = Phaser.Physics.ARCADE;
    this.objetos.setAll('anchor.x', 0.5);
    this.objetos.setAll('anchor.y', 0.5);
      
    this.gruas = this.game.add.group();
    this.fabricas = this.game.add.group();
    this.paquetes = this.game.add.group();
    this.aviones = this.game.add.group();
      
    //Elementos de juego
    this.boton_pausa = this.game.add.sprite(550, 40, 'btn_pausa');
    this.boton_pausa.inputEnabled = true;
    this.boton_pausa.events.onInputDown.add(this.gotoPausa, this);
      
    this.but_continue = this.game.add.sprite(170, 150, 'btn_continuar',0);
    this.but_continue.inputEnabled = true;
      
    this.but_mapa = this.game.add.sprite(320, 150, 'btn_mapa',0);
      
    this.but_continue.visible = false;
    this.but_mapa.visible = false;
        
    
    //Eventos para el swipe
    this.input.onDown.add(this.start_swipe, this);
    this.input.onUp.add(this.end_swipe, this);
    
    //Rutina de creación de objetos y obstaculos
    this.timer = this.time.events.loop(1500, this.addObjectsOnFloor, this);
      
    //Para salir de la pausa  
    this.input.onDown.add(this.unpause, this);
 }, 
 
  update: function() {
      //El movimiento
      //this.bkg.body.velocity.x = bgk_speed;
      this.bkg_back.tilePosition.x -= bgk_speed;
      this.bkg_middle.tilePosition.x -= bgk_middle_speed;
      this.bkg_front.tilePosition.x -= bgk_front_speed;
      this.ground.tilePosition.x -= ground_speed;
      
      //Controlo si los paquetes tocan el suelo y los paro
        for (var i = 0, len = this.paquetes.children.length; i < len; i++) {                          this.checkGround(this.paquetes.children[i]);
            }
      
      //Fuego para globo
      if (this.end == false) {
        if (this.input.activePointer.isDown  && (this.player.body.velocity.y > -140)){
            this.player.body.velocity.y -= vertical_acceleration; 
            this.anim_acelera_globo.play(5, true);
        } else{
            this.player.body.sprite.loadTexture('tile_globo',0);
        }
      }
      
      //Si se sale da arriba lo bloqueo
      if (this.player.y < 0)
        this.player.body.velocity.y = 0;
      
      // si el globo sale de abajo se acabó
        if (this.player.y > windowHeight - 70) {
            this.end = true;
            this.gotoPausa();
        }
            
  },
 
  render: function()
 
    {
 
//        this.game.debug.text(this.game.time.fps || '--', 20, 20, "#00ff00", "10px Courier");  
//        this.game.debug.text('Speed: ' + this.player.body.velocity.y, 20, 40, "#00ff00", "10px Courier");
//        
//        
//        this.game.debug.text('Width: ' + window.screen.availWidth * window.devicePixelRatio, 20, 60, "#00ff00", "10px Courier");
//        this.game.debug.text('Height: ' + window.screen.availHeight * window.devicePixelRatio, 20, 80, "#00ff00", "10px Courier");
        
    },
    
    addFabric: function(x, y) {
        
        var fabrica = this.fabricas.create(x, y, 'fabrica');
        this.game.physics.p2.enable([fabrica], false);
        fabrica.body.clearShapes();

        fabrica.body.loadPolygon("sprite_physics", "fabrica");
        fabrica.body.fixedRotation = true;
        fabrica.body.data.gravityScale = 0;
        fabrica.body.damping = 0;
        fabrica.body.static = true;
        
        fabrica.body.setCollisionGroup(this.fabricasCollisionGroup);
        fabrica.body.collides([this.globoCollisionGroup,this.paquetesCollisionGroup]);
        
        fabrica.body.velocity.x = groundObjectsSpeed;
        
        fabrica.checkWorldBounds = true;
        fabrica.outOfBoundsKill = true;
            },
    
    addGrua: function(x, y) {
        
        var grua = this.gruas.create(x, y, 'grua');
        this.game.physics.p2.enable([grua], false);
        grua.body.clearShapes();
        //body type static??????
        grua.body.loadPolygon("sprite_physics", "grua");
        grua.body.fixedRotation = true;
        grua.body.data.gravityScale = 0;
        grua.body.damping = 0;
        grua.body.static = true;
        
        grua.body.setCollisionGroup(this.gruasCollisionGroup);
        grua.body.collides([this.globoCollisionGroup],this.hitGrua, this);
        
        grua.body.velocity.x = groundObjectsSpeed; 

        grua.checkWorldBounds = true;
        grua.outOfBoundsKill = true;
            },
    
    addAvion: function(x, y) {
        
        var avion = this.aviones.create(x, y, 'avion');
        this.game.physics.p2.enable([avion], false);
        
        //avion.body.clearShapes();
        //avion.body.loadPolygon("sprite_physics", "avion");
        
        avion.body.fixedRotation = true;
        avion.body.data.gravityScale = 0;
        avion.body.damping = 0;
        avion.body.static = true;
        
        avion.body.setCollisionGroup(this.avionesCollisionGroup);
        avion.body.collides([this.globoCollisionGroup],this.hitGrua, this);
        
        avion.body.velocity.x = avionesSpeed; 

        avion.checkWorldBounds = true;
        avion.outOfBoundsKill = true;
            },
    
    
    addArboles: function(x, y) {
        
        var arboles = this.add.sprite(x, y, 'arbolesSecos');
        //arboles.scale.setTo(currentScaleFactor, currentScaleFactor);
        this.physics.arcade.enable(arboles);
        this.objetos.add(arboles);
        arboles.body.velocity.x = groundObjectsSpeed; 

        // Automatically kill the arbol when it's no longer visible 
        arboles.checkWorldBounds = true;
        arboles.outOfBoundsKill = true;
            },
    
    addObjectsOnFloor: function() {
        var hole = Math.floor(Math.random() * 5) + 1;
        
        if ((hole == 1) || (hole == 2) ){
            this.addArboles(800, this.game.height - 65);
            } else if(hole == 3){
                this.addFabric(800, this.game.height - 83);
            } else if(hole == 4){
                this.addAvion(800,this.game.height - 300);
            }else {
                this.addGrua(800, this.game.height - 98);
            }
        },
    
    addPaquete: function(x, y) {
        
        
        var paquete = this.paquetes.create(x, y, 'paquete');
        this.game.physics.p2.enable([paquete], false);
        //paquete.body.clearShapes();
        //body type static??????
        //grua.body.loadPolygon("sprite_physics", "grua");
        paquete.body.fixedRotation = false;
        paquete.body.data.gravityScale = 1;
        //paquete.body.damping = 1;
        
        paquete.body.setCollisionGroup(this.paquetesCollisionGroup);
        paquete.body.collides([this.fabricasCollisionGroup],this.collisionFabrica, this);
        
        //paquete.body.velocity.x = groundObjectsSpeed; 

        paquete.checkWorldBounds = true;
        paquete.outOfBoundsKill = true;
        
        
//        var paquete = this.paquetes.create(x, y, 'paquete', '');
//        //paquete.scale.setTo(currentScaleFactor, currentScaleFactor);
//        this.physics.arcade.enable(paquete);
//        //paquete.body.collideWorldBounds = true;
//        paquete.body.gravity.y = gravity_value; 
//        
        if (this.player.body.velocity.y > 0){
            paquete.body.velocity.y = this.player.body.velocity.y;
        }
//
//        paquete.checkWorldBounds = true;
//        paquete.outOfBoundsKill = true;
            },
    
    
    start_swipe:   function (pointer) {
    //"use strict";
    //this.audio_fuego.play();
    this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);
            },
    
    
    end_swipe: function (pointer) {
        //this.audio_fuego.stop();
        var swipe_length;
        this.end_swipe_point = new Phaser.Point(pointer.x, pointer.y);
        swipe_length = Phaser.Point.distance(this.end_swipe_point, this.start_swipe_point);
        
        if (swipe_length >= this.MINIMUM_SWIPE_LENGTH) {
           this.addPaquete(this.player.x,this.player.y);
            //this.audio_shoot.play();
        }
    },
    
   collisionFabrica: function(paquete, fabrica) {
       
       if (fabrica.customColored==null){
           fabrica.customColored = true;
           
            paquete.sprite.kill(); 
            paquete.sprite.body.destroy();
            this.audio_goal.play();
            
            fabrica.sprite.loadTexture('fabricaColor', 0);
       
            this.emitter = this.add.emitter(fabrica.sprite.body.x, fabrica.sprite.body.y, 10);
            this.emitter.makeParticles('particulas', [0, 1, 2, 3, 4, 5]);
            this.emitter.start(true, 2000,null,30);
           // this.time.events.add(3000, this.destroyEmitter, this);
       
            this.powerEmitter = this.add.emitter(60, 20);
            this.powerEmitter.makeParticles('particulas', [0, 1, 2, 3, 4, 5]);
            this.powerEmitter.start(true, 3000,null,30);
            
            this.powerup += 1;
       
            this.barraEnergia.body.sprite.loadTexture('barra_energia', this.powerup);
           
       }
            
       
       
            
   },
    
   checkGround: function(paquete) {
       
             if (paquete.y > (windowHeight - 30)){
                  paquete.body.velocity.y = 0;
                  paquete.body.velocity.x = groundObjectsSpeed;
                 paquete.body.data.gravityScale = 0;
             }
   },
    
    hitGrua: function(body1, body2) {
        
        if (this.end == false) {
            this.audio_collision.play();
            this.anim_desinfla_globo.play(5, true);
            this.player.body.clearCollision(true, true)
            
            this.end = true;
        } 
        
        
            //this.restartGame();
   },
    
    
    gotoPausa: function() {
        this.game.paused = true;
        this.but_continue.visible = true;
        this.but_mapa.visible = true;
        
   },
    
    unpause: function(){
        
        
            
        if (this.game.paused) {
            if (this.but_continue.getBounds().contains(this.game.input.x, this.game.input.y)) {
                    if (this.end == true){
                        this.game.paused = false;        
                        this.but_continue.visible = false;
                        this.but_mapa.visible = false;
            
                        this.restartGame();
                        } else {
                            this.game.paused = false;        
                            this.but_continue.visible = false;
                            this.but_mapa.visible = false;  
                        }
                
                }
            if (this.but_mapa.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.game.paused = false;        
                this.but_continue.visible = false;
                this.but_mapa.visible = false;
                
                this.state.start('Mapa');
                }
            
            }
        
    },
        destroyEmitter: function(){
            //this.emitter.destroy();
            //this.powerEmitter.destroy();
            },
    
    // Restart the game
        restartGame: function() {
            this.state.start('Game');
            }
    
    

    
};


