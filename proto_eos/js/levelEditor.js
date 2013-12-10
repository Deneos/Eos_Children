
var ColliderBloc = function(x,y,type,width,height){
	this.x = x;
	this.y = y;
	this.type = type;
	this.width = width;
	this.height = height;
	this.render = function(){
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
	this.render = function(){
		if (this.type  == 1 || this.type ==  2 || this.type == 3 || this.type == 19 || this.type == 20 || this.type == 21){
			context.strokeStyle = "yellow";
		}
		else{
			context.strokeStyle = "blue";
		}
		context.strokeRect(this.x * 16,this.y * 16,16,16);
	}
}









