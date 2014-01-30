var LifeUp = function LifeUp(x,y,r,density,friction,restitution)
{
    var bodyDef             =       new b2BodyDef;
    var fixDef              =       new b2FixtureDef;
    fixDef.density          =       density || 1.0;       //lourd
    fixDef.friction         =       friction || 0.5;      //lent
    fixDef.restitution      =       restitution || 0.2;   //rebond
    //create some objects
    bodyDef.type            =       b2Body.b2_kinematicBody;
    fixDef.shape            =       new b2CircleShape(r);
    bodyDef.position.x      =       x;
    bodyDef.position.y      =       y;
    fixDef.userData         =       'bonus';
    fixDef.isSensor         =       true;

    var that                =       game.world.CreateBody(bodyDef).CreateFixture(fixDef);
    
    that.x                  =       that.GetBody().GetPosition().x*30;
    that.y                  =       that.GetBody().GetPosition().y*30;
    that.use                =       false;
    that.img                =       config.images[15];
    that.f                  =       0;
    that.currentFrameX      =       0;
    that.currentFrameY      =       0;
    that.frameWidth         =       32;
    that.nb_of_frame        =       6;

    that.obtain = function()
    {
        if(game.player.life[game.player.life.length-1]<2)
        {
            game.player.life[game.player.currentPoint] += 1;
            if(game.player.life[game.player.currentPoint] > 2)
            {
                game.player.life[game.player.currentPoint] = 2;
                game.player.currentPoint++;
                game.player.life[game.player.currentPoint] += 1;
            }
        }
        this.use = true;
    }
    that.render = function()
    {
        if(that.use===false)
            context.drawImage(that.img,that.currentFrameX,that.currentFrameY,that.frameWidth,32,that.x-16,that.y-16,32,32);
    }
    that.animate = function ()
    {
        //the f is time frame, to fluidify the animation
        this.f++;
        if(this.f%6==0)
        {
            this.currentFrameX+=this.frameWidth;
            if(this.currentFrameX>=(this.nb_of_frame*this.frameWidth))
            {
                this.currentFrameX = 0;
            }
        }
    }
    that.destroy = function()
    {
        game.world.DestroyBody(that.GetBody());
        this.use = true;
    }
    return that;
}