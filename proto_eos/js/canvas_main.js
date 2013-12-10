//init
var canvas, context;
var canvasBuffer, contextBuffer;
var canvasWidth = 1000, canvasHeight = 1000;
var bodyA;
var revolute_joint;
var keys = []; 
var listener;
var wrapper;
var wrapperWidth = 600, wrapperHeight = 400;  


window.onload = function()
{
	//declarer le canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext('2d');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	//buffer
	canvasBuffer = document.createElement("canvas");
	contextBuffer = canvasBuffer.getContext('2d');
	canvasBuffer.width = canvasWidth;
	canvasBuffer.height = canvasHeight;
	wrapper = document.getElementById("wrapper");
	wrapper.width = 600;
	wrapper.height = 400; 
}
 

function init() 
{   
	$("#menu").fadeOut();
	$("#replay").fadeOut();
	//instancier le game
	game = new Game();
	//initialiser le level
	game.level = new Level(0,1000,1000);
    game.level.sample();
    //instanciation des classes du jeu
	game.player =  new Player(4,9,{w : 0.5, h : 0.8});
    game.windManager = new WindManager(game.player);
	game.camera = new Camera(0,0,document.getElementById("wrapper").width,document.getElementById("wrapper").height,canvasWidth,canvasHeight);
	//setup debug draw
 	var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    //echelle de representation
    debugDraw.SetDrawScale(30.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    game.world.SetDebugDraw(debugDraw);
    //appel de la gameloop
    gameloop();
    //ajout des listener
	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);
	addContactListener();
    //game.tabjoint.push(box2DObjects.createJoint(game.level.levelBlocs[4],game.ball.physicalBody));  
}
function gameloop()
{
    if(game.end==false)
	{
        if(game.pause==false)
        {
            context.clearRect(0,0,canvasWidth,canvasHeight);
            game.world.Step(
               1 / 60   //frame-rate
            ,  10       //velocity iterations
            ,  10       //position iterations
            );
    
            game.world.DrawDebugData();
            game.world.ClearForces();    
            game.update();
        }
        handleInteractions();
        game.render();
    }
    requestAnimationFrame(gameloop);
};
