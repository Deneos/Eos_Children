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
	
	//instancier le game
	game = new Game();
	//initialiser le level
	game.level = new Level(0,1000,1000);
 	//creer les plateformes
	var b = new Platform(9,11,20,0.5,"ground");
	game.level.levelBlocs.push(b);
	/*var b = new Platform(0,0,0.5,15);
	game.level.levelBlocs.push(b);
	var b = new Platform(20,0,0.5,15);
	game.level.levelBlocs.push(b);
	//game.level.levelBlocs.push(box2DObjects.createStaticBlocs(9,0,13,0.5));*/

	var b = new Platform(9,13,1,6,"ground");
	game.level.levelBlocs.push(b);

	/*var b = new Platform(8.1,11,0.1,3,"wall");
	game.level.tabWallBlocs.push(b);
	var b = new Platform(9.9,11,0.1,3,"wall");
	game.level.tabWallBlocs.push(b);*/

	//creer le player
	//game.ball = new Ball(2,5,1);
	//creer les boites dynamiques
	var b = new Box(15,2,{w : 1, h : 1},true);
	game.level.tabDynamicBlocs.push(b);


	game.player =  new Player(4,9,{w : 0.5, h : 0.8});
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
    canvas.addEventListener("mousedown", pointerdown,false);
    canvas.addEventListener("mouseup", pointerUp,false);
    

	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);

	addContactListener();
    //game.tabjoint.push(box2DObjects.createJoint(game.level.levelBlocs[4],game.ball.physicalBody));  
}
function gameloop()
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
    requestAnimationFrame(gameloop);
};
