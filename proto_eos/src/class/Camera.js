var Camera = function Camera(viewX,viewY,canvasWidth,canvasHeight,mapSizeX,mapSizeY)
{
    //position de la camera
    this.viewX          =       viewX || 0;
    this.viewY          =       viewY || 0;
    // distance entre l'objet suivit et le bord avant le mouvement
    this.deadZoneX      =       300;
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
    this.imgLifeFull                            =           config.images[2];
    this.imgLifeHalf                            =           config.images[1];
    this.imgLifeEmpty                           =           config.images[0];
    this.lifef                  =       0;
    this.lifecurrentFrameX      =       0;
    this.lifecurrentFrameY      =       0;
    this.lifeframeWidth         =       32;
    this.lifenb_of_frame        =       6;
    this.scrollSpeed            =       3;

    this.update = function()
    {
        //gauche
        if(game.player!=null && game.player.x < this.deadZoneX )
        {
            if(this.viewX>0)
            {    
                wrapper.scrollLeft-=this.scrollSpeed;
                //context.translate(-this.scrollSpeed,0);
                this.viewX -=this.scrollSpeed;    
                this.viewWidth-=this.scrollSpeed;
                this.deadZoneX-=this.scrollSpeed;
            }
        }
        //droite
        if(game.player!=null && game.player.x > ((this.viewWidth + this.viewX) - this.deadZoneX))
        {
            if(this.viewWidth<this.mapSizeX)
            {    
                //context.translate(this.scrollSpeed,0);
                wrapper.scrollLeft+=this.scrollSpeed;
                this.viewX+=this.scrollSpeed;
                this.viewWidth+=this.scrollSpeed;
                this.deadZoneX+=this.scrollSpeed;
            }
            
        }
        //haut
        if(game.player!=null && game.player.y < this.deadZoneY)
        {
            if(this.viewY>0)
            {
                //context.translate(0,-this.scrollSpeed);
                wrapper.scrollTop-=this.scrollSpeed;
                this.viewY-=this.scrollSpeed;
                this.viewHeight-=this.scrollSpeed;
                this.deadZoneY-=this.scrollSpeed;
            }
        }
        //bas
        if(game.player!=null && game.player.y > ((this.viewHeight + this.viewY) - this.deadZoneY))
        {
            if(this.viewHeight<this.mapSizeY)
            {
                //context.translate(0,this.scrollSpeed);
                wrapper.scrollTop+=this.scrollSpeed;
                this.viewY+=this.scrollSpeed;
                this.viewHeight+=this.scrollSpeed;
                this.deadZoneY+=this.scrollSpeed;
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
           /* if(game.windManager.menuOpen==true)
            {*/
                context.globalAlpha = game.windManager.opacity;
                if(game.windManager.windDirection === "bas")
                    context.drawImage(game.windManager.imgSouth,0,0,192,192,(this.viewWidth + this.viewX - 192)/2,(this.viewHeight + this.viewY - 192)/2,192,192);
                if(game.windManager.windDirection === "haut")
                    context.drawImage(game.windManager.imgNorth,0,0,192,192,(this.viewWidth + this.viewX - 192)/2,(this.viewHeight + this.viewY - 192)/2,192,192);
                if(game.windManager.windDirection === "droite")
                    context.drawImage(game.windManager.imgEast,0,0,192,192,(this.viewWidth + this.viewX - 192)/2,(this.viewHeight + this.viewY - 192)/2,192,192);
                if(game.windManager.windDirection === "gauche")
                    context.drawImage(game.windManager.imgWest,0,0,192,192,(this.viewWidth + this.viewX - 192)/2,(this.viewHeight + this.viewY - 192)/2,192,192);
                if(game.windManager.windDirection === null)
                    context.drawImage(game.windManager.img,0,0,192,192,(this.viewWidth + this.viewX - 192)/2,(this.viewHeight + this.viewY - 192)/2,192,192);
                context.globalAlpha = 1;
            //}
            //dessin de la jauge de vent
            context.drawImage(game.windManager.imgJauge,0,0,48,240,this.viewX+10,this.viewY-10+game.windManager.timeUse*16,48,240-game.windManager.timeUse*16);
            context.drawImage(game.windManager.imgStroke,0,0,48,240,this.viewX+10,this.viewY,48,240);

            /*context.lineWidth = 1;
            context.font = '32px "Verdana"';
            context.strokeText("Vent : "+game.windManager.windDirection,this.viewX+60,this.viewY+120);*/
            if(game.windManager.windDirection === "droite")
                context.drawImage(game.windManager.selectRight,0,0,16,16,this.viewX+60,this.viewY+120,16,16);
            if(game.windManager.windDirection === "haut")
                context.drawImage(game.windManager.selectUp,0,0,16,16,this.viewX+60,this.viewY+120,16,16);
            if(game.windManager.windDirection === "bas")
                context.drawImage(game.windManager.selectDown,0,0,16,16,this.viewX+60,this.viewY+120,16,16);
            if(game.windManager.windDirection === "gauche")
                context.drawImage(game.windManager.selectLeft,0,0,16,16,this.viewX+60,this.viewY+120,16,16);

        }
        //dessin des points de vies
        if(game.player!=null)
        {
            var distance = 0;
            for(var i = 0; i < game.player.life.length; i++)
            {
                if(game.player.life[i]==2)
                    context.drawImage(this.imgLifeFull,this.lifecurrentFrameX,this.lifecurrentFrameY,32,32,this.viewX+80+distance-16,this.viewY+50-16,32,32);
                if(game.player.life[i]==1)
                    context.drawImage(this.imgLifeHalf,this.lifecurrentFrameX,this.lifecurrentFrameY,32,32,this.viewX+80+distance-16,this.viewY+50-16,32,32);
                if(game.player.life[i]==0)
                    context.drawImage(this.imgLifeEmpty,this.lifecurrentFrameX,this.lifecurrentFrameY,32,32,this.viewX+80+distance-16,this.viewY+50-16,32,32);
                distance+=50;
            }
            this.lifef++;
            if(this.lifef%12==0)
            {
                this.lifecurrentFrameX+=this.lifeframeWidth;
                if(this.lifecurrentFrameX>=(this.lifenb_of_frame*this.lifeframeWidth))
                {
                    this.lifecurrentFrameX = 0;
                }
            }
        }
    }
}
