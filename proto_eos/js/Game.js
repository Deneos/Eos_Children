//Objet global game qui gere tout les objets d'une session de jeu.
var Game = function()
{
    this.world = new b2World(
           new b2Vec2(0, 10)    //gravity
        ,  true                 //allow sleep
    );
    this.ball = null;
    this.level = null;
    this.end = false;
    this.pause = false;
    this.tabjoint = [];
    this.player ;
    this.windManager = new WindManager();
    this.update = function()
    {
        if(this.ball!=null)
        {
            this.ball.update();
        }
        if(this.windManager!=null)
            this.windManager.update();
    }
    this.render = function()
    {
        if(this.ball!=null)
        {
            this.ball.draw();
        }
        if(this.windManager!=null)
            this.windManager.draw();
    }
}

