//objet des piques
//blessent le joueurs
var Spike = function(x,y,w,h)
{
    //fixture definition
    var fixDef                      =           new b2FixtureDef;
    fixDef.density                  =           1.0;       //lourd
    fixDef.friction                 =           0.5;      //lent
    fixDef.restitution              =           0;   //rebond
    var bodyDef                     =           new b2BodyDef;
    //create ground
    bodyDef.type                    =           b2Body.b2_staticBody;
    bodyDef.position.x              =           x;
    bodyDef.position.y              =           y;
    fixDef.userData                 =           "spike";
    fixDef.shape                    =           new b2PolygonShape;
    fixDef.shape.SetAsBox(w,h);
    var that                        =           game.world.CreateBody(bodyDef).CreateFixture(fixDef);    //on cree un objet en prenant la definition du body et la fixture, pour le fixer au body
    
    that.x                          =           that.GetBody().GetPosition().x*30;
    that.y                          =           that.GetBody().GetPosition().y*30;

    that.render = function()
    {
        context.fillStyle = "red";
        context.fillRect(that.x-w*30,that.y-h*30,w*60,h*60);
    }
    return that;
}
//objet correspondant au collider d'un trou
//qu'on utilise quand on tombe dans un trou, enleve de la vie et remet le player au checkpoint
var Hole = function(x,y,w,h)
{
    //fixture definition
    var fixDef                      =           new b2FixtureDef;
    fixDef.density                  =           1.0;       //lourd
    fixDef.friction                 =           0.5;      //lent
    fixDef.restitution              =           0;   //rebond
    var bodyDef                     =           new b2BodyDef;
    //create ground
    bodyDef.type                    =           b2Body.b2_staticBody;
    bodyDef.position.x              =           x;
    bodyDef.position.y              =           y;
    fixDef.userData                 =           "hole";
    fixDef.shape                    =           new b2PolygonShape;
    fixDef.shape.SetAsBox(w,h);
    fixDef.isSensor                 =           true;
    var that                        =           game.world.CreateBody(bodyDef).CreateFixture(fixDef);    //on cree un objet en prenant la definition du body et la fixture, pour le fixer au body
    
    that.checkX                     =           x;
    that.checkY                     =           y-1;
    that.x                          =           that.GetBody().GetPosition().x*30;
    that.y                          =           that.GetBody().GetPosition().y*30;

    that.render = function()
    {
        context.fillStyle = "rgba(255,0,0,0.5)";
        context.fillRect(that.x-w*30,that.y-h*30,w*60,h*60);
    }
    return that;
}
//plaque qui tombe
var FallingBloc = function(x,y,w,h)
{
    //fixture definition
    var fixDef                      =           new b2FixtureDef;
    fixDef.density                  =           1.0;       //lourd
    fixDef.friction                 =           0.5;      //lent
    fixDef.restitution              =           0;   //rebond
    var bodyDef                     =           new b2BodyDef;
    //create ground
    bodyDef.type                    =           b2Body.b2_kinematicBody;
    bodyDef.position.x              =           x;
    bodyDef.position.y              =           y;
    fixDef.userData                 =           "fallingBloc";
    fixDef.shape                    =           new b2PolygonShape;
    fixDef.shape.SetAsBox(w,h);
    var that                        =           game.world.CreateBody(bodyDef).CreateFixture(fixDef);    
    
    that.x                          =           that.GetBody().GetPosition().x*30;
    that.y                          =           that.GetBody().GetPosition().y*30;
    that.moving                     =           false;

    that.render = function()
    {
        context.fillStyle = "green";
        context.fillRect(that.x-w*30,that.y-h*30,w*60,h*60);
    }

    that.fall = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
        var vel = that.GetBody().GetLinearVelocity();
        vel.y = 200/ 30;
    }

    return that;
}