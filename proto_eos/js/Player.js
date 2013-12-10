var Player = function(x,y,dim,density,friction,restitution)
{
    //creation de l'objet box2D
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
            new b2Vec2(0, dim.w / 1.8 / 0.39),   // position par rapport centre du body
            0                                           // angle d'orientation
    );
    that.footDef.isSensor = true;
    that.GetBody().CreateFixture(that.footDef);
    //attributs de forces
    that.windForceX = 0;
    that.windForceY = 0;
    that.speed = 100;
    that.life = 3;
    //attributs de positions
    that.x = that.GetBody().GetPosition().x*30;
    that.y = that.GetBody().GetPosition().y*30;
    that.checkpoint = { x : x, y : y};

    //attributs de dessin
    that.img = new Image();
    that.img.src = "asset/chara.png";
    that.currentFrameX = 0;
    that.currentFrameY = 0;
    that.frameWidth = 32;
    that.frameHeight = 48;
    that.nb_of_frame = 4;
    that.iddle = true;
    that.f = 0;
    that.update = function()
    {
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
    }
    that.moveLeft = function()
    {
        //colision avec le bord de l'ecran
        that.currentFrameY = 96;
        that.iddle = false;
        if(that.x > 30)
        {
            var vel = that.GetBody().GetLinearVelocity();
            vel.x = (-that.speed + that.windForceX)/ 30;
        }
    }
    that.moveRight = function()
    {
        //colision
        that.currentFrameY = 0;
        that.iddle = false;
        if(that.x < game.level.width)
        {
            var vel = that.GetBody().GetLinearVelocity();
            vel.x = (that.speed + that.windForceX)/ 30;
        }
    }
    that.jump = function()
    {
        that.iddle = false;
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
        that.iddle = true;
        var vel = that.GetBody().GetLinearVelocity();
        vel.x = 0;
    }
    that.destroy = function()
    {
        $('#replay').fadeIn();
        game.world.DestroyBody(that.GetBody());
        game.player = null;
    }
    that.returnToCheckPoint = function(x,y)
    {
        //renvoi le player a une position definie lors de l'appel de la fonction, sinon le renvoi au dernier checkpoint 
        if(x!=undefined)
        {
            that.GetBody().SetPosition(new b2Vec2(x,y));

        }
        else
        {
            that.GetBody().SetPosition(new b2Vec2(that.checkpoint.x,that.checkpoint.y));
        }
        that.userData = "player";
        
    }
    that.draw = function()
    {
        //the f is time frame, to fluidify the animation
        if(that.iddle==false)
        {
            that.f++;
            if(that.f%6==0)
            {
                that.currentFrameX+=that.frameWidth;
                if(that.currentFrameX>=(that.nb_of_frame*that.frameWidth))
                {
                    that.currentFrameX = 0;
                }
            }
        }
        else
        {
            that.currentFrameX = 0;
        }
        context.drawImage(that.img,that.currentFrameX,that.currentFrameY,that.frameWidth,that.frameHeight,that.x-15,that.y-20,that.frameWidth,that.frameHeight);
    }
    that.calculDistance = function(target)
    {
        var range = Math.sqrt(Math.pow(that.x-target.x,2) + Math.pow(that.y-target.y,2));
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