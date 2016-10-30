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
      
    var ruta1_x = 120;
    var ruta1_y = 75;
    
    var ruta2_x = 198;
    var ruta2_y = 70;
    
    var ruta3_x = 315;
    var ruta3_y = 70;
      
    var ruta4_x = 358;
    var ruta4_y = 83;
    
      
    var nivel = localStorage.getItem('nivel');
    var boton_play;
      
    if (nivel == null) {
        nivel = 0;
        localStorage.setItem('nivel',nivel);
    }
    
      nivel =4;
    
      if (nivel > 3){//Asia
            this.asia = this.game.add.sprite(269, 85,  'africa_col');
            var mapa4 = this.game.add.sprite(ruta4_x, ruta4_y,  'ruta_4');
            var butt4 =  this.game.add.sprite(but_africa_x, but_africa_y, 'ss_botones', 1); 
      }     
    
      if (nivel > 2){//africa
            this.europa = this.game.add.sprite(273, 11,  'europa_col');
            var mapa3 = this.game.add.sprite(ruta3_x, ruta3_y,  'ruta_3');
            var butt3 =  this.game.add.sprite(but_europa_x, but_europa_y, 'ss_botones', 1); 
      }     
    
      
      if (nivel > 1){//europa
              this.sudamerica = this.game.add.sprite(155, 133,  'sudamerica_col');
                var butt2 =  this.game.add.sprite(but_sudamerica_x, but_sudamerica_y, 'ss_botones', 1); 
                var mapa2 = this.game.add.sprite(ruta2_x, ruta2_y,  'ruta_2');
                
      }
      
    if (nivel > 0){//sudamerica
        this.norteamerica = this.game.add.sprite(65, 6,  'norteamerica_col');
        var mapa1 = this.game.add.sprite(ruta1_x, ruta1_y,  'ruta_1');
        var butt1 =  this.game.add.sprite(but_nortamerica_x, but_nortamerica_y, 'ss_botones', 1);  
        
      } 
              
    
    switch(nivel) {
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
            case 4://Africa
                boton_play = this.game.add.sprite(but_asia_x, but_asia_y, 'ss_botones');
                break;
        }
    
    boton_play.animations.add('pulse');
    boton_play.animations.play('pulse', 3, true);
    boton_play.inputEnabled = true;
    boton_play.events.onInputDown.add(this.gotoEstadoGame, this); 
    
       
    //this.bkg.height = 360;
    //this.bkg.width = 640;
      
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
    
  gotoEstadoGame: function() {
        this.state.start('Game');
        }
    
};


