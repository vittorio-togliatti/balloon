var SideScroller = SideScroller || {};
 
SideScroller.Splash = function() {};


SideScroller.Splash.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
      
    this.game.stage.backgroundColor = '#000000';
      
    var splash1 = this.game.add.sprite(0, 0, 'splash1');
    splash1.alpha = 0;
      
    

    this.tween1 = this.game.add.tween(splash1).to( { alpha: 1 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, true);
    
    this.tween1.onComplete.add(this.gotoTween2, this);
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
    
  gotoTween2: function(){
     
         var splash2 = this.game.add.sprite(0, 0, 'splash2');
         splash2.alpha = 0;
        
        var tween2 = this.game.add.tween(splash2).to( { alpha: 1 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, true);
        
        tween2.onComplete.add(this.gotoMenu, this);
    
    
        
    },
    
    gotoMenu: function(){
         this.state.start('Menu');
    }
    
};


