function initGame()
{
    //fonction au clic
    canvas.addEventListener("click", mouseCoord);

    //creation du jeu
    game = new Game();

}

function mouseCoord(event)
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
    //y mettre l'action en jeu
    if(game!=null)
    {
        
    }
}

//fonction pour detecter si on est sur mobile
function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    onMobile = true;
  }
 else {
    onMobile = false;
  }
}
