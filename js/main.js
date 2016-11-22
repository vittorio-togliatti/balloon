var SideScroller = SideScroller || {};

var originalHeight = 360;
var originalWidth = 2560;

//parametros de juego
//var bgk_speed = -50;
var bgk_speed = 0.5;
var bgk_middle_speed = 0.7;
var bgk_front_speed = 1.5;
var ground_speed = 2.5;

var avionesSpeed = -200;
var groundObjectsSpeed = -150;
var vertical_acceleration = 6;
var gravity_value = 130;
var groundObjectFrequency = 1800;
var skyObjectFrequency = 1800;


var tempWindowWidth = window.screen.availWidth * window.devicePixelRatio;
var tempWindowHeight = window.screen.availHeight * window.devicePixelRatio;

var windowWidth;
var windowHeight;

if (tempWindowWidth > tempWindowHeight){
    windowWidth = tempWindowWidth;
    windowHeight = tempWindowHeight;
} else { //se han recojido en posición vertical
    windowWidth = tempWindowHeight;
    windowHeight = tempWindowWidth;
}

//var windowHeight = 1005;
//var windowWidth = 1920;

var currentScaleFactor = windowHeight / originalHeight;
    windowHeight = originalHeight;
    windowWidth = windowWidth / currentScaleFactor;
   
SideScroller.game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, '','','',false,'');
 
SideScroller.game.state.add('Boot', SideScroller.Boot);
SideScroller.game.state.add('Splash', SideScroller.Splash);
SideScroller.game.state.add('Preload', SideScroller.Preload);
SideScroller.game.state.add('Menu', SideScroller.Menu);
SideScroller.game.state.add('Video', SideScroller.Video);
SideScroller.game.state.add('Mapa', SideScroller.Mapa);
SideScroller.game.state.add('Game', SideScroller.Game);
SideScroller.game.state.add('MainQuiz', SideScroller.MainQuiz);
SideScroller.game.state.add('QuizFinal', SideScroller.QuizFinal);
SideScroller.game.state.add('Credits', SideScroller.Credits);

SideScroller.game.state.start('Boot');