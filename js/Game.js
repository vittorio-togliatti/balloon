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
      
    //*******  customize *******//
    this.powerUpLevelMax = 3;
    this.MINIMUM_SWIPE_LENGTH = 30;
    
      
    //*****  end customize *****//
      
      
    this.end=false;
    this.onGround=false;
    this.powerup = 0;
    this.game.stage.backgroundColor = '#C9C9C9';
    this.game.world.setBounds(0, 0, windowWidth * 2, windowHeight);
      
    this.nivel = localStorage.getItem('nivel')*1;

    
    //Create audio files
    this.audio_collision  = this.add.audio('explosion');
    this.audio_shoot  = this.add.audio('shoot');
    this.audio_goal  = this.add.audio('goal');
    this.audio_up  = this.add.audio('up');
    //this.audio_fuego  = this.add.audio('fuego');
      
    
    //  Create collision groups
    this.globoCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.gruasCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.paquetesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.avionesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.firstObjectCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.secondObjectCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.helicopterosCollisionGroup = this.game.physics.p2.createCollisionGroup();
      
      //Parametrizacion Continentes
    switch(this.nivel) {
        case 0://NordAmerica
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_norteamerica_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_norteamerica_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_norteamerica_fr');
        this.firstObjectName = "fabrica";
        this.firstObjectHasSheet = true;
        this.firstObjectSheetName = "sheet_fabrica"
        this.firstObjectColorFrame = 3;
        this.firstObjectX = 800;
        this.firstObjectY = 100;
        break;
            
        case 1://SudAmerica 
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_sudamerica_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_sudamerica_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_sudamerica_fr');
        this.firstObjectName = "hospital";
        this.firstObjectHasSheet = true;
        this.firstObjectSheetName = "sheet_hospital"
        this.firstObjectColorFrame = 1;
        this.firstObjectX = 800;
        this.firstObjectY = 70;
        break;
            
        case 2://Europa 
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_europa_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_europa_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_europa_fr');
        this.firstObjectName = "nuclear";
        break;
            
        case 3://Africa 
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_africa_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_africa_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_africa_fr');
        this.firstObjectName = "choza";
        break;
            
        case 4://Asia
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_asia_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_asia_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_asia_fr');
        this.firstObjectName = "escuela";
        break;
            
        case 5://Oceania 
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_oceania_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_oceania_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_oceania_fr');
        this.firstObjectName = "mar_sucio";
        break;
      }
    
    
      
    //barra energia
    this.barraEnergia = this.game.add.sprite(70, 20, 'barra_energia',0);
    this.game.physics.p2.enable([this.barraEnergia], false);
    this.barraEnergia.body.fixedRotation = true;
    this.barraEnergia.body.data.gravityScale = 0;
    this.barraEnergia.body.damping = 0;
    this.barraEnergia.body.static = true;

    //El globo
    this.player = this.game.add.sprite(200, 150, 'tile_globo',0);
    this.anim_suelo_globo = this.player.animations.add('suelo',[3,4,5]);
    this.anim_desinfla_globo = this.player.animations.add('desinfla',[2,3]);
    this.anim_acelera_globo = this.player.animations.add('acelera',[1]);
      
    this.game.physics.p2.enable([this.player], false);
    this.player.body.clearShapes();
    this.player.body.loadPolygon("sprite_physics", "globo");
    this.player.body.data.gravityScale = 1;
    this.player.body.fixedRotation = true;
    this.player.body.setCollisionGroup(this.globoCollisionGroup);
    this.player.body.collides( [this.gruasCollisionGroup,this.firstObjectCollisionGroup,this.avionesCollisionGroup,this.helicopterosCollisionGroup], this.hitGrua, this);
      
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
    this.paquetes = this.game.add.group();
    this.aviones = this.game.add.group();
    this.helicopteros = this.game.add.group();
    this.objetivos2 = this.game.add.group();
    this.firstObjects = this.game.add.group();
    this.secondObjects = this.game.add.group();
      
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
      
    //Rutina de creación de aviones y helicopteros
    this.timer = this.time.events.loop(4000, this.addObjectsOnAir, this);
      
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
        if (this.player.y > windowHeight - 72) {
            
            this.player.body.velocity.y = 0;
            this.player.body.velocity.x = 0; 
            
            if (!this.end){
                this.audio_collision.play();
            }
            
            if (!this.onGround) {
                this.onGround = true;
                this.end = true;
                this.player.body.gravity.y = 0; 
                this.player.body.clearCollision(true, true)
                this.anim_suelo_globo.onComplete.add(this.gotoPausa, this);
                this.anim_suelo_globo.play(10, false);
                   
            }
            
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
    
    addFirstObject: function(x, y) {
        
        if (this.firstObjectHasSheet){
            var firstObject = this.firstObjects.create(x, y, this.firstObjectSheetName,0);
        }else{
            var firstObject = this.firstObjects.create(x, y, this.firstObjectName);
        }
        
        this.game.physics.p2.enable([firstObject], false);
        
        firstObject.body.clearShapes();
        firstObject.body.loadPolygon("sprite_physics", this.firstObjectName);
        
        firstObject.body.fixedRotation = true;
        firstObject.body.data.gravityScale = 0;
        firstObject.body.damping = 0;
        firstObject.body.static = true;
        
        firstObject.body.setCollisionGroup(this.firstObjectCollisionGroup);
        firstObject.body.collides([this.globoCollisionGroup,this.paquetesCollisionGroup]);
        
        firstObject.body.velocity.x = groundObjectsSpeed;
        
        firstObject.checkWorldBounds = true;
        firstObject.outOfBoundsKill = true;
        
        if (this.nivel == 0){
            firstObject.animations.add('animacion',[0,1,2]);
            firstObject.play('animacion', 2, true);
        }
       
        

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
        
        avion.body.clearShapes();
        avion.body.loadPolygon("sprite_physics", "avion");
        
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
    
    addHelicoptero: function(x, y) {
        
        var helicoptero = this.helicopteros.create(x, y, 'sheet_helicoptero',0);
        var anim_helicoptero = helicoptero.animations.add('heli');
        helicoptero.play('heli', 5, true);
        
        this.game.physics.p2.enable([helicoptero], false);
        
        helicoptero.body.clearShapes();
        helicoptero.body.loadPolygon("sprite_physics", "helicoptero");
        
        helicoptero.body.fixedRotation = true;
        helicoptero.body.data.gravityScale = 0;
        helicoptero.body.damping = 0;
        helicoptero.body.static = true;
        
        helicoptero.body.setCollisionGroup(this.helicopterosCollisionGroup);
        helicoptero.body.collides([this.globoCollisionGroup],this.hitGrua, this);
        
        helicoptero.body.velocity.x = avionesSpeed; 

        helicoptero.checkWorldBounds = true;
        helicoptero.outOfBoundsKill = true;
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
                this.addFirstObject(this.firstObjectX, this.game.height - this.firstObjectY);
            } else if(hole == 4){
                this.addArboles(800,this.game.height - 65);
            }else {
                this.addGrua(800, this.game.height - 98);
            }
        },
    
    addObjectsOnAir: function() {
        var hole = Math.floor(Math.random() * 5) + 1;
        
        if (hole < 4){
            this.addAvion(800,this.game.height - 300);
            } else {
                this.addHelicoptero(800, this.game.height - 300);
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
        paquete.body.collides([this.firstObjectCollisionGroup],this.collisionFirstObject, this);
        
        //paquete.body.velocity.x = groundObjectsSpeed; 

        paquete.checkWorldBounds = true;
        paquete.outOfBoundsKill = true;
              
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
           this.addPaquete(this.player.x,this.player.y + 15);
            this.audio_shoot.play();
        }
    },
    
   collisionFirstObject: function(paquete, firstObject) {
       
       if (firstObject.customColored==null){ //solo primera colision
           firstObject.customColored = true;
           
            paquete.sprite.kill(); 
            paquete.sprite.body.destroy();
            this.audio_goal.play();
            
           if (this.firstObjectHasSheet){
               firstObject.sprite.loadTexture(this.firstObjectSheetName, this.firstObjectColorFrame);
           } else {
               //********************** Añadir *************************
               //firstObject.sprite.loadTexture(this.firstObjectSheetName, 3);
               //********************** Añadir *************************
           }
            
       
            this.emitter = this.add.emitter(firstObject.sprite.body.x, firstObject.sprite.body.y, 10);
            this.emitter.makeParticles('particulas', [0, 1, 2, 3, 4, 5]);
            this.emitter.start(true, 2000,null,20);
           // this.time.events.add(3000, this.destroyEmitter, this);
       
            this.powerEmitter = this.add.emitter(60, 20);
            this.powerEmitter.makeParticles('particulas', [0, 1, 2, 3, 4, 5]);
            this.powerEmitter.start(true, 3000,null,20);
            
            this.powerup += 1;
       
            this.barraEnergia.body.sprite.loadTexture('barra_energia', this.powerup);
           
           if (this.powerup == this.powerUpLevelMax){
               this.gotoMainQuiz();
           }
           
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
            this.player.body.velocity.x = 0; 
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
            },
    
        gotoMainQuiz: function() {
            this.state.start('MainQuiz');
            }
    
    

    
};


