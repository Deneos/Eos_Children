var Player = function(x,y,dim,density,friction,restitution)
{
    var bodyDef = new b2BodyDef;
    var fixDef = new b2FixtureDef;
    fixDef.density = density || 2.0;       //lourd
    fixDef.friction = friction || 0;      //lent
    fixDef.restitution = restitution || 0.2;   //rebond
    //create some objects
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(dim.w,dim.h);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    bodyDef.userData = 'player';
    var that = game.world.CreateBody(bodyDef).CreateFixture(fixDef);
    that.GetBody().SetSleepingAllowed(false);   // l'objet player n'est pas autorisé à passer au repos
    that.GetBody().SetFixedRotation(true);      // empécher le player de "rouler"
    that.jumpContacts = false;

    that.listener = new Box2D.Dynamics.b2ContactListener;
    that.listener.BeginContact = function(contact) 
    {
        //console.log(contact.GetFixtureA().GetBody().GetUserData());
        that.jumpContacts = true;
    }
    that.listener.EndContact = function(contact) 
    {
        //console.log(contact.GetFixtureA().GetBody().GetUserData());
        that.jumpContacts = false;
    }
    game.world.SetContactListener(that.listener);

    that.update = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
    }
    that.moveLeft = function()
    {
        var vel = that.GetBody().GetLinearVelocity();
        vel.x = -100 / 30;
    }
    that.moveRight = function()
    {
        var vel = that.GetBody().GetLinearVelocity();
        vel.x = 100 / 30;
    }
    that.jump = function()
    {
        if(that.jumpContacts==true)
        {
            that.GetBody().ApplyImpulse(
                new b2Vec2(0, -20),                         // vecteur
                that.GetBody().GetWorldCenter()
            );    // point d'application de l'impulsion
            that.jumpContacts = false;
        }
    }
    that.stopMoving =function()
    {
        var vel = that.GetBody().GetLinearVelocity();
        vel.x = 0;
    }
    that.destroy = function()
    {
        game.player = null;
        game.world.DestroyBody(that.GetBody());
    }

    return that;
}
