//objet des piques
//blessent le joueurs
var Spike = function(x,y,w,h)
{
    //fixture definition
    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;       //lourd
    fixDef.friction = 0.5;      //lent
    fixDef.restitution = 0;   //rebond
    var bodyDef = new b2BodyDef;
    //create ground
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    fixDef.userData = "spike";
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(w,h);
    var that = game.world.CreateBody(bodyDef).CreateFixture(fixDef);    //on cree un objet en prenant la definition du body et la fixture, pour le fixer au body
    
    that.x = that.GetBody().GetPosition().x*30;
    that.y = that.GetBody().GetPosition().y*30;

    that.render = function()
    {
        context.fillStyle = "red";
        context.fillRect(that.x-w*30,that.y-h*30,w*60,h*60);
    }
    return that;
}
//objet correspondant au collider d'un trou
//qu'on utilise quand on tombe dans un trou, enleve de la vie et remet le player au checkpoint
var Hole = function(x,y,width)
{
    this.x = x;
    this.y = y;
    this.width = width;

    this.fall = function()
    {
        //fonction de distance
        //racine de x1 - x2 au carre + racine de y1 - y2 au carre indique la distance entre deux objets
        var range = Math.sqrt(Math.pow(objetA.x-objetB.x,2) + Math.pow(objetA.y-objetB.y,2));
    }
}
//plaque qui tombe
var FallingBloc = function(x,y,w,h)
{
    //fixture definition
    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;       //lourd
    fixDef.friction = 0.5;      //lent
    fixDef.restitution = 0;   //rebond
    var bodyDef = new b2BodyDef;
    //create ground
    bodyDef.type = b2Body.b2_kinematicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    fixDef.userData = "fallingBloc";
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(w,h);
    var that = game.world.CreateBody(bodyDef).CreateFixture(fixDef);    
    
    that.x = that.GetBody().GetPosition().x*30;
    that.y = that.GetBody().GetPosition().y*30;
    that.moving = false;

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