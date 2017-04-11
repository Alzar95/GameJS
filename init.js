var pjs = new PointJS('2D', 400, 400, {
    background: 'url(Image/Background/Forest.gif) center no-repeat',
    backgroundSize: 'cover'
});

pjs.system.initFullPage();

var log = pjs.system.log;
var game = pjs.game;
var LevelTwo = pjs.game;
var point = pjs.vector.point;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;

var key = pjs.keyControl.initKeyControl();
var mouse = pjs.mouseControl.initMouseControl();



var score = 0;
var record = 0;
