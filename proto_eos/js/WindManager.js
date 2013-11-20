var WindManager = function()
{
	this.timeUse = 15;
	this.menuOpen = false;
	this.windJaugeMax = 15;
	this.windDirection = null;
	this.frame = 0;

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
				game.player.windForceY = -20;
				break;
			case "bas" :
				game.player.windForceY = 10;
				break;
			case "gauche" :
				game.player.windForceX = -50;
				break;
			case "droite" :
				game.player.windForceX = 50;
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
	this.draw = function()
	{
		if(this.menuOpen==true)
		{
			context.beginPath();
	        context.arc(canvasWidth/2, canvasHeight/2, 50, 0, 2 * Math.PI, false);
	        context.fillStyle = 'red';
	        context.fill();
	        context.closePath();
		}
		context.strokeStyle = "black";
		context.fillStyle = "red";
		context.strokeRect(20,20,30,this.windJaugeMax*8);
		context.fillRect(20,(15*8)+20,30,-this.timeUse*8);
		context.lineWidth = 1;
		context.font = '32px "Verdana"';
		context.strokeText("Vent : "+this.windDirection,60,50);
	}
}
