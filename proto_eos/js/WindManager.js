var WindManager = function(player)
{
	this.player                                     =           player;
	this.timeUse                                    =           15;
	this.menuOpen                                   =           false;
	this.windJaugeMax                               =           15;
	this.windDirection                              =           null;
	this.frame                                      =           0;

	//angle du raycast, change avec le vent
	this.currentRayAngle                            =           0;
    this.input                                      =           new b2RayCastInput();
    this.output                                     =           new b2RayCastOutput();
    this.closestFraction                            =           1;
    this.intersectionNormal                         =           new b2Vec2(0,0);
    this.intersectionPoint                          =           new b2Vec2();
    this.rayLength                                  =           0; //long enough to hit the walls
    //debut et fin du ray
    this.p1                                         =           new b2Vec2( game.player.x/30, game.player.y/30 ); //center of scene
    this.p2                                         =           new b2Vec2();
    this.normalEnd                                  =           new b2Vec2();

    this.ray = function()  
    {
    	this.p1 = new b2Vec2( game.player.x/30, game.player.y/30 ); //center of scene
        /*//in Step() function
        var k = 360/20;
        var t = k/60;
        var DEGTORAD = Math.PI/180;
        this.currentRayAngle += t * DEGTORAD; //one revolution every 20 seconds
        //console.log(currentRayAngle*(180/Math.PI));*/

        //calculate points of ray
        this.p2.x = this.p1.x + this.rayLength * Math.sin(this.currentRayAngle);
        this.p2.y = this.p1.y + this.rayLength * Math.cos(this.currentRayAngle);

        this.input.p1 = this.p1;
        this.input.p2 = this.p2;
        this.input.maxFraction = 1;
        this.closestFraction = 1;

        //boucle sur tout les body et fixture du world
        var b = new b2BodyDef();
        var f = new b2FixtureDef();
        for(b = game.world.GetBodyList(); b; b = b.GetNext())    
        {           
            for(f = b.GetFixtureList(); f; f = f.GetNext()) 
            {
                if(!f.RayCast(this.output, this.input))
                    continue;
                else if(this.output.fraction < this.closestFraction)  
                {
                    this.closestFraction = this.output.fraction;
                                this.intersectionNormal = this.output.normal;
                }
            }

        }
        this.intersectionPoint.x = this.p1.x + this.closestFraction * (this.p2.x - this.p1.x);
        this.intersectionPoint.y = this.p1.y + this.closestFraction * (this.p2.y - this.p1.y);

        this.normalEnd.x = this.intersectionPoint.x + this.intersectionNormal.x;
        this.normalEnd.y = this.intersectionPoint.y + this.intersectionNormal.y;

        context.strokeStyle = "#66FF99";


        //affichage du raycast
        context.beginPath(); // Start the path
        context.moveTo(this.p1.x*30,this.p1.y*30); // Set the path origin
        context.lineTo(this.intersectionPoint.x*30, this.intersectionPoint.y*30); // Set the path destination
        context.closePath(); // Close the path
        context.stroke();

        context.beginPath(); // Start the path
        context.moveTo(this.intersectionPoint.x*30, this.intersectionPoint.y*30); // Set the path origin
        context.lineTo(this.normalEnd.x*30, this.normalEnd.y*30); // Set the path destination
        context.closePath(); // Close the path
        context.stroke(); // Outline the path
    }
	this.update = function()
	{
		this.frame++;
		this.windAction();
		if(this.windDirection!=null)
		{
			if(this.timeUse>0 && this.menuOpen==false && this.frame%10==0)
			{
				this.timeUse--;
			}
			if(this.timeUse==0)
			{
				this.windDirection = null;
			}
		}
		else
		{
			if(this.timeUse<this.windJaugeMax && this.frame%10==0)
			{
				this.timeUse++;
			}
		}
	}
	this.windAction = function()
	{
		switch(this.windDirection)
		{
			case "haut" :
				game.player.windForceY = -5;
				this.currentRayAngle = 3.143;
				this.rayLength = 25;
				break;
			case "bas" :
				game.player.windForceY = 10;
				this.currentRayAngle = 0;
				this.rayLength = 25;
				break;
			case "gauche" :
				game.player.windForceX = -50;
				this.currentRayAngle = 4.7;
				this.rayLength = 25;
				break;
			case "droite" :
				game.player.windForceX = 50;
				this.currentRayAngle = 1.55;
				this.rayLength = 25;
				break;
			default :
				if(game.player!=null)
				{
					game.player.windForceX = 0;
					game.player.windForceY = 0;
					this.rayLength = 0;
					this.currentRayAngle = 0;
				}
				break;
		}
	}
	this.draw = function()
	{

	}
}
