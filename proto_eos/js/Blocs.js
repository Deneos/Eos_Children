//player actuel
var Ball = function(x,y,r,density,friction,restitution)
{
    var bodyDef = new b2BodyDef;
    var fixDef = new b2FixtureDef;
    fixDef.density = density || 1.0;       //lourd
    fixDef.friction = friction || 0.5;      //lent
    fixDef.restitution = restitution || 0.2;   //rebond
    //create some objects
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2CircleShape(r);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    fixDef.userData = 'sphere';
    var that = game.world.CreateBody(bodyDef).CreateFixture(fixDef);
    
    that.x = that.GetBody().GetPosition().x*30;
    that.y = that.GetBody().GetPosition().y*30;
    that.img = new Image();
    that.img.src = "asset/melofee.png";
    that.update = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
    }
    that.draw = function()
    {
        var radius = that.GetShape().m_radius*30;
        context.save();
        context.translate(that.x,that.y);
        context.rotate(that.GetBody().GetAngle());
        //le radius negatif permet de recentrer l'image 
        context.drawImage(that.img,-radius,-radius,radius*2,radius*2);
        context.restore();
    }
    that.destroy = function()
    {
        game.ball = null;
        game.world.DestroyBody(that.GetBody());
    }
    return that;
}
var Platform = function(x,y,w,h,tag, density,friction,restitution)
{
    //fixture definition
    var fixDef = new b2FixtureDef;
    fixDef.density = density || 1.0;       //lourd
    fixDef.friction = friction || 0.5;      //lent
    fixDef.restitution = restitution || 0;   //rebond
    var bodyDef = new b2BodyDef;
    //create ground
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    fixDef.userData = tag;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(w,h);
    var that = game.world.CreateBody(bodyDef).CreateFixture(fixDef);    //on cree un objet en prenant la definition du body et la fixture, pour le fixer au body
    
    that.update = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
    }
    return that;
}
var Box = function(x,y,dim,density,friction,restitution)
{
    var bodyDef = new b2BodyDef;
    var fixDef = new b2FixtureDef;
    fixDef.density = density || 1.0;       //lourd
    fixDef.friction = friction || 0.5;      //lent
    fixDef.restitution = restitution || 0.2;   //rebond
    //create some objects
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(dim.w,dim.h);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    fixDef.userData = 'box';
    var that = game.world.CreateBody(bodyDef).CreateFixture(fixDef);
    
    that.update = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
    }
    return that;
}
var Joint = function(bodyA,bodyB)
{
    revolute_joint = new b2RevoluteJointDef();
    revolute_joint.bodyA = bodyA.GetBody();
    revolute_joint.bodyB = bodyB.GetBody();
    revolute_joint.localAnchorB.Set(0,-5);
    var that = game.world.CreateJoint(revolute_joint);
    return that;
}
