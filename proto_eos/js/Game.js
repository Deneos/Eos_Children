//Objet global game qui gere tout les objets d'une session de jeu.
var Game = function()
{
    this.world = new b2World(
           new b2Vec2(0, 10)    //gravity
        ,  true                 //allow sleep
    );
    this.ball = null;
    //this.level = null;
    this.end = false;
    this.pause = false;
    this.player = null;
    this.camera = null;
    this.windManager = null;
    this.update = function()
    {
        if(this.ball!=null)
        {
            this.ball.update();
        }
        if(this.windManager!=null)
        {    
            this.windManager.update();
            if(this.windManager.windDirection!=null)
                this.windManager.ray();
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
                this.player.returnToCheckPoint();
                this.player.receiveDamage(1);
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
            game.level.levelBlocs[i].render();
        }
        for ( var i = 0 ; i < game.level.tabTraps.length ; i++)
        {
            game.level.tabTraps[i].render();
        }
        for ( var i = 0 ; i < game.level.tabFallingBlocs.length ; i++)
        {
            game.level.tabFallingBlocs[i].render();
        }

        if(this.player!=null)
        {
            this.player.draw();
        }
        if(this.camera!=null)
            this.camera.drawInterface();
    }
    return this;
}

