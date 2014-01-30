/*************************************************************
            --------    Exemple of params   --------
{   x : 100,
    y : 200,
    spritesheet     : '../asset/character.png',
    nb_of_frame     : 4,
    currentFrameX   : 0,
    currentFrameY   : 2,
    frameWidth      : 24,
    frameHeight     : 32,
    width           : 24,
    height          : 32
}
*************************************************************/
function addRenderCapabilities (context,object,params)
{
    object.f                    =       0;
    object.spritesheet          =       new Image();
    object.spritesheet.src      =       params.spritesheet;
    object.nb_of_frame          =       params.nb_of_frame || 0;
    object.currentFrameX        =       params.currentFrameX || 0;
    object.currentFrameY        =       params.currentFrameY || 0;
    object.frameWidth           =       params.frameWidth;
    object.frameHeight          =       params.frameHeight;
    object.width                =       params.width || params.frameWidth;
    object.height               =       params.height || params.frameHeight;
    
    object.render = function ()
    {
        context.drawImage(this.spritesheet,this.currentFrameX,this.currentFrameY,this.frameWidth,this.frameHeight,this.x-(this.width/2),this.y-(this.height/2),this.width,this.height);
        /*context.fillRect(this.x,this.y,2,2);
        context.fillRect(this.colliderLeft.x,this.colliderLeft.y,2,2);
        context.fillRect(this.colliderRight.x,this.colliderRight.y,2,2);
        context.fillRect(this.colliderBottom.x,this.colliderBottom.y,2,2);
        context.fillRect(this.colliderTop.x,this.colliderTop.y,2,2);*/
    }
    object.animate = function ()
    {
        //the f is time frame, to fluidify the animation
        this.f++;
        if(this.f%6==0)
        {
            this.currentFrameX+=this.frameWidth;
            if(this.currentFrameX>=(this.nb_of_frame*this.frameWidth))
            {
                this.currentFrameX = 0;
            }
        }
    }
}
    