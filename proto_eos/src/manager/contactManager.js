this.addContactListener = function() {
    //Add listeners for contact
    var listener = new b2Listener;
     
    // Entrée en contact
    listener.BeginContact = function(contact) {
        var obj1 = contact.GetFixtureA();
        var obj2 = contact.GetFixtureB();
        //si on a une collision entre le joueur et le sol
        if (isFootPlayer(obj1) || isFootPlayer(obj2)) {
            if (isGroundOrBox(obj1) || isGroundOrBox(obj2)) {                  
                game.player.jumpContacts ++; // le joueur entre en contact avec une plate-forme de saut
            }
            //marche sur des pics
            if (isSpike(obj1) || isSpike(obj2)) {                  
                game.player.hurt(); 
            }
            //tombe dans un trou
            if (isHole(obj1) || isHole(obj2)) {                  
                game.player.hurt(); 
            }
            //platforme tombante
            if (isFallingBloc(obj1) || isFallingBloc(obj2)) {                  
                if(game.windManager.windDirection=="bas")
                {
                    if(isFallingBloc(obj1))
                    {
                        obj1.moving = true;
                    }
                    if(isFallingBloc(obj2))
                    {
                        obj2.moving = true;
                    }  
                } 
            }
            //checkpoint
            if (isCheckPoint(obj1) || isCheckPoint(obj2)) 
            {   
                if(isCheckPoint(obj1))
                {
                    game.player.checkpoint.x = obj1.checkX;
                    game.player.checkpoint.y = obj1.checkY;
                }
                if(isCheckPoint(obj2))
                {
                    game.player.checkpoint.x = obj2.checkX;
                    game.player.checkpoint.y = obj2.checkY;
                }  
            }
            //fin de niveau
            if (isEnding(obj1) || isEnding(obj2)) {                  
                $("#end").fadeIn();
                game.end = true;
            }
        }

        //objets
        if (isPlayer(obj1) || isPlayer(obj2)) {
            if (isItem(obj1) || isItem(obj2)) {                  
                if(isItem(obj1))
                {    
                    obj1.obtain();
                }
                if(isItem(obj2))
                {    
                    obj2.obtain();
                }
            }
            if(isShield(obj1) || isShield(obj2))
            {
                if(isPlayer(obj1))
                    obj1.hurt();
                if(isPlayer(obj2))
                    obj2.hurt();
            }
        }
        //si on a une collision entre un ennemi et des piques
        if (isEnnemi(obj1) || isEnnemi(obj2)) {
            if (isSpike(obj1) || isSpike(obj2)) {                  
                if(isEnnemi(obj1))
                {    
                    obj1.hurt();
                }
                if(isEnnemi(obj2))
                {    
                    obj2.hurt();
                } 
            }
            if (isBox(obj1) || isBox(obj2)) {                  
                obj1.hurt();
                obj2.hurt();
            }
            if(isPlayer(obj1) || isPlayer(obj2)){
                if(isPlayer(obj1))
                    obj1.hurt();
                if(isPlayer(obj2))
                    obj2.hurt();
            }
        }

        if(isSwitch(obj1) || isSwitch(obj2)){
            if(isFootPlayer(obj1) || isFootPlayer(obj2))
            {
                if(isSwitch(obj1))
                    obj1.active = true;
                else
                    obj2.active = true;
            }
            if(isBox(obj1) || isBox(obj2))
            {
                if(isSwitch(obj1))
                    obj1.active = true;
                else
                    obj2.active = true;
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

        if(isSwitch(obj1) || isSwitch(obj2)){
            if(isFootPlayer(obj1) || isFootPlayer(obj2))
            {
                if(isSwitch(obj1))
                    obj1.active = false;
                else
                    obj2.active = false;
            }
            if(isBox(obj1) || isBox(obj2))
            {
                if(isSwitch(obj1))
                    obj1.active = false;
                else
                    obj2.active = false;
            }

        }
    }
    listener.PostSolve = function(contact, impulse) {
        // PostSolve
        var obj1 = contact.GetFixtureA();
        var obj2 = contact.GetFixtureB();


    }
    listener.PreSolve = function(contact, oldManifold) {
        var obj1 = contact.GetFixtureA();
        var obj2 = contact.GetFixtureB();

        if(isPlayer(obj1) || isPlayer(obj2))
        {
            if(isBox(obj1) || isBox(obj2))
            {
                if(isBox(obj1))
                    obj1.stopMoving();
                if(isBox(obj2))
                    obj2.stopMoving();
            }
            /*if(isEnnemi(obj1) || isEnnemi(obj2))
            {
                if(isEnnemi(obj1) && isEnnemi(obj1).type!="weak")
                    obj1.stopMoving();
                if(isEnnemi(obj2) && isEnnemi(obj1).type!="weak")
                    obj2.stopMoving();
            }*/
        }
        if(isShield(obj1) || isShield(obj2))
        {
            if(isBox(obj1) || isBox(obj2))
            {
                if(isBox(obj1))
                    obj1.stopMoving();
                if(isBox(obj2))
                    obj2.stopMoving();
            }
        }

        
    }
    game.world.SetContactListener(listener);
}
// Déterminer si l'objet physique est le player
function isPlayer(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'player';
    }
}
// Déterminer si l'objet physique est le sol ou une box
function isGroundOrBox(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return (object.GetUserData() == 'box' || object.GetUserData() == 'ground' || object.GetUserData() == 'fallingBloc');
    }
}
// Déterminer si l'objet physique est les pieds du player
function isFootPlayer(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'foot';
    }
}
// Déterminer si l'objet physique est un pic
function isSpike(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'spike';
    }
}
// Déterminer si l'objet physique est un trou
function isHole(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'hole';
    }
}
function isFallingBloc(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'fallingBloc';
    }
}
function isCheckPoint(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'checkpoint';
    }
}
function isEnding(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'victory';
    }
}
function isCollider(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'colliderRight' || object.GetUserData() == 'colliderLeft';
    }
}
function isItem(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'bonus';
    }
}
function isEnnemi(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'ennemi';
    }
}
function isProjectile(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'projectile';
    }
}
function isBox(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'box';
    }
}
function isShield(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'shield';
    }
}
// Déterminer si l'objet physique est un bouton
function isSwitch(object) 
{
    if (object != null && object.GetUserData() != null) 
    {
        return object.GetUserData() == 'button';
    }
}