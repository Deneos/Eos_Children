var Camera = function(viewX,viewY,canvasWidth,canvasHeight,mapSizeX,mapSizeY)
{
    //position de la camera
    this.viewX          =       viewX || 0;
    this.viewY          =       viewY || 0;
    // distance entre l'objet suivit et le bord avant le mouvement
    this.deadZoneX      =       200;
    this.deadZoneY      =       100;
    // dimension de la vue
    this.viewWidth      =       canvasWidth;
    this.viewHeight     =       canvasHeight; 
    // taille complete de la map
    this.mapSizeX       =       mapSizeX;
    this.mapSizeY       =       mapSizeY;
    //objet suivi par la camera
    this.target         =       game.player;
    

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
    this.drawInterface = function()
    {
        if(game.windManager!=null)
        {
            if(game.windManager.menuOpen==true)
            {
                context.beginPath();
                context.arc((this.viewWidth + this.viewX)/2, (this.viewHeight + this.viewY)/2, 80, 0, 2 * Math.PI, false);
                context.fillStyle = 'red';
                context.fill();
                context.strokeStyle = "black";
                context.strokeText("Haut",((this.viewWidth + this.viewX)/2)-40, ((this.viewHeight + this.viewY)/2)-40);
                context.strokeText("Droite",((this.viewWidth + this.viewX)/2)+20, ((this.viewHeight + this.viewY)/2)+10);
                context.strokeText("Bas",((this.viewWidth + this.viewX)/2)-30, ((this.viewHeight + this.viewY)/2)+60);
                context.strokeText("Gauche",((this.viewWidth + this.viewX)/2)-120, ((this.viewHeight + this.viewY)/2)+10);
    
                context.closePath();
            }
            context.strokeStyle = "black";
            context.fillStyle = "red";
            context.strokeRect(this.viewX+20,this.viewY+20,30,game.windManager.windJaugeMax*8);
            context.fillRect(this.viewX+20,(15*8)+this.viewY+20,30,-game.windManager.timeUse*8);
            context.lineWidth = 1;
            context.font = '32px "Verdana"';
            context.strokeText("Vent : "+game.windManager.windDirection,this.viewX+60,this.viewY+120);
        }
        if(game.player!=null)
        {
            var distance = 0;
            for(var i = 0; i < game.player.life; i++)
            {
                context.beginPath();
                context.arc(this.viewX+80+distance,this.viewY+50, 20, 0, 2 * Math.PI, false);
                context.fillStyle = '#66FF99';
                //changement de couleur quand on a presque plus de vie
                if(game.player.life < 2)
                {
                    context.fillStyle = "red";
                }
                context.fill();
                context.closePath();
                distance+=50;
            }
        }
    }
}
