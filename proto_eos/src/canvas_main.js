//init
var canvas, context;
var canvasBuffer, contextBuffer;
var canvasWidth = 2000, canvasHeight = 2000;
var bodyA;
var revolute_joint;
var keys = []; 
var listener;
var wrapper;
var wrapperWidth = 1024, wrapperHeight = 576;  
var imageLoadedNb = 0 , readyToPlay = false;


window.onload = function()
{
	//declarer le canvas
	canvas                     =       document.getElementById("canvas");
	context                    =       canvas.getContext('2d');
	canvas.width               =       canvasWidth;
	canvas.height              =       canvasHeight;
	//buffer
	canvasBuffer               =       document.createElement("canvas");
	contextBuffer              =       canvasBuffer.getContext('2d');
	canvasBuffer.width         =       canvasWidth;
	canvasBuffer.height        =       canvasHeight;
	wrapper                    =       document.getElementById("wrapper");
	wrapper.width              =       wrapperWidth;
	wrapper.height             =       wrapperHeight; 
    wrapper.scrollLeft = 0;
    wrapper.scrollTop = 0;
}
 

function init(id) 
{   
	$("#menu").fadeOut();
	$("#replay").fadeOut();
    imageLoader();
	//instancier le game
	game                   =           new Game();
	//initialiser le level
	
    if(id==0)
    {   
        game.level             =           new Level(0,2000,2000);
        game.level.sample();
    }
    if(id==1)
    {    
        canvasWidth = 2500;
        canvasHeight = 1024; 
        canvas.width               =       canvasWidth;
        canvas.height              =       canvasHeight;
        game.level             =           new Level(0,2500,1024);
        game.level.sample2();
    }
    if(id==2)
    {    
        canvasWidth = 2500;
        canvasHeight = 1024; 
        canvas.width               =       canvasWidth;
        canvas.height              =       canvasHeight;
        game.level                 =           new Level(0,2500,1024);
    }
    //instanciation des classes du jeu
	game.player            =           new Player(6,18,{w : 1, h : 1.5},10,0,0);
    
    game.windManager       =           new WindManager(game.player);
	game.camera            =           new Camera(0,0,document.getElementById("wrapper").width,document.getElementById("wrapper").height,canvasWidth,canvasHeight);
	//setup debug draw
 	var debugDraw          =           new b2DebugDraw();
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

function imageLoader()
{
    //$("#loading").fadeIn();
    for(var i = 0; i < config.images.length; i++)
    {
        var img = new Image();
        img.src = config.images[i];
        config.images[i] = img;
        img.onload = function()
        {
            imageLoadedNb++;
            if(imageLoadedNb === config.images.length)
            {
                //$("#loading").fadeOut();
                readyToPlay = true;
            }
        }
    }
}