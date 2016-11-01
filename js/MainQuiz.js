var SideScroller = SideScroller || {};
 
SideScroller.MainQuiz = function() {};


SideScroller.MainQuiz.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
    this.nivel = localStorage.getItem('nivel')*1;
     //localStorage.setItem('nivel',0);
    
      
    this.correct  = this.add.audio('correct');
    this.wrong  = this.add.audio('wrong');
    
      if (typeof this.preguntaActual == 'undefined'){
          this.preguntaActual=0;
      }
      
      //alert(this.nivel);
      //alert(this.preguntaActual);
    
      
    var preguntasJson = '{"continentes":[{"continente":[{"numPregunta":8,"respuesta":2},{"numPregunta":9,"respuesta":3}]},{ "continente":[{"numPregunta":3,"respuesta":2},{"numPregunta":6,"respuesta":3}]},{"continente":[{"numPregunta":7,"respuesta":1},{"numPregunta":11,"respuesta":3},{"numPregunta":12,"respuesta":3}]},{"continente":[{"numPregunta":1,"respuesta":3},{"numPregunta":2,"respuesta":1}]},{"continente":[{"numPregunta":4,"respuesta":1},{"numPregunta":5,"respuesta":3},{"numPregunta":10,"respuesta":1}]},{"continente":[{"numPregunta":14,"respuesta":2},{"numPregunta":15,"respuesta":3}]}]}';
      
    this.preguntasObject = JSON.parse(preguntasJson);
      
    //alert(preguntasObject.continentes[0].continente[0]); 
    
    var numImgPreguntaActual = this.preguntasObject.continentes[this.nivel].continente[this.preguntaActual].numPregunta;
    var imgPreguntaActual = this.game.add.sprite(0, 0, "pregunta" + numImgPreguntaActual);
    
      
    this.but_a = this.game.add.sprite(286, 151, "but_a");
    this.but_b = this.game.add.sprite(286, 209, "but_b");
    this.but_c = this.game.add.sprite(286, 265, "but_c");
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

