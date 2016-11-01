var SideScroller = SideScroller || {};
 
SideScroller.QuizFinal = function() {};


SideScroller.QuizFinal.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
    this.nivel = localStorage.getItem('nivel')*1;
    
    this.correct  = this.add.audio('correct');
    this.wrong  = this.add.audio('wrong');
    
    this.preguntaActual = 0;
    
    var preguntasJson = '{"preguntas":[{"numPregunta":13,"respuesta":1},{"numPregunta":16,"respuesta":1},{"numPregunta":17,"respuesta":1},{"numPregunta":18,"respuesta":1},{"numPregunta":19,"respuesta":1},{"numPregunta":20,"respuesta":1},{"numPregunta":21,"respuesta":1},{"numPregunta":22,"respuesta":1}]}';
      
    this.preguntasObject = JSON.parse(preguntasJson);
      
    
    var numImgPreguntaActual = this.preguntasObject.preguntas[this.preguntaActual].numPregunta;
    var imgPreguntaActual = this.game.add.sprite(0, 0, "preg_ant_" + numImgPreguntaActual);
    
      
    this.but_a = this.game.add.sprite(219, 104, "but_a");
    this.but_b = this.game.add.sprite(219, 151, "but_b");
    this.but_c = this.game.add.sprite(219, 198, "but_c");
    this.but_a.inputEnabled = true;
    this.but_b.inputEnabled = true;
    this.but_c.inputEnabled = true;
    this.but_a.events.onInputDown.add(this.click_a, this);
    this.but_b.events.onInputDown.add(this.click_b, this);
    this.but_c.events.onInputDown.add(this.click_c, this);
      
      
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
    
  click_a: function(){
        this.but_a.visible = false;
        this.respuesta(1);
    },
    
  click_b: function(){
        this.but_b.visible = false;
         this.respuesta(2);
    },
    
  click_c: function(){
      this.but_c.visible = false;
         this.respuesta(3);
    },
    
  respuesta: function(button_pressed){
    var respuestaCorrecta = this.preguntasObject.continentes[this.nivel].continente[this.preguntaActual].respuesta;
      
      if (button_pressed == respuestaCorrecta){
          
          this.correct.play();
          
          var proximaPregunta = this.preguntasObject.continentes[this.nivel].continente[(this.preguntaActual + 1)];
          
          if (proximaPregunta != null){//Voy a la siguiente
              this.preguntaActual += 1;
              
              this.game.time.events.add(1500, this.restartMainQuiz, this);
              
          } else {//Cierro nivel
              this.game.time.events.add(1500, this.finalizarNivel, this);
          }
          
          
          
      } else { //Vuelvo al juego
          this.wrong.play();
          this.game.time.events.add(1500, this.gotoMapa, this);
      }
      
    },

    finalizarNivel: function(){
        this.preguntaActual = 0;
        this.nivel += 1;
        localStorage.setItem('nivel',this.nivel);
        var img_congrats = this.game.add.sprite(0, 0, "info_congrats");
        this.game.time.events.add(3000, this.gotoMapa, this);
    },
    
    restartMainQuiz: function(){
        this.state.start('MainQuiz');
    },
    
    gotoMapa: function(){
        this.preguntaActual=0;
        this.state.start('Mapa');
    }
    
    
    
};

