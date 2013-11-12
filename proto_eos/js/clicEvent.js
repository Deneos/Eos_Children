function pointerdown(event)
{
	//pour ne pas prendre en compte la taille de la page
	var totalOffsetX = 0;
    var totalOffsetY = 0;
    //la position dans le canvas
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;
    var e = event || window.event;
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    //enregistrer la position du clic
    canvasX = e.pageX - totalOffsetX;
    canvasY = e.pageY - totalOffsetY;

    //collision avec la sphere
    if(game.ball!=null && canvasX<=(game.ball.x + 30) && canvasX>=(game.ball.x - 30) && canvasY<=(game.ball.y + 30) && canvasY>=(game.ball.y -30))
	{
		canvas.addEventListener("mousemove", pointerMove, true);
		//application de la force 
		var forceX = 5080;
		var forceY = -20;
		game.ball.GetBody().ApplyImpulse(new b2Vec2(forceX,forceY),game.ball.GetBody().GetWorldCenter());
	}
}
function pointerUp(event)
{
	canvas.removeEventListener("mousemove", pointerMove, true);
}
//If mouse is moving over the thing
function pointerMove(e)
{
	//pour ne pas prendre en compte la taille de la page
	var totalOffsetX = 0;
    var totalOffsetY = 0;
    //la position dans le canvas
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;
    var e = event || window.event;
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    //enregistrer la position du clic
    canvasX = e.pageX - totalOffsetX;
    canvasY = e.pageY - totalOffsetY;

    //game.mouseJoint = box2DObjects.createMouseJoint(canvasX,canvasY);
}