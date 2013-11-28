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
    fixDef.userData = 'player';

    var that = game.world.CreateBody(bodyDef).CreateFixture(fixDef);
    that.GetBody().SetSleepingAllowed(false);   // l'objet player n'est pas autorisé à passer au repos
    that.GetBody().SetFixedRotation(true);      // empécher le player de "rouler"
    that.jumpContacts = 0;

    // Ajouter des "pieds"
    that.footDef = new b2FixtureDef();
    that.footDef.friction = 2;
    that.footDef.userData = 'foot';
    that.footDef.shape = new b2PolygonShape();
    that.footDef.shape.SetAsOrientedBox(13 / 30, 3 / 30,
            new b2Vec2(0, dim.w / 1.8 / 0.35),   // position par rapport centre du body
            0                                           // angle d'orientation
    );
    that.GetBody().CreateFixture(that.footDef);

    that.windForceX = 0;
    that.windForceY = 0;
    that.speed = 100;

    that.update = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
    }
    that.moveLeft = function()
    {
        var vel = that.GetBody().GetLinearVelocity();
        vel.x = (-that.speed + that.windForceX)/ 30;
        //context.translate(1,0);
 
    }
    that.moveRight = function()
    {
        var vel = that.GetBody().GetLinearVelocity();
        vel.x = (that.speed + that.windForceX)/ 30;
        //context.translate(-1,0);
    }
    that.jump = function()
    {
        if(that.jumpContacts > 0)//==true)
        {
            that.GetBody().ApplyImpulse(
                new b2Vec2(0, -12 + that.windForceY),                         // vecteur
                that.GetBody().GetWorldCenter()
            );    // point d'application de l'impulsion
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

this.addContactListener = function() {
    //Add listeners for contact
    var listener = new b2Listener;
     
    // Entrée en contact
    listener.BeginContact = function(contact) {
        var obj1 = contact.GetFixtureA();
        var obj2 = contact.GetFixtureB();
        if (isFootPlayer(obj1) || isFootPlayer(obj2)) {
            if (isGroundOrBox(obj1) || isGroundOrBox(obj2)) {                  
                game.player.jumpContacts ++; // le joueur entre en contact avec une plate-forme de saut
            }
        }
    }
     
    // Fin de contact
    listener.EndContact = function(contact) {
        var obj1 = contact.GetFixtureA();
        var obj2 = contact.GetFixtureB();
        if (isFootPlayer(obj1) || isFootPlayer(obj2)) {
            if (isGroundOrBox(obj1) || isGroundOrBox(obj2)) {
                game.player.jumpContacts --; // le joueur quitte une plate-forme de saut
            }
        }
    }
    game.world.SetContactListener(listener);
}
// Déterminer si l'objet physique est le player
function isPlayer(object) {
    if (object != null && object.GetUserData() != null) {
        return object.GetUserData() == 'player';
    }
}
// Déterminer si l'objet physique est le sol ou une box
function isGroundOrBox(object) {
    if (object != null && object.GetUserData() != null) {
        return (object.GetUserData() == 'box' || object.GetUserData() == 'ground');
    }
}
// Déterminer si l'objet physique est les pieds du player
function isFootPlayer(object) {
    if (object != null && object.GetUserData() != null) {
        return object.GetUserData() == 'foot';
    }
}
