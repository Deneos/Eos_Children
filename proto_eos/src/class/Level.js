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

    this.sample = function()
    {
        //creer les plateformes
        var b = new Platform(18,22,40,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(18,20,2,2,"ground");
        this.levelBlocs.push(b);
        //murs
        var b = new Platform(0,0,1,70,"ground");
        this.levelBlocs.push(b)
        var b = new Platform(66,0,1,70,"ground");
        this.levelBlocs.push(b)
        var b = new Platform(32,17,2,5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(46,17,2,5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(50,32,16,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(20,32,6,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(18,56,40,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(12,66,12,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(48,66,18,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(16,40,1,8,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(59,51,1,6,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(24,53,2,2,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(26,50,2,2,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(28,53,2,2,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(42,50,2,5,"ground");
        this.levelBlocs.push(b);
        
        //creer les boites dynamiques
        var b = new Box(25,19,{w : 2, h : 2},50);
        this.tabDynamicBlocs.push(b);


        //elements de gameplay
        var s = new Spike(4,20,1,1);
        this.tabTraps.push(s);
        var s = new Spike(36,20,1,1);
        this.tabTraps.push(s);
        var s = new Spike(38,20,1,1);
        this.tabTraps.push(s);
        var s = new Spike(44,20,1,1);
        this.tabTraps.push(s);
        var s = new Spike(50,30,1,1);
        this.tabTraps.push(s);
        var s = new Spike(4,54,1,1);
        this.tabTraps.push(s);
        var s = new Spike(32,54,1,1);
        this.tabTraps.push(s);
        var s = new Spike(34,54,1,1);
        this.tabTraps.push(s);
        var s = new Spike(36,54,1,1);
        this.tabTraps.push(s);
        var s = new Spike(38,54,1,1);
        this.tabTraps.push(s);
        var s = new Spike(40,54,1,1);
        this.tabTraps.push(s);

        var h = new Hole(30,34,4,0.2);
        this.tabFallingBlocs.push(h);
        var h = new Hole(27,66,3,0.2);
        this.tabFallingBlocs.push(h);

        var f = new FallingBloc(64,22,6,1);
        this.tabFallingBlocs.push(f);
        var f = new FallingBloc(7,32,7,1);
        this.tabFallingBlocs.push(f);
        var f = new FallingBloc(7,40,7,1);
        this.tabFallingBlocs.push(f);
        var f = new FallingBloc(7,50,7,1);
        this.tabFallingBlocs.push(f);

        var c = new Checkpoint(52,20,2,2);
        this.tabChekpoint.push(c);
        var c = new Checkpoint(20,30,2,2);
        this.tabChekpoint.push(c);
        var c = new Checkpoint(50,53,2,2);
        this.tabChekpoint.push(c);
    }
    this.sample2 = function()
    {
        //creer les plateformes
        var b = new Platform(18,22,50,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(0,0,1,70,"ground");
        this.levelBlocs.push(b)
        var b = new Platform(0,0,1,70,"ground");
        this.levelBlocs.push(b)
        //murs
        var s = new Platform(15,20,2,1,"ground");
        this.levelBlocs.push(s);
        var s = new Platform(21,19,4,2,"ground");
        this.levelBlocs.push(s);
        var s = new Platform(28,17,3,4,"ground");
        this.levelBlocs.push(s);
        var s = new Platform(32,19,4,2,"ground");
        this.levelBlocs.push(s);
        var s = new Platform(38,17,3,4,"ground");
        this.levelBlocs.push(s);
        var s = new Platform(42,19,3,2,"ground");
        this.levelBlocs.push(s);
        var s = new Platform(65,19,3,2,"ground");
        this.levelBlocs.push(s);
        var s = new Platform(81,19,5,30,"ground");
        this.levelBlocs.push(s);
        var c = new Checkpoint(38,11,2,2);
        this.tabChekpoint.push(c);
        var i = new LifeUp(43,11.5,1);
        this.tabItem.push(i);
        var b = new Box(48,19,{w : 0.5, h : 0.5},5);
        this.tabDynamicBlocs.push(b);
        var f = new FallingBloc(72,22,4,1);
        this.tabFallingBlocs.push(f);
        var b = new Box(66,14,{w : 0.5, h : 0.5},5);
        this.tabDynamicBlocs.push(b);

        var c = new Checkpoint(60,31,2,2);
        this.tabChekpoint.push(c);
        var i = new LifeUp(73,26,1);
        this.tabItem.push(i);

        var b = new Platform(40,34,50,1,"ground");
        this.levelBlocs.push(b);

        var b = new SwitchButton(10,21);
        this.tabChekpoint.push(b);
        var b = new Box(4,19,{w : 0.5, h : 0.5},5);
        this.tabDynamicBlocs.push(b);
        //creer les boites dynamiques
        /*var b = new Box(15,12,{w : 0.5, h : 0.5},5,10,0);
        this.tabDynamicBlocs.push(b);
        var b = new Box(15,12,{w : 0.5, h : 0.5},5,10,0);
        this.tabDynamicBlocs.push(b);
        var b = new Box(15,12,{w : 0.5, h : 0.5},5,10,0);
        this.tabDynamicBlocs.push(b);
        var b = new Box(15,12,{w : 0.5, h : 0.5},5,10,0);
        this.tabDynamicBlocs.push(b);*/


        var s = new Spike(33,16.5,2,0.5);
        this.tabTraps.push(s);

        //ennemis
        var e = new Ennemi(60,18,{w : 1, h : 1.5},"l-shield");
        this.tabEnnemi.push(e);

        var e = new Ennemi(28,15,{w : 1, h : 1.5},"column");
        this.tabEnnemi.push(e);

        var e = new FlyingEnnemi(18,12,{w : 1, h : 1},"weak");
        this.tabEnnemi.push(e);
        var e = new FlyingEnnemi(72,12,{w : 1, h : 1},"weak");
        this.tabEnnemi.push(e);
        this.end = new EndPoint(10,65,4,0.2);
    }
    this.init = function()
    {
        var id = 0;
        this.file = GetLevel(); 
        this.mapCase = [];      
        var levelData = this.file.layers[0].data , 
            height = this.file.layers[0].height, 
            width = this.file.layers[0].width,
            layer2 = this.file.layers[1].data,
            layer3 = this.file.layers[2].data,
            sizeCase = this.file.tileheight;

        this.sizeX = width * this.file.tileheight;
        this.sizeY = height * this.file.tileheight;

        canvasWidth = this.sizeX;
        canvasHeight = this.sizeY;
        canvas.width  =  canvasWidth;
        canvas.height  = canvasHeight;
        
        canvasBuffer.width  =  this.sizeX;
        canvasBuffer.height  = this.sizeY;
        this.width = this.sizeX;
        this.height = this.sizeY;
        game.camera  =  new Camera(0,0,document.getElementById("wrapper").width,document.getElementById("wrapper").height,this.sizeX,this.sizeY);


        for (var i = 0; i < levelData.length ; i++)
        {

            this.caseTable.push(new Case(id, i % width, Math.floor(i / width), sizeCase, levelData[i], layer2[i]));
            id++;

            switch(layer3[i])
            {
                // spawn
                case 1:
                    game.player = new Player(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1.5},10,0,0);
                    break;
                // collider
                case 2:
                    var p = new Platform(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,1.6,1.6,"ground");
                    //var p = {x: ((i % width)*3.2)+1.6, y : (Math.floor(i / width)*3.2)+1.6, width : 1.6, height : 1.6, tag : "ground"};

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
        var nb   = 0;
        for(var i = 0; i < this.levelBlocs.length; i++)
        {
            if(this.levelBlocs[nb].y === this.levelBlocs[i].y)
            {
                size ++;
            }
            else
            {
                var p = new Platform(this.levelBlocs[nb].x, this.levelBlocs[nb].y,this.levelBlocs[nb].width*size,this.levelBlocs[nb].height,this.levelBlocs[nb].tag);
                this.finalBlocs.push(p);
                nb ++;
                size = 1;
            }
        }
        console.log(this.finalBlocs);*/
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
    this.colide = false;
    this.containPlayer = false;
    this.tile = config.images[18];

    this.currentFrameX  = 0;
    this.currentFrameY  = 0;

    this.currentFrameX2 = 0;
    this.currentFrameY2 = 0;

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


    this.draw = function()
    {
        //contextBuffer.strokeStyle = "green";
        //contextBuffer.lineWidth = 2;
        
        contextBuffer.drawImage(this.tile, this.currentFrameX, this.currentFrameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if(this.secondType > 0)
            contextBuffer.drawImage(this.tile, this.currentFrameX2, this.currentFrameY2, this.width, this.height, this.x, this.y, this.width, this.height);
        //contextBuffer.strokeRect(this.x,this.y,96,96);

    }
    return this;
}




