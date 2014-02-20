var WindManager = function WindManager(player)
{
	this.player                                     =           player;
	this.timeUse                                    =           0;
	this.menuOpen                                   =           false;
	this.windJaugeMax                               =           15;
	this.windDirection                              =           null;
	this.frame                                      =           0;

    this.img                                        =           config.images[3];
    this.imgEast                                    =           config.images[4];
    this.imgNorth                                   =           config.images[5];
    this.imgSouth                                   =           config.images[6];
    this.imgWest                                    =           config.images[7];
    this.opacity                                    =           0;

    this.selectRight                                =           config.images[8];
    this.selectUp                                   =           config.images[9];
    this.selectDown                                 =           config.images[10];
    this.selectLeft                                 =           config.images[11];

    this.imgStroke                                  =           config.images[14];
    this.imgJauge                                   =           config.images[13];
    this.imgGlass                                   =           config.images[12];

	
	this.update = function()
	{
		this.frame++;
		this.windAction();
        /*if(this.menuOpen===true && this.opacity!=1)
        {
            this.fadeIn();
        }*/
        if(this.menuOpen===false && this.opacity > 0)
        {
            this.fadeOut();
        }
		if(this.windDirection!=null)
		{
			if(this.timeUse<15 && this.menuOpen==false && this.frame%10==0)
			{
				this.timeUse++;
			}
			if(this.timeUse==15)
			{
				this.windDirection = null;
			}
		}
		else
		{
			if(this.timeUse>0 && this.frame%10==0)
			{
				this.timeUse--;
			}
		}

	}
	this.windAction = function()
	{
		switch(this.windDirection)
		{
			case "haut" :
				game.player.windForceY = -50;

                for(var i = 0; i < game.level.tabDynamicBlocs.length; i++)
                {
                    var distance = game.player.calculDistance(game.level.tabDynamicBlocs[i]);
                    if(distance < 500 && game.level.tabDynamicBlocs[i].density<=10)
                    {
                        //var vel = game.level.tabDynamicBlocs[i].GetBody().GetLinearVelocity();
                        game.level.tabDynamicBlocs[i].vel.y = -150 / 30;
                    }
                }
				break;
			case "bas" :
				game.player.windForceY = 180;

				break;
			case "gauche" :
				game.player.windForceX = -100;


                for(var i = 0; i < game.level.tabDynamicBlocs.length; i++)
                {
                    var distance = game.player.calculDistance(game.level.tabDynamicBlocs[i]);
                    if(distance < 500)
                    {
                        //var vel = game.level.tabDynamicBlocs[i].GetBody().GetLinearVelocity();
                        game.level.tabDynamicBlocs[i].vel.x = -150 / 30;
                    }
                }
                for(var i = 0; i < game.level.tabEnnemi.length; i++)
                {
                    if(game.level.tabEnnemi[i].type==="column")
                    {
                        var distance = game.player.calculDistance(game.level.tabEnnemi[i]);
                        if(distance < 500)
                        {
                            game.level.tabEnnemi[i].vel.x = -50 / 30;
                        }
                    }
                }
				break;
			case "droite" :
				game.player.windForceX = 100;

                for(var i = 0; i < game.level.tabDynamicBlocs.length; i++)
                {
                    var distance = game.player.calculDistance(game.level.tabDynamicBlocs[i]);
                    if(distance < 500)
                    {
                        //var vel = game.level.tabDynamicBlocs[i].GetBody().GetLinearVelocity();
                        game.level.tabDynamicBlocs[i].vel.x = 150 / 30;
                    }
                }
                for(var i = 0; i < game.level.tabEnnemi.length; i++)
                {
                    if(game.level.tabEnnemi[i].type==="column")
                    {
                        var distance = game.player.calculDistance(game.level.tabEnnemi[i]);
                        if(distance < 500)
                        {
                            game.level.tabEnnemi[i].vel.x = 50 / 30;
                        }
                    }
                }
				break;
			default :
				if(game.player!=null)
				{
					game.player.windForceX = 0;
					game.player.windForceY = 0;
				}
				break;
		}
	}
	this.fadeIn = function()
	{
        if(this.frame%10===0 && this.opacity < 1)
        {    
            this.opacity+=0.1;
        }
	}
    this.fadeOut = function()
    {
        if(this.frame%10===0 && this.opacity > 0)
        {    
            this.opacity-=0.2;
        }
        if(this.opacity<0)
            this.opacity = 0;
    }
}
