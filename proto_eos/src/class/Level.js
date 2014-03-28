//Objet qui contient tout les blocs
var Level = function Level(id,width,height)
{
    this.id                     =       id;
    this.width                  =       width;
	this.height                 =       height;
    this.file                   =       null;
    this.levelBlocs             =       [];
    this.tabTraps               =       [];
    this.tabDynamicBlocs        =       [];
    this.tabFallingBlocs        =       [];
    this.tabChekpoint           =       [];
    this.tabjoint               =       [];
    this.tabItem                =       [];
    this.tabEnnemi              =       [];
    this.end                    =       null;

    this.caseTable              =       [];
    this.mapCase                =       [];
    this.nb_of_case             =       0;
    this.readyToDraw            =       false;

    this.backgroundImg          =       config.images[33];
    this.backgroundWidth        =       7000;
    this.backgroundHeight       =       3500;
    this.blocsTable = [];
    this.finalBlocs = [];

    this.init = function()
    {
        var id = 0;
        this.file = GetLevel(); 
        this.mapCase = [];      
        var height = this.file.layers[0].height, 
            width = this.file.layers[0].width,
            sizeCase = this.file.tileheight;
        var tileCouche1, tileCouche2, tileCouche3, layerObject;

        for(var i = 0; i < this.file.layers.length; i++)
        {
            if(this.file.layers[i].name === "couche1")
                tileCouche1 = this.file.layers[i].data;
            if(this.file.layers[i].name === "couche2")
                tileCouche2 = this.file.layers[i].data;
            if(this.file.layers[i].name === "couche3")
                tileCouche3 = this.file.layers[i].data;
            if(this.file.layers[i].name === "object")
                layerObject = this.file.layers[i].data;

        }
        this.sizeX = width * this.file.tileheight;
        this.sizeY = height * this.file.tileheight;

        canvasBuffer.width  =  this.sizeX;
        canvasBuffer.height  = this.sizeY;
        this.width = this.sizeX;
        this.height = this.sizeY;
        game.camera  =  new Camera(0,0,document.getElementById("wrapper").width,document.getElementById("wrapper").height,this.sizeX,this.sizeY);


        for (var i = 0; i < tileCouche1.length ; i++)
        {

            this.caseTable.push(new Case(id, i % width, Math.floor(i / width), sizeCase, tileCouche1[i], tileCouche2[i],tileCouche3[i]));
            id++;

            switch(layerObject[i])
            {
                // spawn
                case 1:
                    game.player = new Player(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1.5},10,0,0);
                    break;
                // collider
                case 2:
                    var p = new Platform(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,1.6,1.6,"ground");
                    //var p = {x: ((i % width)*3.2)+1.6, y : (Math.floor(i / width)*3.2)+1.6, w : 1.6, h : 1.6, tag : "ground", check : false};

                    this.levelBlocs.push(p);
                    break;
                // checkpoint
                case 3:
                    var c = new Checkpoint(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,2,2);
                    this.tabChekpoint.push(c);
                    break;
                // end point
                case 4:
                    this.end = new EndPoint(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.4,1,0.2);
                    break;
                //potion
                case 5:
                    var o = new LifeUp(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,1);
                    this.tabItem.push(o);
                    break;
                //collectible
                case 6:
                    
                    break;
                 //box
                case 7:
                    var b = new Box(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1.6, h : 1.6},50);
                    this.tabDynamicBlocs.push(b);
                    break;
                //falling bloc
                case 8:
                    var f = new FallingBloc(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.2,1.6,1);
                    this.tabFallingBlocs.push(f);
                    break;
                //switch
                case 9:
                    var b = new SwitchButton(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.7);
                    this.tabChekpoint.push(b);
                    break;
                //spike
                case 10:
                    var s = new Spike(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.4,1.6,0.8,"ground");
                    this.tabTraps.push(s);
                    break;
                //hole
                case 11:
                    var h = new Hole(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.8,1.6,0.2);
                    this.tabFallingBlocs.push(h);
                    break;
                //ennemi bouclier
                case 13:
                    var e = new Ennemi(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1.5},"l-shield");
                    this.tabEnnemi.push(e);
                    break;
                //ennemi volant
                case 14:
                    var e = new FlyingEnnemi(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1},"weak");
                    this.tabEnnemi.push(e);
                    break;
                //ennemi colone
                case 15:
                    var e = new Ennemi(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1.5},"column");
                    this.tabEnnemi.push(e);
                    break;
                //projectile
                case 18:
                    var b = new Box(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 0.5, h : 0.5},5);
                    this.tabDynamicBlocs.push(b);
                    break;
            }   
        }
        /*console.log(this.levelBlocs);
        var size = 1;
        var tmpColliders = [];
        for(var nb = 0; nb < this.levelBlocs.length; nb++)
        {
            for(var i = 1; i < this.levelBlocs.length; i++)
            {
                if(this.levelBlocs[nb].y === this.levelBlocs[i].y 
                    && (this.levelBlocs[i].x + this.levelBlocs[i].w) === this.levelBlocs[nb].x
                    && this.levelBlocs[i].check === false)
                {
                    size ++;
                    this.levelBlocs[i].check = true;
                    tmpColliders.push({ x : this.levelBlocs[nb].x, y : this.levelBlocs[nb].y, w : this.levelBlocs[nb].width, h : this.levelBlocs[nb].height});

                }
                else
                {
                    //var p = new Platform(this.levelBlocs[nb].x, this.levelBlocs[nb].y,this.levelBlocs[nb].width*size,this.levelBlocs[nb].height,this.levelBlocs[nb].tag);
                    //this.finalBlocs.push(p);
                    //tmpColliders.push({ x : this.levelBlocs[nb].x, y : this.levelBlocs[nb].y, w : this.levelBlocs[nb].width*size, h : this.levelBlocs[nb].height});
                    size = 1;
                }
            }
        }
        console.log(tmpColliders);*/
        
        this.mapCase = this.caseTable;
    }
    this.draw = function()
    {
        contextBuffer.drawImage(this.backgroundImg, 0, 0, this.backgroundWidth, this.backgroundHeight, 0, 0, this.backgroundWidth, this.backgroundHeight);
        for(var i in this.mapCase)
        {
            this.mapCase[i].draw();
        }
    }
}
var Case = function Case(id,x,y,size,firstType,secondType,thirdType)
{
    var origin = 18;
    this.id = id;
    this.x = x * size;
    this.y = y * size;
    this.width = size;
    this.height = size;
    this.toprightAngle = this.x + this.width;
    this.bottomleftAngle = this.y + this.height;
    this.firstType = firstType - origin;
    this.secondType = secondType- origin;
    this.thirdType = thirdType - origin;
    this.colide = false;
    this.containPlayer = false;
    this.tile = config.images[18];
    //this.tile = config.images[35];
    this.currentFrameX  = 0;
    this.currentFrameY  = 0;

    this.currentFrameX2 = 0;
    this.currentFrameY2 = 0;

    this.currentFrameX3 = 0;
    this.currentFrameY3 = 0;

    //assigner les coordonnees de l'image

    for(var i = 1; i < this.firstType; i++)
    {
        this.currentFrameX += this.width;
        if(i % 52 == 0)
        {
            this.currentFrameX = 0;
            this.currentFrameY += this.width;
        }
    }

    for(var i = 1; i < this.secondType; i++)
    {
        this.currentFrameX2 += this.width;
        if(i % 52 == 0)
        {
            this.currentFrameX2 = 0;
            this.currentFrameY2 += this.width;
        }
    }

    for(var i = 1; i < this.thirdType; i++)
    {
        this.currentFrameX3 += this.width;
        if(i % 52 == 0)
        {
            this.currentFrameX3 = 0;
            this.currentFrameY3 += this.width;
        }
    }


    this.draw = function()
    {
        //contextBuffer.strokeStyle = "green";
        //contextBuffer.lineWidth = 2;
        
        contextBuffer.drawImage(this.tile, this.currentFrameX, this.currentFrameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if(this.secondType > 0)
            contextBuffer.drawImage(this.tile, this.currentFrameX2, this.currentFrameY2, this.width, this.height, this.x, this.y, this.width, this.height);
        if(this.thirdType > 0)
            contextBuffer.drawImage(this.tile, this.currentFrameX3, this.currentFrameY3, this.width, this.height, this.x, this.y, this.width, this.height);
        //contextBuffer.strokeRect(this.x,this.y,96,96);

    }
    return this;
}




