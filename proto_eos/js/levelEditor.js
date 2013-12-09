var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2AABB = Box2D.Collision.b2AABB,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2RayCastInput = Box2D.Collision.b2RayCastInput,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
    b2RevoluteJointDef =  Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2PulleyJointDef =  Box2D.Dynamics.Joints.b2PulleyJointDef,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;	    

window.onload = function(){
	var game = {};
	game.canvas = document.getElementById("canvas");
	game.context = canvas.getContext("2d");
	game.canvas.width = window.innerWidth;
	game.canvas.height = window.innerHeight;
	
	init(game);
}
function init(game){
	game.world = new b2World(new b2Vec2(0, 10), true);
	game.level = getLevel();
	var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(game.context);
    debugDraw.SetDrawScale(30);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    game.world.SetDebugDraw(debugDraw);

    game.level.blocs = [];
    //on recupere le level, sa hauteur et sa largeur
    var levelData = game.level.layers[0].data , 
    	height = game.level.layers[0].height, 
    	width = game.level.layers[0].width;
    //on parcourt le level une premiere fois pour ensuite construire les blocs servant aux colliders
    for (var i = 0; i < levelData.length ; i++){
    	if (levelData[i] != 0){
    		//ceux ci sont des blocs temporaires
    		game.level.blocs.push(new Bloc( i % width, Math.floor(i / width), levelData[i]));
    	}
    }

    //on parcourt les blocks temporaires pour voir si les blocs adjacents sont de même type
    //dans ce cas là il feront parti du même collider
    for (var i = 0; i < game.level.blocs.length ; i++){
    	//tableau servant a savoir le bloc a ete ajoute a un collider
    	var blocksAdded = [];
    	//on verifie que le bloc n'a pas ete ajoute a un collider
    	if (blocksAdded.indexOf(game.level.blocs[i].id) == -1)
    		blocksAdded.push(game.level.blocs[i].id)
    	//taille par defaut d'un collider
    	var width = 16;
    	var height = 16;
        //on compare l'élément de la première boucle avec tous les autres blocs
    	//NB: on est sur que l'on est sur la même ligne, et on regarde les blocs qui sont a droite
        for (var j = i + 1; j < game.level.blocs.length ; j++){
            //si le bloc est de même type alors on ajoute de la largeur
    		if (game.level.blocs[i].type == game.level.blocs[j].type ){
    			width += 16;
                //on ajoute aussi le bloc dans une liste de bloc a ne plus traiter
                //pour ne pas avoir plusieurs blocs qui se chevauchent
    			blocksAdded.push(game.level.blocs[j].id);
    		}
        }
    }

    run(game);
}

function run(game){
	window.requestAnimationFrame(function(){run(game)});
	for ( var i = 0 ; i < game.level.blocs.length ; i++){
		game.level.blocs[i].render(game.context);
	}
}
var ColliderBloc = function(x,y,type,width,height){
	this.x = x;
	this.y = y;
	this.type = type;
	this.width = width;
	this.height = height;
	this.render = function(context){
		context.strokeStyle = "black"
		if (this.type  == 0){
			context.fillStyle = "yellow";
		}
		else{
			context.fillStyle = "blue";
		}
		context.strokeRect(this.x * 16,this.y * 16,this.width,this.height);
		context.fillRect(this.x * 16,this.y * 16,this.width,this.height);
	}
}

var Bloc = function(x,y,nbTile,id){
	this.nbTile= nbTile;
	if (this.nbTile == 1 || this.nbTile == 2 || this.nbTile == 3 || this.nbTile == 19 || this.nbTile == 20 || this.nbTile == 21){
		this.type = 0 //correspond a du sable
	}
	else
		this.type = 1 //correspond a de l'eau

	this.id = id;
	
	this.x = x;
	this.y = y;
	//fonction permettant le debug!
	this.render = function(context){
		if (this.type  == 1 || this.type ==  2 || this.type == 3 || this.type == 19 || this.type == 20 || this.type == 21){
			context.strokeStyle = "yellow";
		}
		else{
			context.strokeStyle = "blue";
		}
		context.strokeRect(this.x * 16,this.y * 16,16,16);
	}
}









