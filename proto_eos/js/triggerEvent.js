var Checkpoint = function(x,y,w,h)
{
    //fixture definition
    var fixDef                          =           new b2FixtureDef;
    fixDef.density                      =           1.0;       //lourd
    fixDef.friction                     =           0.5;      //lent
    fixDef.restitution                  =           0;   //rebond
    var bodyDef                         =           new b2BodyDef;
    //create ground
    bodyDef.type                        =           b2Body.b2_staticBody;
    bodyDef.position.x                  =           x;
    bodyDef.position.y                  =           y;
    fixDef.userData                     =           "checkpoint";
    fixDef.shape                        =           new b2PolygonShape;
    fixDef.shape.SetAsBox(w,h);
    fixDef.isSensor                     =           true;
    var that                            =           game.world.CreateBody(bodyDef).CreateFixture(fixDef);    //on cree un objet en prenant la definition du body et la fixture, pour le fixer au body
    
    that.checkX                         =           x;
    that.checkY                         =           y-1;
    that.x                              =           that.GetBody().GetPosition().x*30;
    that.y                              =           that.GetBody().GetPosition().y*30;

    that.render = function()
    {
        context.fillStyle = "rgba(255,255,153,0.5)";
        context.fillRect(that.x-w*30,that.y-h*30,w*60,h*60);
    }
    return that;
}

var EndPoint = function(x,y,w,h)
{
    //fixture definition
    var fixDef                          =           new b2FixtureDef;
    fixDef.density                      =           1.0;       //lourd
    fixDef.friction                     =           0.5;      //lent
    fixDef.restitution                  =           0;   //rebond
    var bodyDef                         =           new b2BodyDef;
    //create ground
    bodyDef.type                        =           b2Body.b2_staticBody;
    bodyDef.position.x                  =           x;
    bodyDef.position.y                  =           y;
    fixDef.userData                     =           "victory";
    fixDef.shape                        =           new b2PolygonShape;
    fixDef.shape.SetAsBox(w,h);
    fixDef.isSensor                     =           true;
    var that                            =           game.world.CreateBody(bodyDef).CreateFixture(fixDef);    //on cree un objet en prenant la definition du body et la fixture, pour le fixer au body
    
    that.x                              =           that.GetBody().GetPosition().x*30;
    that.y                              =           that.GetBody().GetPosition().y*30;

    that.render = function()
    {
        context.fillStyle = "#00CCFF";
        context.fillRect(that.x-w*30,that.y-h*30,w*60,h*60);
    }
    return that;
}