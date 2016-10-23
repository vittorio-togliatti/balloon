var SideScroller = SideScroller || {};
 
SideScroller.Video = function() {};


SideScroller.Video.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
    this.game.world.setBounds(0, 0, windowWidth, windowHeight);
      
   
    //var video = this.game.add.video('video_intro');
    //video.type="video/webm";
   
    //video.addToWorld(640, 360, 1, 1);
      
    //video.play();

      
    var boton_next = this.game.add.sprite(550, 300, 'next');
    boton_next.height = 40;
    boton_next.width = 40;
    boton_next.inputEnabled = true;
    boton_next.events.onInputDown.add(this.gotoEstadoMapa, this);
    
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
 
    
  gotoEstadoMapa: function(){
         this.state.start('Mapa');
    }
    
    
};


