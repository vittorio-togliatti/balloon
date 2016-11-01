var SideScroller = SideScroller || {};
 
SideScroller.Mapa = function() {};


SideScroller.Mapa.prototype = {
 
  preload: function(){
        
    },
 
  create: function() {
    this.game.world.setBounds(0, 0, windowWidth, windowHeight);
    this.game.stage.backgroundColor = '#000000';
      
    this.bkg = this.game.add.sprite(0, 0,  'mapa_completo');
    this.norteamerica = this.game.add.sprite(65, 6,  'norteamerica_gris');
    this.sudamerica = this.game.add.sprite(155, 133,  'sudamerica_gris');
    this.europa = this.game.add.sprite(273, 11,  'europa_gris');
    this.asia = this.game.add.sprite(343, 10,  'asia_gris');
    this.africa = this.game.add.sprite(269, 85,  'africa_gris');
    this.oceania = this.game.add.sprite(494, 125,  'oceania_gris');
    this.antartida = this.game.add.sprite(117, 278,  'antartida_gris');
    
    var but_nortamerica_x = 115;
    var but_nortamerica_y = 67;
      
    var but_sudamerica_x = 188;
    var but_sudamerica_y = 180;
      
    var but_europa_x = 303;
    var but_europa_y = 63;
      
    var but_africa_x = 346;
    var but_africa_y = 143;
      
    var but_asia_x = 450;
    var but_asia_y = 78;
      
    var but_oceania_x = 535;
    var but_oceania_y = 200;
      
    var but_antartida_x = 382;
    var but_antartida_y = 290;
      
    var ruta1_x = 120;
    var ruta1_y = 75;
    
    var ruta2_x = 198;
    var ruta2_y = 70;
    
    var ruta3_x = 315;
    var ruta3_y = 70;
      
    var ruta4_x = 358;
    var ruta4_y = 83;
      
    var ruta5_x = 450;
    var ruta5_y = 82;
      
    var ruta6_x = 390;
    var ruta6_y = 205;
    
      
    this.nivel = localStorage.getItem('nivel');
    this.nivel = this.nivel*1;
    //alert(nivel);
    var boton_play;
      
    if (this.nivel == null) {
        this.nivel = 0;
        localStorage.setItem('nivel',this.nivel);
    }
    
      if (this.nivel > 5){//Antartida
            this.oceania = this.game.add.sprite(494, 125,  'oceania_col');
            var mapa6 = this.game.add.sprite(ruta6_x, ruta6_y,  'ruta_6');
            var butt6 =  this.game.add.sprite(but_oceania_x, but_oceania_y, 'ss_botones', 1); 
      }   
      
      if (this.nivel > 4){//Oceania
            this.asia = this.game.add.sprite(343, 10,  'asia_col');
            var mapa5 = this.game.add.sprite(ruta5_x, ruta5_y,  'ruta_5');
            var butt5 =  this.game.add.sprite(but_asia_x, but_asia_y, 'ss_botones', 1); 
      }    
    
      if (this.nivel > 3){//Asia
            this.africa = this.game.add.sprite(269, 85,  'africa_col');
            var mapa4 = this.game.add.sprite(ruta4_x, ruta4_y,  'ruta_4');
            var butt4 =  this.game.add.sprite(but_africa_x, but_africa_y, 'ss_botones', 1); 
      }     
    
      if (this.nivel > 2){//africa
            this.europa = this.game.add.sprite(273, 11,  'europa_col');
            var mapa3 = this.game.add.sprite(ruta3_x, ruta3_y,  'ruta_3');
            var butt3 =  this.game.add.sprite(but_europa_x, but_europa_y, 'ss_botones', 1); 
      }     
    
      
      if (this.nivel > 1){//europa
              this.sudamerica = this.game.add.sprite(155, 133,  'sudamerica_col');
                var butt2 =  this.game.add.sprite(but_sudamerica_x, but_sudamerica_y, 'ss_botones', 1); 
                var mapa2 = this.game.add.sprite(ruta2_x, ruta2_y,  'ruta_2');
                
      }
      
    if (this.nivel > 0){//sudamerica
        this.norteamerica = this.game.add.sprite(65, 6,  'norteamerica_col');
        var mapa1 = this.game.add.sprite(ruta1_x, ruta1_y,  'ruta_1');
        var butt1 =  this.game.add.sprite(but_nortamerica_x, but_nortamerica_y, 'ss_botones', 1);  
        
      } 
              
    
    switch(this.nivel) {
            case 0://NordAmerica
                boton_play = this.game.add.sprite(but_nortamerica_x, but_nortamerica_y, 'ss_botones');
                break;
            case 1://SudAmerica
                boton_play = this.game.add.sprite(but_sudamerica_x, but_sudamerica_y, 'ss_botones');
                break;
            case 2://Europa
                boton_play = this.game.add.sprite(but_europa_x, but_europa_y, 'ss_botones');
                break;
            case 3://Africa
                boton_play = this.game.add.sprite(but_africa_x, but_africa_y, 'ss_botones');
                break;
            case 4://Asia
                boton_play = this.game.add.sprite(but_asia_x, but_asia_y, 'ss_botones');
                break;
            case 5://Oceania
                boton_play = this.game.add.sprite(but_oceania_x, but_oceania_y, 'ss_botones');
                break;
            case 6://Antartida
                boton_play = this.game.add.sprite(but_antartida_x, but_antartida_y, 'ss_botones');
                break;
        }
    
    boton_play.animations.add('pulse');
    boton_play.animations.play('pulse', 3, true);
    boton_play.inputEnabled = true;
    boton_play.events.onInputDown.add(this.gotoGame, this); 
      
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
    
  gotoGame: function() {
      if (this.nivel == 6){
           this.state.start('QuizFinal');
      } else {
           this.state.start('Game');
      }
       
        }
    
};


