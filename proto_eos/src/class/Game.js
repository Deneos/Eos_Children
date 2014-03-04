//Objet global game qui gere tout les objets d'une session de jeu.
var Game = function Game()
{
    this.world          =       new b2World(
           new b2Vec2(0, 15)    //gravity
        ,  true                 //allow sleep
    );
    this.ball           =       null;
    this.level          =       null;
    this.end            =       false;
    this.pause          =       false;
    this.player         =       null;
    this.camera         =       null;
    this.windManager    =       null;
    this.effectTab      =       [];
    this.update = function()
    {
        if(this.ball!=null)
        {
            this.ball.update();
        }
        if(this.windManager!=null)
        {    
            this.windManager.update();
        }
        if(this.camera!=null)
        {
            this.camera.update();
        }
        if(this.player!=null)
        {
            this.player.update();
            if(this.player.userData=="hurting")
            {    
                this.player.receiveDamage(1);
                particleEffect(game.player.x,game.player.y);
                if(this.player.userData!="dead")
                    this.player.returnToCheckPoint();
            }
            if(this.player.userData=="dead")
            {    
                this.player.destroy();
            }
        }
        for ( var i = 0 ; i < game.level.tabFallingBlocs.length ; i++)
        {
            if(game.level.tabFallingBlocs[i].moving==true)
            {
                game.level.tabFallingBlocs[i].fall();
            }
        }
        for ( var i = 0 ; i < game.level.tabDynamicBlocs.length ; i++)
        {
            game.level.tabDynamicBlocs[i].update();
            if(game.level.tabDynamicBlocs[i].userData=="hurting")
            {    
                game.level.tabDynamicBlocs[i].destroy();
            }
            if(game.level.tabDynamicBlocs[i].alive==false)
                game.level.tabDynamicBlocs.splice(i,1);
        }
        for ( var i = 0 ; i < game.level.tabEnnemi.length ; i++)
        {
            game.level.tabEnnemi[i].update();
            if(game.level.tabEnnemi[i].userData=="hurting")
            {    
                game.level.tabEnnemi[i].destroy();
            }
            if(game.level.tabEnnemi[i].alive==false)
                game.level.tabEnnemi.splice(i,1);
        }
        for ( var i = 0 ; i < game.level.tabItem.length ; i++)
        {
            if(game.level.tabItem[i].use==true)
            {
                game.level.tabItem[i].destroy();
                game.level.tabItem.splice(i,1);
            }
        }
    }
    this.render = function()
    {
        if(game.level.blocs!=undefined)
        {
            for ( var i = 0 ; i < game.level.blocs.length ; i++)
            {
                game.level.blocs[i].render();
            }
        }
        for ( var i = 0 ; i < game.level.levelBlocs.length ; i++)
        {
            //game.level.levelBlocs[i].render();
        }
        for ( var i = 0 ; i < game.level.tabTraps.length ; i++)
        {
            game.level.tabTraps[i].render();
        }
        for ( var i = 0 ; i < game.level.tabFallingBlocs.length ; i++)
        {
            game.level.tabFallingBlocs[i].render();
        }
        for ( var i = 0 ; i < game.level.tabItem.length ; i++)
        {
            game.level.tabItem[i].animate();
            game.level.tabItem[i].render();
        }
        for ( var i = 0 ; i < game.level.tabEnnemi.length ; i++)
        {
            game.level.tabEnnemi[i].animate();
            game.level.tabEnnemi[i].render();
        }
        if(this.player!=null)
        {
            this.player.animate();
            this.player.draw();
        }
        for ( var i = 0 ; i < game.level.tabDynamicBlocs.length ; i++)
        {
            game.level.tabDynamicBlocs[i].animate();
            game.level.tabDynamicBlocs[i].render();
        }
        for ( var i = 0 ; i < game.level.tabChekpoint.length ; i++)
        {
            game.level.tabChekpoint[i].update();
            game.level.tabChekpoint[i].render();
        }
        for(var i in this.effectTab)
        {
            this.effectTab[i].effect();
            this.effectTab[i].draw();
        }
        if(this.camera!=null)
            this.camera.drawInterface();
        if(this.level.end!=null)
            this.level.end.render();
    }
    return this;
}

