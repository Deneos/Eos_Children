// appuyer sur une touche
this.handleKeyDown = function(evt) 
{
    //console.log(evt.keyCode);
    keys[evt.keyCode] = true;
}
// relacher une touche
this.handleKeyUp = function(evt) 
{
    keys[evt.keyCode] = false;
    if(game.player!=null)
        game.player.stopMoving();
    if(game.windManager!=null && game.windManager.menuOpen==true && evt.keyCode==16 || evt.keyCode==17)
    {    
        game.windManager.menuOpen = false;
        game.windManager.windDirection = null;
        game.pause = false;
    }
}
// Gérer les interactions
this.handleInteractions = function() 
{
    // touche "haut"
    if (keys[38] || keys[32]) 
    {
        if(game.windManager!=null && game.windManager.menuOpen==true)
        {
            game.windManager.windDirection = "haut";
            game.windManager.menuOpen = false;
            game.pause = false;
            keys[16] = false;
            keys[17] = false;
            return;
        }
        if(game.player!=null)
            game.player.jump();
    }
    // touches "gauche" et "droite"
    else if (keys[37]) 
    {
        if(game.windManager!=null && game.windManager.menuOpen==true)
        {
            game.windManager.windDirection = "gauche";
            game.windManager.menuOpen = false;
            game.pause = false;
            keys[16] = false;
            keys[17] = false;
            return;
        }
        if(game.player!=null)
            game.player.moveLeft();
    } 
    else if (keys[39]) 
    {
        if(game.windManager!=null && game.windManager.menuOpen==true)
        {
            game.windManager.windDirection = "droite";
            game.windManager.menuOpen = false;
            game.pause = false;
            keys[16] = false;
            keys[17] = false;
            return;
        }
        if(game.player!=null)
            game.player.moveRight();
    }
    else if (keys[40] || keys[83])
    {
        if(game.windManager!=null && game.windManager.menuOpen==true)
        {
            game.windManager.windDirection = "bas";
            game.pause = false;
            game.windManager.menuOpen = false;
            keys[16] = false;
            keys[17] = false;
            return;
        }
    } 
    else if (keys[16] || keys[17]) 
    {
        if(game.windManager!=null)
        {    
            game.windManager.menuOpen = true;
            game.pause = true;
        }
    }   
}
