var SideScroller = SideScroller || {};
 
SideScroller.Game = function() {};


SideScroller.Game.prototype = {
 
  preload: function(){
 
      this.game.time.advancedTiming = true;
      
      var item = localStorage.getItem('gameData');
      this.dataObj = item;
    },
 
  create: function() {
      
    //*******  variables customización *******//
    this.powerUpLevelMax = 14;//Max 14
    
    
      
    //***********  end customize ************//
      
    this.MINIMUM_SWIPE_LENGTH = 30;
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
    this.powerUpAudio = this.add.audio('audio_powerup');
    this.clicAudio = this.add.audio('audio_button');
      
    
    //  Create collision groups
    this.globoCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.gruasCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.paquetesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.avionesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.firstObjectCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.secondObjectCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.helicopterosCollisionGroup = this.game.physics.p2.createCollisionGroup();
      
    this.firstObjectX = 800;
      
    this.arbolGranSheetName = "sheet_arbol_gran";
    this.arbolGranY = 48;
      
    this.arbolPequeSheetName = "sheet_arbol_peque";
    this.arbolPequeY = 40;
      
    this.cochePequeSheetName = "sheet_coche_peque";
    this.cochePequeY = 38;
      
    this.cocheGranSheetName = "sheet_coche_gran";
    this.cocheGranY = 38;
      
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
        this.firstObjectY = 96;
        this.probabilidadesObjetos = 
                  {"arboles1":3,
                   "coches1":8,
                   "arboles2":11,
                   "objetoPrincipalNivel":13,
                   "coches2":17,
                   "Gruas":20
                  }
        break;
            
        case 1://SudAmerica 
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_sudamerica_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_sudamerica_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_sudamerica_fr');
        this.firstObjectName = "hospital";
        this.firstObjectHasSheet = true;
        this.firstObjectSheetName = "sheet_hospital"
        this.firstObjectColorFrame = 1;
        this.firstObjectY = 64;
        this.probabilidadesObjetos = 
                  {"arboles1":3,
                   "coches1":8,
                   "arboles2":11,
                   "objetoPrincipalNivel":13,
                   "coches2":17,
                   "Gruas":20
                  }
        break;
            
        case 2://Europa 
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_europa_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_europa_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_europa_fr');
        this.firstObjectName = "nuclear";
        this.firstObjectHasSheet = true;
        this.firstObjectHasSecondAnimation = true;
        this.firstObjectSheetName = "sheet_nuclear"
        this.firstObjectColorFrame =3;
        this.firstObjectY = 94;
        break;
            
        case 3://Africa 
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_africa_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_africa_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_africa_fr');
        this.firstObjectName = "choza";
        this.firstObjectHasSheet = true;
        this.firstObjectSheetName = "sheet_choza";
        this.firstObjectHasSecondAnimation = false;
        this.firstObjectColorFrame =1;
        this.firstObjectY = 57;
        this.probabilidadesObjetos = 
                  {"arboles1":3,
                   "coches1":8,
                   "arboles2":11,
                   "objetoPrincipalNivel":13,
                   "coches2":17,
                   "Gruas":20
                  }
        break;
            
        case 4://Asia
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_asia_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_asia_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_asia_fr');
        this.firstObjectName = "escuela";
        this.firstObjectHasSheet = true;
        this.firstObjectSheetName = "sheet_escuela"
        this.firstObjectColorFrame =1;
        this.firstObjectX = 800;
        this.firstObjectY = 67;
        this.probabilidadesObjetos = 
                  {"arboles1":3,
                   "coches1":8,
                   "arboles2":11,
                   "objetoPrincipalNivel":13,
                   "coches2":17,
                   "Gruas":20
                  }
        break;
            
        case 5://Oceania 
        this.bkg_back = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_oceania_bk');
        this.bkg_middle = this.add.tileSprite(0, -664,windowWidth,1024,'bkg_oceania_mid');
        this.bkg_front = this.add.tileSprite(0, -1688 ,windowWidth,2048,'bkg_oceania_fr');
        this.firstObjectName = "mar";
        this.firstObjectHasSheet = true;
        this.firstObjectSheetName = "sheet_mar"
        this.firstObjectColorFrame =1;
        this.firstObjectY = 20;
        this.probabilidadesObjetos = 
                  {"arboles1":3,
                   "coches1":8,
                   "arboles2":11,
                   "objetoPrincipalNivel":13,
                   "coches2":17,
                   "Gruas":20,
                   "aviones":5,
                   "helicopteros":10
                  }
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
    this.player.body.collides( [this.gruasCollisionGroup,this.firstObjectCollisionGroup,this.avionesCollisionGroup,this.helicopterosCollisionGroup,this.secondObjectCollisionGroup], this.hitGrua, this);
      
    //El suelo
    this.ground = this.add.tileSprite(0,windowHeight - 32,windowWidth,32,'suelo');
    this.physics.arcade.enable(this.ground);
    this.ground.enableBody = true;
    this.ground.body.collideWorldBounds = true;
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
      //this.ground.visible = false;
    
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
    this.secondObjects = this.game.add.group();
    this.firstObjects = this.game.add.group();
    this.secondObjects = this.game.add.group();
      
    //Elementos de juego
    this.boton_pausa = this.game.add.sprite(608, 4, 'btn_pausa');
    this.boton_pausa.inputEnabled = true;
    this.boton_pausa.events.onInputDown.add(this.gotoPausa, this);
      
    this.but_continue = this.game.add.sprite(260, 120, 'btn_continuar',0);
    this.but_continue.inputEnabled = true;
      
    this.but_mapa = this.game.add.sprite(260, 170, 'btn_mapa',0);
      
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
        if (this.player.y > windowHeight - 69) {
            
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
        
        if (this.nivel == 0){//Norteamerica
            firstObject.animations.add('animacion',[0,1,2]);
            firstObject.play('animacion', 2, true);
        } else if(this.nivel == 2){//Europa
            firstObject.animations.add('animacion',[0,1,2]);
            firstObject.play('animacion', 2, true);
        }
       
        

            },
    
    addSecondObject: function(x, y, sheetName) {
        var secondObject = this.secondObjects.create(x, y, sheetName,0);
        this.game.physics.p2.enable([secondObject], false);
        
        secondObject.body.fixedRotation = true;
        secondObject.body.data.gravityScale = 0;
        secondObject.body.damping = 0;
        secondObject.body.static = true;
        
        secondObject.body.setCollisionGroup(this.secondObjectCollisionGroup);
        secondObject.body.collides([this.globoCollisionGroup,this.paquetesCollisionGroup]);
        
        secondObject.body.velocity.x = groundObjectsSpeed;
        
        secondObject.checkWorldBounds = true;
        secondObject.outOfBoundsKill = true;
        secondObject.isSecondObject = true;
        secondObject.sheetName = sheetName;
      
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
        this.physics.arcade.enable(arboles);
        this.objetos.add(arboles);
        arboles.body.velocity.x = groundObjectsSpeed; 

        // Automatically kill the arbol when it's no longer visible 
        arboles.checkWorldBounds = true;
        arboles.outOfBoundsKill = true;
            },
    
    addObjectsOnFloor: function() {
        var hole = Math.floor(Math.random() * 20) + 1;
        
        if (hole <= this.probabilidadesObjetos.arboles1 ){
            
            this.addSecondObject(this.firstObjectX,this.game.height-this.arbolGranY ,this.arbolGranSheetName);
             this.addSecondObject(this.firstObjectX+40,this.game.height-this.arbolGranY ,this.arbolGranSheetName);
             this.addSecondObject(this.firstObjectX+80,this.game.height-this.arbolGranY ,this.arbolGranSheetName);
            this.addSecondObject(this.firstObjectX + 120, this.game.height - this.arbolPequeY, this.arbolPequeSheetName);
            
            } else if(hole <= this.probabilidadesObjetos.coches1){
                
                this.addSecondObject(this.firstObjectX, this.game.height - this.cocheGranY, this.cocheGranSheetName);
                this.addSecondObject(this.firstObjectX + 40, this.game.height - this.cochePequeY, this.cochePequeSheetName);
                this.addSecondObject(this.firstObjectX + 80, this.game.height - this.cochePequeY, this.cochePequeSheetName);
                
            }else if(hole <= this.probabilidadesObjetos.arboles2){
                
                this.addSecondObject(this.firstObjectX,this.game.height-this.arbolGranY ,this.arbolGranSheetName);
             this.addSecondObject(this.firstObjectX+40,this.game.height-this.arbolGranY ,this.arbolGranSheetName);
                this.addSecondObject(this.firstObjectX + 80, this.game.height - this.arbolPequeY, this.arbolPequeSheetName);
                
            } else if(hole <= this.probabilidadesObjetos.objetoPrincipalNivel){
                
                this.addFirstObject(this.firstObjectX, this.game.height - this.firstObjectY);
                
            } else if(hole <= this.probabilidadesObjetos.coches2){
                
                this.addSecondObject(this.firstObjectX, this.game.height - this.cochePequeY, this.cochePequeSheetName);
               this.addSecondObject(this.firstObjectX + 40, this.game.height - this.cocheGranY, this.cocheGranSheetName);
                
            } else if(hole <= this.probabilidadesObjetos.Gruas){
                 this.addGrua(800, this.game.height - 101);
            }else {
               //Res
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
    
        paquete.body.fixedRotation = false;
        paquete.body.data.gravityScale = 1;
        paquete.body.setCollisionGroup(this.paquetesCollisionGroup);
        paquete.body.collides([this.firstObjectCollisionGroup,this.secondObjectCollisionGroup],this.collisionObject, this);

        paquete.checkWorldBounds = true;
        paquete.outOfBoundsKill = true;
              
        if (this.player.body.velocity.y > 0){
            paquete.body.velocity.y = this.player.body.velocity.y;
        }

    },
    
    
    start_swipe:   function (pointer) {
    //"use strict";
    this.audio_up.play();
    this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);
            },
    
    
    end_swipe: function (pointer) {
        //this.audio_fuego.stop();
        var swipe_length;
        this.end_swipe_point = new Phaser.Point(pointer.x, pointer.y);
        swipe_length = Phaser.Point.distance(this.end_swipe_point, this.start_swipe_point);
        
        if (swipe_length >= this.MINIMUM_SWIPE_LENGTH) {
           this.addPaquete(this.player.x,this.player.y + 35);
            this.audio_shoot.play();
        }
    },
    
   collisionObject: function(paquete, objetoColision) {
       
       if (objetoColision.primeraColision == null){
           objetoColision.primeraColision = true;
           
            paquete.sprite.kill(); 
            paquete.sprite.body.destroy();
            this.audio_goal.play();
           
           if (objetoColision.sprite.isSecondObject){
                objetoColision.sprite.loadTexture(objetoColision.sprite.sheetName, 1, false);
           } else{
            
               if (this.firstObjectHasSecondAnimation){
                   objetoColision.sprite.animations.add('animacion2',[3,4,5,6,7,8]);
                   objetoColision.sprite.play('animacion2', 10, true);
               } else if(this.firstObjectHasSheet){
                    objetoColision.sprite.loadTexture(this.firstObjectSheetName, this.firstObjectColorFrame);
               }
           }
           
           
            this.emitter = this.add.emitter(objetoColision.sprite.body.x, objetoColision.sprite.body.y, 10);
            this.emitter.makeParticles('particulas', [0, 1, 2, 3, 4, 5]);
            this.emitter.start(true, 2000,null,20);
       
            this.powerEmitter = this.add.emitter(60, 20);
            this.powerEmitter.makeParticles('particulas', [0, 1, 2, 3, 4, 5]);
            this.powerEmitter.start(true, 3000,null,20);
            
            this.powerup += 1;
       
            this.barraEnergia.body.sprite.loadTexture('barra_energia', this.powerup);
           
           if (this.powerup == this.powerUpLevelMax){
               this.player.body.velocity.x = 0;
               this.player.body.velocity.y = -30;
               this.player.body.clearCollision(true, true);
               this.player.body.data.gravityScale = 0;
               this.end = true;
            
            
               
               //this.game.paused = true;
               this.anim_barra = this.barraEnergia.animations.add('barra_energia');
               this.anim_barra.play(5, true);
               this.powerUpAudio.play();
               
               this.game.time.events.add(3000, this.gotoMainQuiz, this);
           }
           
       }
            
       
       
            
   },
    
   checkGround: function(paquete) {
       
             if ((paquete.body) && (paquete.y > (windowHeight - 39))){
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
            this.player.body.clearCollision(true, true);
            
            this.end = true;
            } 
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
    
        restartGame: function() {
            this.state.start('Game');
            },
    
        gotoMainQuiz: function() {
            this.state.start('MainQuiz');
            }
    
};


