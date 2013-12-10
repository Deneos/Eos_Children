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
        }
        //si on a une collision entre le joueur et des piques
        if (isFootPlayer(obj1) || isFootPlayer(obj2)) {
            if (isSpike(obj1) || isSpike(obj2)) {                  
                game.player.hurt(); 
            }
        }
        //si on tombe dans un trou
        if (isFootPlayer(obj1) || isFootPlayer(obj2)) {
            if (isHole(obj1) || isHole(obj2)) {                  
                game.player.hurt(); 
            }
        }
        //plateforme tombantes
        if (isFootPlayer(obj1) || isFootPlayer(obj2)) {
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
        }
        //partie checkpoint
        if (isFootPlayer(obj1) || isFootPlayer(obj2)) {
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
        }
        if (isFootPlayer(obj1) || isFootPlayer(obj2)) {
            if (isEnding(obj1) || isEnding(obj2)) {                  
                $("#end").fadeIn();
                game.end = true;
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
