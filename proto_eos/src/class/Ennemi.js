var Ennemi = function Ennemi(x,y,dim,type)
{
    //creation de l'objet box2D
    var bodyDef                             =           new b2BodyDef;
    var fixDef                              =           new b2FixtureDef;
    fixDef.density                          =           dim.density || 2.0;       //lourd
    fixDef.friction                         =           dim.friction || 0;      //lent
    fixDef.restitution                      =           dim.restitution || 0.00001;   //rebond
    //create some objects
    bodyDef.type                            =           b2Body.b2_dynamicBody;
    fixDef.shape                            =           new b2PolygonShape;
    fixDef.shape.SetAsBox(dim.w,dim.h);
    bodyDef.position.x                      =           x;
    bodyDef.position.y                      =           y;
    fixDef.userData                         =           'ennemi';
    var that                                =           game.world.CreateBody(bodyDef).CreateFixture(fixDef);
    that.GetBody().SetSleepingAllowed(false);   // l'objet player n'est pas autorisé à passer au repos
    that.GetBody().SetFixedRotation(true);      // empécher le player de "rouler"
    that.type                               =           type;

    if(that.type==="l-shield")
    {
        that.shield                            =           new b2FixtureDef();
        that.shield.friction                   =           2;
        that.shield.shape                      =           new b2PolygonShape();
        that.shield.userData                   =           "shield";
        that.shield.shape.SetAsOrientedBox(10 / 30, 30 / 30,
                new b2Vec2(-1, 0),   // position par rapport centre du body
                0                                           // angle d'orientation
        );
        that.GetBody().CreateFixture(that.shield);
    }
    if(that.type==="r-shield")
    {
        that.shield                            =           new b2FixtureDef();
        that.shield.friction                   =           2;
        that.shield.shape                      =           new b2PolygonShape();
        that.shield.userData                   =           "shield";
        that.shield.shape.SetAsOrientedBox(10 / 30, 30 / 30,
                new b2Vec2(1, 0),   // position par rapport centre du body
                0                                           // angle d'orientation
        );
        that.GetBody().CreateFixture(that.shield);
    }
    if(that.type==="column")
    {
        that.hat                            =           new b2FixtureDef();
        that.hat.friction                   =           2;
        that.hat.shape                      =           new b2PolygonShape();
        that.hat.userData                   =           "ground";
        that.hat.shape.SetAsOrientedBox(40 / 30, 10 / 30,
                new b2Vec2(0, -1.5),   // position par rapport centre du body
                0                                           // angle d'orientation
        );
        that.GetBody().CreateFixture(that.hat);
    }

    //attributs de forces
    that.speed                              =           150;
    that.life                               =           3;
    that.alive                              =           true;
    //attributs de positions
    that.x                                  =           that.GetBody().GetPosition().x*30;
    that.y                                  =           that.GetBody().GetPosition().y*30;

    that.vel                                =           that.GetBody().GetLinearVelocity();

    that.update = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
        switch(that.type)
        {
            case "column" :
                break;
            case "guardian" :
                break;
            case "shield" :
                break;
            case "arms" :
                break;
        }
    }
    that.moveLeft = function()
    {
        //colision avec le bord de l'ecran
        if(that.x > 30)
        {
            that.vel.x = (-that.speed + that.windForceX)/ 30;
        }
    }
    that.moveRight = function()
    {
        //colision
        if(that.x < game.level.width)
        {
            that.vel.x = (that.speed + that.windForceX)/ 30;
        }
    }
    that.stopMoving =function()
    {
        that.vel.x = 0;
    }
    that.destroy = function()
    {
        game.world.DestroyBody(that.GetBody());
        that.alive = false;
    }
    that.render = function()
    {
        context.fillStyle = "red";
        context.fillRect(that.x-dim.w*30,that.y-dim.h*30,dim.w*60,dim.h*60);
    }
    that.calculDistance = function(target)
    {
        var range = Math.sqrt(Math.pow(that.x-target.x,2) + Math.pow(that.y-target.y,2));
        return range;
    }
    that.receiveDamage = function(points)
    {
        that.life -= points;
        if(that.life <= 0)
        {
            that.life = 0;
            that.userData = "dead";
        } 
    }
    
    that.hurt = function()
    {
        that.userData = "hurting";
    }

    return that;
}

var FlyingEnnemi = function FlyingEnnemi(x,y,dim,type)
{
    //creation de l'objet box2D
    var bodyDef                             =           new b2BodyDef;
    var fixDef                              =           new b2FixtureDef;
    fixDef.density                          =           2.0;       //lourd
    fixDef.friction                         =           0;      //lent
    fixDef.restitution                      =           0;   //rebond
    //create some objects
    bodyDef.type                            =           b2Body.b2_kinematicBody;
    fixDef.shape                            =           new b2PolygonShape;
    fixDef.shape.SetAsBox(dim.w,dim.h);
    bodyDef.position.x                      =           x;
    bodyDef.position.y                      =           y;
    fixDef.userData                         =           'ennemi';
    var that                                =           game.world.CreateBody(bodyDef).CreateFixture(fixDef);
    that.GetBody().SetSleepingAllowed(false);   // l'objet player n'est pas autorisé à passer au repos
    that.GetBody().SetFixedRotation(true);      // empécher le player de "rouler"
    that.type                               =           type;

    //attributs de forces
    that.speed                              =           150;
    that.life                               =           3;
    that.alive                              =           true;
    //attributs de positions
    that.x                                  =           that.GetBody().GetPosition().x*30;
    that.y                                  =           that.GetBody().GetPosition().y*30;
    that.time                               =           that.x;
    that.dir                                =           "left";

    that.vel                                =           that.GetBody().GetLinearVelocity();

    that.update = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;

        switch(that.type)
        {
            case "weak" :
                that.time++;
                if(that.dir=="left")
                    that.moveLeft();
                if(that.dir=="right")
                    that.moveRight();

                if(that.time%100===0 && that.dir==="left")
                {    
                    that.dir = "right";
                    that.time = 0;
                    return;
                }
                if(that.time%100===0 && that.dir==="right")
                {    
                    that.dir = "left";
                    that.time = 0;
                    return;
                }
                break;
            case "strong" :
                break;
        }
    }
    that.moveLeft = function()
    {
        //colision avec le bord de l'ecran
        if(that.x > 30)
        {
            that.vel.x = (-that.speed )/ 30;
        }
    }
    that.moveRight = function()
    {
        //colision
        if(that.x < game.level.width)
        {
            that.vel.x = (that.speed )/ 30;
        }
    }
    that.stopMoving =function()
    {
        that.iddle = true;
        that.vel.x = 0;
    }
    that.destroy = function()
    {
        game.world.DestroyBody(that.GetBody());
        that.alive = false;
    }
    that.render = function()
    {
        context.fillStyle = "red";
        context.fillRect(that.x-dim.w*30,that.y-dim.h*30,dim.w*60,dim.h*60);
    }
    that.calculDistance = function(target)
    {
        var range = Math.sqrt(Math.pow(that.x-target.x,2) + Math.pow(that.y-target.y,2));
        return range;
    }
    that.receiveDamage = function(points)
    {
        that.life -= points;
        if(that.life <= 0)
        {
            that.life = 0;
            that.userData = "dead";
        } 
    }
    
    that.hurt = function()
    {
        that.userData = "hurting";
    }

    return that;
}