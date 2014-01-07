var LifeUp = function(x,y,r,density,friction,restitution)
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

    that.obtain = function()
    {
        game.player.life+=1;
        this.use = true;
    }
    that.render = function()
    {
        context.beginPath();
        context.fillStyle = "#99FF66";
        context.arc(that.x*30, that.y*30, that.r*60, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    }
    that.destroy = function()
    {
        game.world.DestroyBody(that.GetBody());
        this.use = true;
    }
    return that;
}