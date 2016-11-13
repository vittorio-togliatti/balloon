var SideScroller = SideScroller || {};
 
SideScroller.Credits = function() {};


SideScroller.Credits.prototype = {
 
  preload: function(){
        
    },
 
  create: function() {
    this.game.stage.backgroundColor = '#FFFFFF';
    var credits = this.game.add.sprite(0, 360,  'credits');
      
    var atras = this.game.add.sprite(550, 320,  'atras_negro');
    atras.inputEnabled = true;
    atras.events.onInputDown.add(this.gotoEstadoMenu, this);
      
    var tween = this.game.add.tween(credits).to( { y: -900 }, 30000,  "Linear", true);
    tween.onComplete.add(this.gotoEstadoMenu, this);
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    },
    
  gotoEstadoMenu: function() {
        this.state.start('Menu');
        }
};


