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
    if(game.player!=null)
    {
        // touche "haut"
        if (keys[38] || keys[32] || keys[122] || keys[90] || keys[87]) 
        {
            if(game.windManager!=null && game.windManager.menuOpen==true)
            {
                game.windManager.windDirection = "haut";
                game.windManager.menuOpen = false;
                game.pause = false;
                keys[16] = false;
                keys[17] = false;
                keys[38] = false;
                keys[32] = false;
                keys[122] = false;
                keys[90] = false;
                keys[87] = false;
                game.player.nb_of_frame = 22;
                game.player.currentFrameX = 0;
                game.player.currentFrameY = 768;
                game.player.currentAnim = "spell";
                game.player.animSpeed = 3;
                return;
            }
            else
                game.player.jump();
        }
        // touches "gauche" et "droite"
        if (keys[37] || keys[113] || keys[97] || keys[81] || keys[65]) 
        {
            if(game.windManager!=null && game.windManager.menuOpen==true)
            {
                game.windManager.windDirection = "gauche";
                game.windManager.menuOpen = false;
                game.pause = false;
                keys[16] = false;
                keys[17] = false;
                keys[37] = false;
                keys[113] = false;
                keys[97] = false;
                keys[81] = false;
                keys[65] = false;
                game.player.nb_of_frame = 22;
                game.player.currentFrameX = 0;
                game.player.currentFrameY = 768;
                game.player.currentAnim = "spell";
                game.player.dir = "left";
                game.player.animSpeed = 3;
                return;
            }
            game.player.moveLeft();
        } 
        if (keys[39] || keys[100] || keys[68]) 
        {
            if(game.windManager!=null && game.windManager.menuOpen==true)
            {
                game.windManager.windDirection = "droite";
                game.windManager.menuOpen = false;
                game.pause = false;
                keys[16] = false;
                keys[17] = false;
                keys[39] = false;
                keys[100] = false;
                keys[68] = false;
                game.player.nb_of_frame = 22;
                game.player.currentFrameX = 0;
                game.player.currentFrameY = 768;
                game.player.currentAnim = "spell";
                game.player.dir = "right";
                game.player.animSpeed = 3;
                return;
            }
            game.player.moveRight();
        }
        if (keys[40] || keys[83] || keys[115])
        {
            if(game.windManager!=null && game.windManager.menuOpen==true)
            {
                game.windManager.windDirection = "bas";
                game.pause = false;
                game.windManager.menuOpen = false;
                keys[16] = false;
                keys[17] = false;
                game.player.nb_of_frame = 22;
                game.player.currentFrameX = 0;
                game.player.currentFrameY = 768;
                game.player.currentAnim = "spell";
                game.player.animSpeed = 3;
                return;
            }
        } 
        if (keys[16] || keys[17]) 
        {
            if(game.windManager!=null)
            {    
                game.windManager.menuOpen = true;
                game.windManager.opacity = 1;
                game.pause = true;
            }
        }   
    }
}
