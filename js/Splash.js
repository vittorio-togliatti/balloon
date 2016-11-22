var SideScroller = SideScroller || {};
 
SideScroller.Splash = function() {};


SideScroller.Splash.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
      
    this.game.stage.backgroundColor = '#000000';
      
    this.splash1 = this.game.add.sprite(0, 0, 'splash1');
    this.splash1.alpha = 0.1;
      
    

    this.tween1 = this.game.add.tween(this.splash1).to( { alpha: 1 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, true);
    
    this.tween1.onComplete.add(this.gotoTween2, this);
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
    
  gotoTween2: function(){
        this.splash1.kill();
         var splash2 = this.game.add.sprite(0, 0, 'splash2');
         splash2.alpha = 0.1;
        
        var tween2 = this.game.add.tween(splash2).to( { alpha: 1 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, true);
        
        tween2.onComplete.add(this.gotoMenu, this);
    
    
        
    },
    
    gotoMenu: function(){
         this.state.start('Menu');
    }
    
};


