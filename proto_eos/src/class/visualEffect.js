var TextEffect = function TextEffect(x,y,value)
{
    this.x              =       x;
    this.y              =       y;
    this.value          =       value;
    this.speed          =       1;
    this.alive          =       true;
    this.clicOpacity    =       1;
}
TextEffect.prototype.effect = function()
{

    this.clicOpacity-=0.009;
    this.y -= this.speed;
    if(this.clicOpacity<=0)
    {
        this.alive = false;
    }
}
TextEffect.prototype.draw = function()
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
var Particles = function Particles(x,y)
{
    this.x          =       x;
    this.y          =       y;
    this.radius     =       3;
    this.speed      =       4;
    this.angle      =       Math.random() * Math.PI * 2;
    this.alive      =       true;
    this.opacity    =       1;
    this.color      =       "rgba(255,0,0,"+this.opacity+")";//"#" + Math.random().toString(16).slice(2, 8);
    
}

Particles.prototype.effect = function()
{
    this.opacity-=0.02;
    this.x += Math.cos(this.angle) * this.speed;
    this.y -= Math.sin(this.angle) * this.speed;
    if(this.opacity<=0)
    {
        this.alive = false;
    }
}
Particles.prototype.draw = function()
{
    context.beginPath();
    this.color = "rgba(255,0,0,"+this.opacity+")";
    context.fillStyle = this.color;

    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    
    context.closePath();
}

var FootParticles = function FootParticles(x,y)
{
    this.x          =       x;
    this.y          =       y;
    this.alive      =       true;
    this.img                =       config.images[22];
    this.f                  =       0;
    this.currentFrameX      =       0;
    this.currentFrameY      =       0;
    this.frameWidth         =       48;
    this.frameHeight        =       48;
    this.nb_of_frame        =       60;    
}

FootParticles.prototype.effect = function()
{
    this.f++;
    if(this.f%3==0)
    {
        this.currentFrameX+=this.frameWidth;
        if(this.currentFrameX>=(this.nb_of_frame*this.frameWidth))
        {
            this.alive = false;

        }
    } 
}
FootParticles.prototype.draw = function()
{
    context.drawImage(this.img,this.currentFrameX,this.currentFrameY,this.frameWidth,this.frameHeight,this.x-(this.frameWidth/2),this.y-(this.frameHeight/2),this.frameWidth,this.frameHeight);
}
