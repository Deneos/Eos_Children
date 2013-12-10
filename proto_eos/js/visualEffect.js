var TextEffect = function(x,y,value)
{
    this.x = x;
    this.y = y;
    this.value = value;
    this.speed = 1;
    this.alive = true;
    this.clicOpacity = 1;
    this.effect = function()
    {

        this.clicOpacity-=0.009;
        this.y -= this.speed;
        if(this.clicOpacity<=0)
        {
            this.alive = false;
        }
    }
    this.draw = function()
    {
        if(this.alive==true)
        {
            context.beginPath();
            context.font = '36px "3dsregular"';
            context.lineWidth = 2;
            context.strokeStyle = "#43618F";
            context.fillStyle = "white";
            context.fillText(this.value, this.x, this.y);
            context.strokeText(this.value, this.x, this.y);
            context.closePath();
        }
    }
}

function particleEffect(x,y)
{
    for(var j = 0; j < 20; j++)
    {
        var d = new Particles(x,y);
        game.effectTab.push(d);
    }
    setTimeout(function(){
        for(var j = 0; j < 20; j++)
        {
            var d = new Particles(x,y);
            game.effectTab.push(d);
        }
    },100);
    setTimeout(function(){
        for(var j = 0; j < 20; j++)
        {
            var d = new Particles(x,y);
            game.effectTab.push(d);
        }
    },200);
}
var Particles = function(x,y)
{
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.speed = 4;
    this.angle = Math.random() * Math.PI * 2;
    this.alive = true;
    this.opacity = 1;
    this.color = "rgba(255,0,0,"+this.opacity+")";//"#" + Math.random().toString(16).slice(2, 8);
    this.effect = function()
    {
        this.opacity-=0.02;
        this.x += Math.cos(this.angle) * this.speed;
        this.y -= Math.sin(this.angle) * this.speed;
        if(this.opacity<=0)
        {
            this.alive = false;
        }
    }
    this.draw = function()
    {
        context.beginPath();
        this.color = "rgba(255,0,0,"+this.opacity+")";
        context.fillStyle = this.color;

        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fill();
        
        context.closePath();
    }
}

