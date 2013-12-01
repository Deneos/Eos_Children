var Camera = function(viewX,viewY,canvasWidth,canvasHeight,mapSizeX,mapSizeY)
{
    //position de la camera
    this.viewX = viewX || 0;
    this.viewY = viewY || 0;
    // distance entre l'objet suivit et le bord avant le mouvement
    this.deadZoneX = 100;
    this.deadZoneY = 100;
    // dimension de la vue
    this.viewWidth= canvasWidth;
    this.viewHeight = canvasHeight; 
    // taille complete de la map
    this.mapSizeX = mapSizeX;
    this.mapSizeY = mapSizeY;
    //objet suivi par la camera
    this.target = game.player;
    

    //faire un champ de camera ou le mouvement du player ne la fait pas bouger
    //si on est dans le champs, le player bouge
    //si on est pas dans le champs, la camera bouge

    this.update = function()
    {
        //gauche
        if(game.player!=null && game.player.x < this.deadZoneX )
        {
            if(this.viewX>0)
            {    
                wrapper.scrollLeft-=2;;
                this.viewX -=2;;    
                this.viewWidth-=2;;
                this.deadZoneX-=2;;
            }
        }
        //droite
        if(game.player!=null && game.player.x > ((this.viewWidth + this.viewX) - this.deadZoneX))
        {
            if(this.viewWidth<this.mapSizeX)
            {    
                wrapper.scrollLeft+=2;;
                this.viewX+=2;;
                this.viewWidth+=2;;
                this.deadZoneX+=2;;
            }
            
        }
        //haut
        if(game.player!=null && game.player.y < this.deadZoneY)
        {
            if(this.viewY>0)
            {
                this.viewY-=2;;
                this.viewHeight-=2;;
                wrapper.scrollTop-=2;;
                this.deadZoneY-=2;;
            }
        }
        //bas
        if(game.player!=null && game.player.y > ((this.viewHeight + this.viewY) - this.deadZoneY))
        {
            if(this.viewHeight<this.mapSizeY)
            {
                wrapper.scrollTop+=2;;
                this.viewY+=2;;
                this.viewHeight+=2;;
                this.deadZoneY+=2;;
            }
        }
        context.fillStyle = 'red';
        context.fillRect(this.viewX,this.viewY,4,4);
        context.fillRect(this.viewWidth-4,this.viewHeight-4,4,4);
    }
}
