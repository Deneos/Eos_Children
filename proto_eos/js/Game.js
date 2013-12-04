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
        }
    }
    this.render = function()
    {
        if(this.player!=null)
        {
            this.player.draw();
        }
        if(this.camera!=null)
            this.camera.drawInterface();
    }
    return this;
}

