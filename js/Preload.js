var SideScroller = SideScroller || {};
 
//loading the game assets
 
SideScroller.Preload = function(){};
 
SideScroller.Preload.prototype = {
 
  preload: function() {
      
    //show loading screen
    this.bkg = this.game.add.sprite(0, 0,  'preloadbkg');
   
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
 
    this.preloadBar.anchor.setTo(0.5);
 
    this.preloadBar.scale.setTo(3);
 
    this.load.setPreloadSprite(this.preloadBar);
      
    //Load saved data
    if (localStorage.getItem('gameData') == null){
        
        var gameData = {'continentCompleted':0,'questionLevel':0};
        localStorage.setItem("gameData", JSON.stringify(gameData));
      
	   } else {
            this.dataObj = JSON.parse(localStorage.getItem('gameData'));
        }
 
    //load game assets
      
    //Portada
    this.load.image('portada', 'img/portada_menu/portada_bkg.png');
    this.load.spritesheet('btn_jugar', 'img/portada_menu/btn_jugar.png', 150, 38, 2);
    this.load.spritesheet('btn_extras', 'img/portada_menu/btn_contenidoextra.png', 150, 38, 2);
    this.load.spritesheet('btn_creditos', 'img/portada_menu/btn_creditos.png', 150, 38, 2);
    this.load.image('portada_logo', 'img/portada_menu/portada_logo.png');
    this.load.spritesheet('btn_creditos', 'img/portada_menu/pingu_tiles_118.png', 150, 38, 2);
    this.load.spritesheet('intro_pinguino', 'img/portada_menu/pingu_tiles_118.png', 118, 122, 11);
      
      
    //Video
    
      
      
    //Mapa
    this.load.spritesheet('ss_botones', 'img/mapa/btn_target.png', 19, 19, 3);
    this.load.image('mapa_completo', 'img/mapa/mapa_mar_costas.png');
    this.load.image('norteamerica_col', 'img/mapa/mapa_norteamerica_col.png');
    this.load.image('norteamerica_gris', 'img/mapa/mapa_norteamerica_gris.png');
    this.load.image('sudamerica_col', 'img/mapa/mapa_sudamerica_col.png');
    this.load.image('sudamerica_gris', 'img/mapa/mapa_sudamerica_gris.png');
    this.load.image('europa_col', 'img/mapa/mapa_europa_col.png');
    this.load.image('europa_gris', 'img/mapa/mapa_europa_gris.png');
    this.load.image('asia_col', 'img/mapa/mapa_asia_col.png');
    this.load.image('asia_gris', 'img/mapa/mapa_asia_gris.png');
    this.load.image('africa_col', 'img/mapa/mapa_africa_col.png');
    this.load.image('africa_gris', 'img/mapa/mapa_africa_gris.png');
    this.load.image('oceania_col', 'img/mapa/mapa_oceania_col.png');
    this.load.image('oceania_gris', 'img/mapa/mapa_oceania_gris.png');
    this.load.image('antartida_col', 'img/mapa/mapa_antartida_col.png');
    this.load.image('antartida_gris', 'img/mapa/mapa_antartida_gris.png');
    
    this.load.image('ruta_1', 'img/mapa/mapa_ruta1.png');
    this.load.image('ruta_2', 'img/mapa/mapa_ruta2.png');
    this.load.image('ruta_3', 'img/mapa/mapa_ruta3.png');
    this.load.image('ruta_4', 'img/mapa/mapa_ruta4.png');
    this.load.image('ruta_5', 'img/mapa/mapa_ruta5.png');
    this.load.image('ruta_6', 'img/mapa/mapa_ruta6.png');
      
      
      
 
    //this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
      
    //Game
    this.load.audio('explosion', 'audio/explosion.ogg');
    this.load.audio('shoot', 'audio/pak_shoot.ogg');
    this.load.audio('goal', 'audio/goal.ogg');
    this.load.audio('up', 'audio/up.ogg');
    this.load.audio('correct', 'audio/correct.ogg');
    this.load.audio('wrong', 'audio/wrong.ogg');
    this.load.audio('loop', 'audio/8bit-loop.ogg');
    this.load.audio('correct', 'audio/correct.ogg');
    this.load.audio('wrong', 'audio/wrong.ogg');
    
      
    this.load.spritesheet('btn_continuar', 'img/common/btn_continuar.png', 150, 38, 2);
    this.load.spritesheet('btn_mapa', 'img/common/btn_mapa.png', 150, 38, 2);
    this.load.spritesheet('barra_energia', 'img/common/barra_energia.png', 100, 16, 15);
      
      
    this.load.spritesheet('tile_globo', 'img/common/globo_tiles.png', 43, 72, 6);
    this.load.image('paquete', 'img/common/paquete.png');
    this.load.image('suelo', 'img/common/suelo_1.png');
    this.load.spritesheet('particulas', 'img/common/particula_amarilla.png', 5, 5, 6);
    
    //norteamerica
    this.load.image('bkg_norteamerica_bk', 'img/norteamerica/bkg_nortamerica_back_1024.png');
    this.load.image('bkg_norteamerica_mid', 'img/norteamerica/bkg_nortamerica_middle_1024.png');
    this.load.image('bkg_norteamerica_fr', 'img/norteamerica/bkg_nortamerica_front_2048x2048.png');
    this.load.spritesheet('sheet_primerobjetivo', 'img/norteamerica/sheet_fabrica.png', 128, 128, 4);
    
    //Sudamerica
    this.load.image('bkg_sudamerica_bk', 'img/sudamerica/bkg_sudamerica_back_1024.png');
    this.load.image('bkg_sudamerica_mid', 'img/sudamerica/bkg_sudamerica_middle_1024.png');
    this.load.image('bkg_sudamerica_fr', 'img/sudamerica/bkg_sudamerica_front_2048x2048.png');
      
    //Europa
    this.load.image('bkg_europa_bk', 'img/europa/bkg_europa_back_1024.png');
    this.load.image('bkg_europa_mid', 'img/europa/bkg_europa_middle_1024.png');
    this.load.image('bkg_europa_fr', 'img/europa/bkg_europa_front_2048x2048.png');
      
    //Africa
    this.load.image('bkg_africa_bk', 'img/africa/bkg_africa_back_1024.png');
    this.load.image('bkg_africa_mid', 'img/africa/bkg_africa_middle_1024.png');
    this.load.image('bkg_africa_fr', 'img/africa/bkg_africa_front_2048x2048.png');
      
    //Asia
    this.load.image('bkg_asia_bk', 'img/asia/bkg_asia_back_1024.png');
    this.load.image('bkg_asia_mid', 'img/asia/bkg_asia_middle_1024.png');
    this.load.image('bkg_asia_fr', 'img/asia/bkg_asia_front_2048x2048.png');
      
    //Oceania
    this.load.image('bkg_oceania_bk', 'img/oceania/bkg_oceania_back_1024.png');
    this.load.image('bkg_oceania_mid', 'img/oceania/bkg_oceania_middle_1024.png');
    this.load.image('bkg_oceania_fr', 'img/oceania/bkg_oceania_front_2048x2048.png');
    
      
    
      
    //objetos en suelo
    //this.load.image('fabrica', 'img/norteamerica/fabrica.png');
    this.load.image('fabricaColor', 'img/norteamerica/fabrica_2.png');
      
    //common  
    this.load.image('grua', 'img/common/grua2.png');
    this.load.image('arbolesSecos', 'img/common/arboles_secos.png');
    this.game.load.physics("sprite_physics", "img/balloon.json");
    //this.game.load.physics("sprite_physics_avion", "img/avion.json");
      
      
    //objetos en el aire
    this.load.image('avion', 'img/common/avion.png');
      
    this.load.image('btn_pausa', 'img/common/btn_pausa.png');
      
    //Preguntas
    this.load.image('but_a', 'img/preguntas/btn_a.png');
    this.load.image('but_b', 'img/preguntas/btn_b.png');
    this.load.image('but_c', 'img/preguntas/btn_c.png');
      
    this.load.image('info_congrats', 'img/common/info_congrats.png');
    this.load.image('info_dead', 'img/common/info_dead.png');
      
      
    this.load.image('pregunta1', 'img/preguntas/preg1.png');
    this.load.image('pregunta2', 'img/preguntas/preg2.png');
    this.load.image('pregunta3', 'img/preguntas/preg3.png');
    this.load.image('pregunta4', 'img/preguntas/preg4.png');
    this.load.image('pregunta5', 'img/preguntas/preg5.png');
    this.load.image('pregunta6', 'img/preguntas/preg6.png');
    this.load.image('pregunta7', 'img/preguntas/preg7.png');
    this.load.image('pregunta8', 'img/preguntas/preg8.png');
    this.load.image('pregunta9', 'img/preguntas/preg9.png');
    this.load.image('pregunta10', 'img/preguntas/preg10.png');
    this.load.image('pregunta11', 'img/preguntas/preg11.png');
    this.load.image('pregunta12', 'img/preguntas/preg12.png');
    this.load.image('pregunta13', 'img/preguntas/preg13.png');
    this.load.image('pregunta14', 'img/preguntas/preg14.png');
    this.load.image('pregunta15', 'img/preguntas/preg15.png');
      
    this.load.image('preg_ant_13', 'img/preguntas/ant_preg13.png');
    this.load.image('preg_ant_16', 'img/preguntas/ant_preg16.png');
    this.load.image('preg_ant_17', 'img/preguntas/ant_preg17.png');
    this.load.image('preg_ant_18', 'img/preguntas/ant_preg18.png');
    this.load.image('preg_ant_19', 'img/preguntas/ant_preg19.png');
    this.load.image('preg_ant_20', 'img/preguntas/ant_preg20.png');
    this.load.image('preg_ant_21', 'img/preguntas/ant_preg21.png');
    this.load.image('preg_ant_22', 'img/preguntas/ant_preg22.png');
    
    
   
  },
 
  create: function() {
      this.state.start('Menu');
  }
 
};