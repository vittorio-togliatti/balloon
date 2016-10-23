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
      
      
      
    //Video
    this.load.video('video_intro', 'img/video/intro.mp4'); //!!!!!!
      this.load.video('video_intro1', 'img/video/intro.mp4'); //!!!!!!
      this.load.video('video_intro2', 'img/video/intro.mp4'); //!!!!!!
      this.load.video('video_intro3', 'img/video/intro.mp4'); //!!!!!!
    this.load.image('next', 'img/video/next.png');
      
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
    this.load.audio('explosion', 'audio/explosion.mp3');
    this.load.audio('shoot', 'audio/pak_shoot.mp3');
    this.load.audio('goal', 'audio/goal.mp3');
    this.load.audio('up', 'audio/up.mp3');
    this.load.audio('fuego', 'audio/fuego.wav');
      
    this.load.spritesheet('btn_continuar', 'img/common/btn_continuar.png', 150, 38, 2);
    this.load.spritesheet('btn_mapa', 'img/common/btn_mapa.png', 150, 38, 2);
    this.load.spritesheet('barra_energia', 'img/common/barra_energia.png', 100, 16, 15);
      
      
    this.load.spritesheet('tile_globo', 'img/common/globo_tiles.png', 43, 72, 6);
    this.load.image('paquete', 'img/common/paquete.png');
    this.load.image('suelo', 'img/common/suelo_1.png');
    this.load.spritesheet('particulas', 'img/common/particula_amarilla.png', 5, 5, 6);
    
    this.load.image('bkg_america_back', 'img/norteamerica/bkg_nortamerica_back_1024.png');
    this.load.image('bkg_america_middle', 'img/norteamerica/bkg_nortamerica_middle_1024.png');
    this.load.image('bkg_america_front', 'img/norteamerica/bkg_nortamerica_front_2048x2048.png');
    
      
    //objetos en suelo
    this.load.image('fabrica', 'img/norteamerica/fabrica.png');
    this.load.image('fabricaColor', 'img/norteamerica/fabrica_2.png');
    this.load.image('grua', 'img/common/grua2.png');
    this.load.image('arbolesSecos', 'img/common/arboles_secos.png');
    this.game.load.physics("sprite_physics", "img/balloon.json");
    this.game.load.physics("sprite_physics_avion", "img/avion.json");
      
      
    //objetos en el aire
    this.load.image('avion', 'img/common/avion.png');
      
    this.load.image('btn_pausa', 'img/common/btn_pausa.png');
   
  },
 
  create: function() {
 
    //this.state.start('Menu');
      this.state.start('Menu');
 
  }
 
};
