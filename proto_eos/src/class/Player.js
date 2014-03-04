var Player = function Player(x,y,dim,density,friction,restitution)
{
    //creation de l'objet box2D
    var bodyDef                             =           new b2BodyDef;
    var fixDef                              =           new b2FixtureDef;
    fixDef.density                          =           density || 2.0;       //lourd
    fixDef.friction                         =           friction || 0;      //lent
    fixDef.restitution                      =           restitution || 0.00000000000000001;   //rebond
    //create some objects
    bodyDef.type                            =           b2Body.b2_dynamicBody;
    fixDef.shape                            =           new b2PolygonShape;
    fixDef.shape.SetAsBox(dim.w,dim.h);
    bodyDef.position.x                      =           x;
    bodyDef.position.y                      =           y;
    fixDef.userData                         =           'player';
    var that                                =           game.world.CreateBody(bodyDef).CreateFixture(fixDef);
    that.GetBody().SetSleepingAllowed(false);   // l'objet player n'est pas autorisé à passer au repos
    that.GetBody().SetFixedRotation(true);      // empécher le player de "rouler"
    that.jumpContacts                       =           0;
    // Ajouter des "pieds"
    that.footDef                            =           new b2FixtureDef();
    that.footDef.friction                   =           2;
    that.footDef.userData                   =           'foot';
    that.footDef.shape                      =           new b2PolygonShape();
    that.footDef.shape.SetAsOrientedBox(29 / 30, 3 / 30,
            new b2Vec2(0, dim.w / 1.8 / 0.37),   // position par rapport centre du body
            0                                           // angle d'orientation
    );
    that.footDef.isSensor                   =           true;
    that.GetBody().CreateFixture(that.footDef);
    //attributs de forces
    that.windForceX                         =           0;
    that.windForceY                         =           0;
    that.speed                              =           150;
    that.life                               =           [2,2,2];
    that.currentPoint                       =           that.life.length-1;
    //attributs de positions
    that.x                                  =           that.GetBody().GetPosition().x*30;
    that.y                                  =           that.GetBody().GetPosition().y*30;
    that.checkpoint                         =           { x : x, y : y};

    //attributs de dessin
    that.img                =       config.images[21];
    that.f                  =       0;
    that.currentFrameX      =       0;
    that.currentFrameY      =       576;
    that.frameWidth         =       96;
    that.frameHeight        =       96;
    that.nb_of_frame        =       6;
    that.vel                                =           that.GetBody().GetLinearVelocity();
    that.currentAnim        =       "iddle";
    that.dir                =       "right";
    that.animSpeed          =       6;
    that.countParticles     =       0;

    that.update = function()
    {
        if(that.countParticles%15==0 && that.iddle==false)
        {
            var f = new FootParticles(that.x,that.y+(that.frameHeight/4));
            game.effectTab.push(f);
        }
        that.x = that.GetBody().GetPosition().x*30;
        that.y = that.GetBody().GetPosition().y*30;
        that.countParticles++;
    }
    that.moveLeft = function()
    {
        //colision avec le bord de l'ecran
        that.iddle = false;
        if(that.x > 30)
        {
            that.vel.x = (-that.speed + that.windForceX)/ 30;
        }
        if(that.currentAnim != "death")
        {
            that.dir = "left";
            that.nb_of_frame = 26;
            that.currentFrameY = 0;
            that.currentAnim = "move";
            that.animSpeed = 3;
        }
    }
    that.moveRight = function()
    {
        //colision
        that.iddle = false;
        if(that.x < game.level.width)
        {
            that.vel.x = (that.speed + that.windForceX)/ 30;
        }
        if(that.currentAnim != "death")
        {
            that.dir = "right";
            that.nb_of_frame = 26;
            that.currentFrameY = 0;
            that.currentAnim = "move";
            that.animSpeed = 3;
        }
        
    }
    that.jump = function()
    {
        that.iddle = false;
        if(that.jumpContacts > 0)//==true)
        {
            that.GetBody().ApplyImpulse(
                new b2Vec2(0, -210 + that.windForceY),                         // vecteur
                that.GetBody().GetWorldCenter()
            );    // point d'application de l'impulsion
        }
        if(that.currentAnim != "death")
        {
            that.nb_of_frame = 26;
            that.currentFrameY = 192;
            that.currentAnim = "jump";
            that.animSpeed = 6;
        }
    }
    that.stopMoving =function()
    {
        that.iddle = true;
        that.vel.x = 0;
        if(that.currentAnim != "death" && that.currentAnim != "spell")
        {
            that.nb_of_frame = 6;
            that.currentFrameY = 576;
            that.currentFrameX = 0;
            that.currentAnim = "iddle";
            that.animSpeed = 6;
        }
    }
    that.destroy = function()
    {
        $('#replay').fadeIn();
        game.world.DestroyBody(that.GetBody());
        //game.player = null;
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
        if(that.dir=="right")
            context.drawImage(that.img,that.currentFrameX,that.currentFrameY,that.frameWidth,that.frameHeight,that.x-(that.frameWidth/2),that.y-(that.frameHeight/2),that.frameWidth,that.frameHeight);
        if(that.dir=="left")
        {
            context.save();
            context.translate(that.x+(that.frameWidth/2),that.y-(that.frameHeight/2));
            context.scale(-1,1);
            context.drawImage(that.img,that.currentFrameX,that.currentFrameY,that.frameWidth,that.frameHeight,0,0,that.frameWidth,that.frameHeight);
            context.restore();
        }
    }
    that.animate = function()
    {
        that.f++;
        if(that.f%that.animSpeed==0)
        {
            that.currentFrameX+=that.frameWidth;
            if(that.currentFrameX>=(that.nb_of_frame*that.frameWidth) && that.currentAnim!="death")
            {
                if(that.currentAnim=="spell")
                {
                    that.nb_of_frame = 6;
                    that.currentFrameX = 0;
                    that.currentFrameY = 576;
                    that.currentAnim = "iddle";
                    that.animSpeed = 6;
                }
                else
                    that.currentFrameX = 0;

            }
        } 
    }
    that.calculDistance = function(target)
    {
        var range = Math.sqrt(Math.pow(that.x-target.x,2) + Math.pow(that.y-target.y,2));
        return range;
    }
    that.receiveDamage = function(points)
    {
        //that.life -= points;
        that.life[that.currentPoint] -= points;
        if(that.life[that.currentPoint]===0)
        {
            that.currentPoint--;
        }
        if(that.life[0] <= 0)
        {
            that.life[0] = 0;
            that.userData = "dead";
            that.nb_of_frame = 20;
            that.currentAnim = "death";
            that.currentFrameY = 384;
            that.currentFrameX = 0;
            that.animSpeed = 6;
            
        } 
    }
    
    that.hurt = function()
    {
        that.userData = "hurting";
    }

    return that;
}
