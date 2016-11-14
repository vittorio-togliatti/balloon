var SideScroller = SideScroller || {};
 
SideScroller.QuizFinal = function() {};


SideScroller.QuizFinal.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
    this.correct  = this.add.audio('correct');
    this.wrong  = this.add.audio('wrong');
    
     if (typeof this.preguntaActual == 'undefined'){
          this.preguntaActual=0;
      }
      
    var preguntasJson = '{"preguntas":[{"numPregunta":13,"respuesta":1},{"numPregunta":16,"respuesta":2},{"numPregunta":17,"respuesta":2},{"numPregunta":18,"respuesta":2},{"numPregunta":19,"respuesta":3},{"numPregunta":20,"respuesta":2},{"numPregunta":21,"respuesta":1},{"numPregunta":22,"respuesta":2}]}';
      
    this.preguntasObject = JSON.parse(preguntasJson);
      
    this.img_info_antartida = this.game.add.sprite(0, 0, "info_antartida");
      
    this.btn_start = this.game.add.sprite(550, 290, "start_play",0);
    this.btn_start.inputEnabled = true;
    this.btn_start.events.onInputDown.add(this.startLevel, this);
      
   
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
    
  click_a: function(){
        this.but_a.visible = false;
        this.disableButtons();
        this.respuesta(1);
    },
    
  click_b: function(){
        this.but_b.visible = false;
      this.disableButtons();
         this.respuesta(2);
    },
    
  click_c: function(){
      this.but_c.visible = false;
      this.disableButtons();
        this.respuesta(3);
    },
    
  respuesta: function(button_pressed){
    var respuestaCorrecta = this.preguntasObject.preguntas[this.preguntaActual].respuesta;
      
      if (button_pressed == respuestaCorrecta){
          
          this.correct.play();
          
          var proximaPregunta = this.preguntasObject.preguntas[(this.preguntaActual + 1)];
          
          if (proximaPregunta != null){//Voy a la siguiente pregunta
              this.preguntaActual += 1;
              
              this.game.time.events.add(1500, this.proximaPregunta, this);
              
          } else {//Cierro nivel
              this.game.time.events.add(1500, this.finalizarJuego, this);
          }
          
          
          
      } else { //Vuelvo al juego
          this.wrong.play();
          this.game.time.events.add(1500, this.gotoMapa, this);
      }
      
    },

    finalizarJuego: function(){
        this.preguntaActual = 0;
        this.nivel = 7;
        localStorage.setItem('nivel',this.nivel);
        var img_congrats = this.game.add.sprite(0, 0, "info_congrats");
        this.game.time.events.add(3000, this.gotoMapa, this);
    },
    
    proximaPregunta: function(){
        this.but_a.visible = true;
        this.but_b.visible = true;
        this.but_c.visible = true;
        this.but_a.inputEnabled = true;
        this.but_b.inputEnabled = true;
        this.but_c.inputEnabled = true;
     var numImgPreguntaActual = this.preguntasObject.preguntas[this.preguntaActual].numPregunta;
     this.imgPreguntaActual.loadTexture("preg_ant_" + numImgPreguntaActual);
    
    },
    
    gotoMapa: function(){
        this.preguntaActual=0;
        this.state.start('Mapa');
    },
    
    gotoError: function(){
        var img_error = this.game.add.sprite(0, 0, "info_dead");
        this.game.time.events.add(3000, this.gotoMapa, this);
        this.killButtons();
    },
    
    killButtons: function(){
        this.but_a.kill();
        this.but_b.kill();
        this.but_c.kill();
    },
    
    disableButtons: function(){
        this.but_a.inputEnabled = false;
        this.but_b.inputEnabled = false;
        this.but_c.inputEnabled = false;
    },
    
    enableButtons: function(){
        this.but_a.inputEnabled = true;
        this.but_b.inputEnabled = true;
        this.but_c.inputEnabled = true;
    },
    
    startLevel: function(){
       
          
    var numImgPreguntaActual = this.preguntasObject.preguntas[this.preguntaActual].numPregunta;
    this.imgPreguntaActual = this.game.add.sprite(0, 0, "preg_ant_" + numImgPreguntaActual);
    
      
    this.but_a = this.game.add.sprite(219, 104, "but_a");
    this.but_b = this.game.add.sprite(219, 151, "but_b");
    this.but_c = this.game.add.sprite(219, 198, "but_c");
    
    this.enableButtons();
    this.but_a.events.onInputDown.add(this.click_a, this);
    this.but_b.events.onInputDown.add(this.click_b, this);
    this.but_c.events.onInputDown.add(this.click_c, this);
      
    this.pingu_antartida = this.game.add.sprite(0, 268, 'pinguino_antartida',0);
    this.anim_pingu_antartida = this.pingu_antartida.animations.add('movimiento_pinguino');
    this.anim_pingu_antartida.play(10, true);
      
    this.mar_antartida = this.game.add.sprite(0, 370, "mar_antartida");
    var tween = this.game.add.tween(this.mar_antartida).to( { y: 268 }, 30000, Phaser.Easing.Cubic.Out, true);
    tween.onComplete.add(this.gotoError, this); 
        
    }
    
    
    
    
};

