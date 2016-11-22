var SideScroller = SideScroller || {};
 
SideScroller.Mapa = function() {};


SideScroller.Mapa.prototype = {
 
  preload: function(){
        var objetivosNivelJson = '{"objetivos":[{"objetivo":1,"nivel":4},{"objetivo":2,"nivel":4},{"objetivo":3,"nivel":2},{"objetivo":4,"nivel":5},{"objetivo":5,"nivel":5},{"objetivo":6,"nivel":2},{"objetivo":7,"nivel":3},{"objetivo":8,"nivel":1},{"objetivo":9,"nivel":1},{"objetivo":10,"nivel":5},{"objetivo":11,"nivel":3},{"objetivo":12,"nivel":3},{"objetivo":13,"nivel":7},{"objetivo":14,"nivel":6},{"objetivo":15,"nivel":6},{"objetivo":16,"nivel":7},{"objetivo":17,"nivel":7}]}';
      
      this.objetivosNivelJson = JSON.parse(objetivosNivelJson);
      localStorage.setItem('tempLevel',-1);
    },
 
  create: function() {
    this.game.world.setBounds(0, 0, windowWidth, windowHeight);
    this.game.stage.backgroundColor = '#000000';
    this.clicAudio = this.add.audio('audio_button');
      
    this.nivel = localStorage.getItem('nivel');
    this.nivel = this.nivel*1;
    
      //**** !!!!!!!!!!!!!  ******
      //this.nivel = 6;
      
      for (i=0; i<17; i++){
        //var numobjetivo = "obj_" + i;
          
        //alert(this.objetivosNivelJson.objetivos[i].nivel);
          
        if (this.objetivosNivelJson.objetivos[i].nivel <= this.nivel){//Coloreado
            
            var numobjetivo=this.game.add.sprite(5+(37*i),321,'tile_iconos_objetivos',i);
            numobjetivo.indice = i+1;
            numobjetivo.inputEnabled = true;
            numobjetivo.events.onInputDown.add(this.showObjetivo, this);
        } else {//Gris
            this.obj_18=this.game.add.sprite(5+(37*i),321,'tile_iconos_objetivos',17);
        }
          
          
      }
    
    //this.obj_2 = this.game.add.sprite(47, 300, 'tile_iconos_objetivos',1);
      
    this.bkg = this.game.add.sprite(0, 0,  'mapa_completo');
    this.norteamerica = this.game.add.sprite(65, 6,  'norteamerica_gris');
    this.sudamerica = this.game.add.sprite(155, 133,  'sudamerica_gris');
    this.europa = this.game.add.sprite(273, 11,  'europa_gris');
    this.asia = this.game.add.sprite(343, 10,  'asia_gris');
    this.africa = this.game.add.sprite(269, 85,  'africa_gris');
    this.oceania = this.game.add.sprite(494, 125,  'oceania_gris');
    this.antartida = this.game.add.sprite(117, 278,  'antartida_gris');
    
    var but_nortamerica_x = 110;
    var but_nortamerica_y = 42;
      
    var but_sudamerica_x = 182;
    var but_sudamerica_y = 153;
      
    var but_europa_x = 298;
    var but_europa_y = 38;
      
    var but_africa_x = 340;
    var but_africa_y = 116;
      
    var but_asia_x = 443;
    var but_asia_y = 51;
      
    var but_oceania_x = 535;
    var but_oceania_y = 185;
      
    var but_antartida_x = 375;
    var but_antartida_y = 290;
      
    var ruta1_x = 120;
    var ruta1_y = 55;
    
    var ruta2_x = 198;
    var ruta2_y = 50;
    
    var ruta3_x = 315;
    var ruta3_y = 50;
      
    var ruta4_x = 358;
    var ruta4_y = 63;
      
    var ruta5_x = 455;
    var ruta5_y = 62;
      
    var ruta6_x = 390;
    var ruta6_y = 195;
    
      
   
    var boton_play;
      
    if (this.nivel == null) {
        this.nivel = 0;
        localStorage.setItem('nivel',this.nivel);
    }
      
      if (this.nivel > 6){//Finish
        this.antartida = this.game.add.sprite(117, 278,  'antartida_col');
        var butt7 =  this.game.add.sprite(but_antartida_x, but_antartida_y, 'ss_botones', 1);
        butt7.level=6;
        butt7.inputEnabled = true;
        butt7.events.onInputDown.add(this.gotoTempLevel, this); 
      }   
    
      if (this.nivel > 5){//Antartida
        this.oceania = this.game.add.sprite(494, 125,  'oceania_col');
        var mapa6 = this.game.add.sprite(ruta6_x, ruta6_y,  'ruta_6');
        var butt6 =  this.game.add.sprite(but_oceania_x, but_oceania_y, 'ss_botones', 1);
        butt6.level=5;
        butt6.inputEnabled = true;
        butt6.events.onInputDown.add(this.gotoTempLevel, this); 
      }   
      
      if (this.nivel > 4){//Oceania
        this.asia = this.game.add.sprite(343, 10,  'asia_col');
        var mapa5 = this.game.add.sprite(ruta5_x, ruta5_y,  'ruta_5');
        var butt5 =  this.game.add.sprite(but_asia_x, but_asia_y, 'ss_botones', 1);
        butt5.level=4;
        butt5.inputEnabled = true;
        butt5.events.onInputDown.add(this.gotoTempLevel, this); 
      }    
    
      if (this.nivel > 3){//Asia
        this.africa = this.game.add.sprite(269, 85,  'africa_col');
        var mapa4 = this.game.add.sprite(ruta4_x, ruta4_y,  'ruta_4');
        var butt4 =  this.game.add.sprite(but_africa_x, but_africa_y, 'ss_botones', 1);
        butt4.level=3;
        butt4.inputEnabled = true;
        butt4.events.onInputDown.add(this.gotoTempLevel, this); 
      }     
    
      if (this.nivel > 2){//africa
        this.europa = this.game.add.sprite(273, 11,  'europa_col');
        var mapa3 = this.game.add.sprite(ruta3_x, ruta3_y,  'ruta_3');
        var butt3 =  this.game.add.sprite(but_europa_x, but_europa_y, 'ss_botones', 1);
        butt3.level=2;
        butt3.inputEnabled = true;
        butt3.events.onInputDown.add(this.gotoTempLevel, this); 
           
      }     
    
      
      if (this.nivel > 1){//europa
        this.sudamerica = this.game.add.sprite(155, 133,  'sudamerica_col');
        var mapa2 = this.game.add.sprite(ruta2_x, ruta2_y,  'ruta_2');
        var butt2 =  this.game.add.sprite(but_sudamerica_x, but_sudamerica_y, 'ss_botones', 1); 
        butt2.level=1;
        butt2.inputEnabled = true;
        butt2.events.onInputDown.add(this.gotoTempLevel, this); 
        
                
      }
      
    if (this.nivel > 0){//sudamerica
        this.norteamerica = this.game.add.sprite(65, 6,  'norteamerica_col');
        var mapa1 = this.game.add.sprite(ruta1_x, ruta1_y,  'ruta_1');
        var butt1 =  this.game.add.sprite(but_nortamerica_x, but_nortamerica_y, 'ss_botones', 1); 
        butt1.level=0;
        butt1.inputEnabled = true;
        butt1.events.onInputDown.add(this.gotoTempLevel, this); 
        
      } 
              
    
    switch(this.nivel) {
            case 0://NordAmerica
                this.introInSheet = "img_norteamerica_in";
                boton_play = this.game.add.sprite(but_nortamerica_x, but_nortamerica_y, 'ss_botones');
                break;
            case 1://SudAmerica
                this.introInSheet = "img_sudamerica_in";
                boton_play = this.game.add.sprite(but_sudamerica_x, but_sudamerica_y, 'ss_botones');
                break;
            case 2://Europa
                this.introInSheet = "img_europa_in";
                boton_play = this.game.add.sprite(but_europa_x, but_europa_y, 'ss_botones');
                break;
            case 3://Africa
                this.introInSheet = "img_africa_in";
                boton_play = this.game.add.sprite(but_africa_x, but_africa_y, 'ss_botones');
                break;
            case 4://Asia
                this.introInSheet = "img_asia_in";
                boton_play = this.game.add.sprite(but_asia_x, but_asia_y, 'ss_botones');
                break;
            case 5://Oceania
                this.introInSheet = "img_oceania_in";
                boton_play = this.game.add.sprite(but_oceania_x, but_oceania_y, 'ss_botones');
                break;
            case 6://Antartida
                boton_play = this.game.add.sprite(but_antartida_x, but_antartida_y, 'ss_botones');
                break;
            case 7://Fin
                boton_play = this.game.add.sprite(but_antartida_x, but_antartida_y + 100, 'ss_botones');
                break;
        }
    
    boton_play.animations.add('pulse');
    boton_play.animations.play('pulse', 3, true);
    boton_play.inputEnabled = true;
    boton_play.events.onInputDown.add(this.gotoInFrame, this); 
      
    this.boton_atras = this.game.add.sprite(10, 0, 'atras_blanco');
    this.boton_atras.inputEnabled = true;
    this.boton_atras.events.onInputDown.add(this.gotoMenu, this); 
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
 
  gotoInFrame: function(){
      this.clicAudio.play();
      if (this.nivel==6){
          this.gotoGame();
      } else {
            var intro_in = this.game.add.sprite(0, 0, this.introInSheet);
            var boton_start = this.game.add.sprite(584, 303, 'start_play',0);
            boton_start.inputEnabled = true;
            boton_start.events.onInputDown.add(this.gotoGame, this); 
      }
      
    },
    
  gotoGame: function() {
        this.clicAudio.play();
      
        var tempLevel = localStorage.getItem('tempLevel')*1;
      
          if ((this.nivel == 6 && tempLevel < 0) || tempLevel == 6){
               this.state.start('QuizFinal');
          } else {
               this.state.start('Game');
          }
       
    },
 
  gotoMenu: function(){
        this.clicAudio.play();
        this.state.start('Menu');
    },
 
  showObjetivo: function(button){
      if (this.img_objetivo){
          this.img_objetivo.kill();
      }
      
      
      this.img_objetivo=this.game.add.sprite(0,0,'img_objetivo_' + button.indice);
      this.boton_atras.kill();
      this.boton_atras = this.game.add.sprite(10, 0, 'atras_blanco');
      this.boton_atras.inputEnabled = true;
      this.boton_atras.events.onInputDown.add(this.killObjetivo,this);
    },
 
  killObjetivo: function(){
      this.img_objetivo.kill();
      this.boton_atras.kill();
      this.boton_atras = this.game.add.sprite(10, 0, 'atras_blanco');
      this.boton_atras.inputEnabled = true;
      this.boton_atras.events.onInputDown.add(this.gotoMenu, this);
    },
    
  gotoTempLevel: function(button){
    localStorage.setItem('tempLevel',button.level);
    this.gotoGame();
    }
    
};


