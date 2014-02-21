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
        canvasBuffer.width  =  canvasWidth;
        canvasBuffer.height  = canvasHeight;
        this.width = canvasWidth;
        this.height = canvasHeight;
        game.camera  =  new Camera(0,0,document.getElementById("wrapper").width,document.getElementById("wrapper").height,canvasWidth,canvasHeight);


        for (var i = 0; i < levelData.length ; i++)
        {

            this.caseTable.push(new Case(id, i % width, Math.floor(i / width), sizeCase, levelData[i], layer2[i]));
            id++;

            switch(layer3[i])
            {
                // spawn
                case 2705:
                    game.player = new Player(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1.5},10,0,0);
                    break;
                // collider
                case 2706:
                    var p = new Platform(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,1.6,1.6,"ground");
                    this.levelBlocs.push(p);
                    break;
                // checkpoint
                case 2707:
                    var c = new Checkpoint(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,2,2);
                    this.tabChekpoint.push(c);
                    break;
                // end point
                case 2708:
                    this.end = new EndPoint(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.4,1,0.2);
                    break;
                //potion
                case 2709:
                    var o = new LifeUp(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,1);
                    this.tabItem.push(o);
                    break;
                //collectible
                case 2710:
                    
                    break;
                 //box
                case 2711:
                    var b = new Box(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1.6, h : 1.6},50);
                    this.tabDynamicBlocs.push(b);
                    break;
                //falling bloc
                case 2712:
                    var f = new FallingBloc(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.2,1.6,1);
                    this.tabFallingBlocs.push(f);
                    break;
                //switch
                case 2713:
                    var b = new SwitchButton(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.7);
                    this.tabChekpoint.push(b);
                    break;
                //spike
                case 2714:
                    var s = new Spike(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.4,1.6,0.8,"ground");
                    this.tabTraps.push(s);
                    break;
                //hole
                case 2715:
                    var h = new Hole(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+2.8,1.6,0.2);
                    this.tabFallingBlocs.push(h);
                    break;
                //ennemi bouclier
                case 2717:
                    var e = new Ennemi(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1.5},"l-shield");
                    this.tabEnnemi.push(e);
                    break;
                //ennemi volant
                case 2718:
                    var e = new FlyingEnnemi(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1},"weak");
                    this.tabEnnemi.push(e);
                    break;
                //ennemi colone
                case 2719:
                    var e = new Ennemi(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 1, h : 1.5},"column");
                    this.tabEnnemi.push(e);
                    break;
                //projectile
                case 2722:
                    var b = new Box(((i % width)*3.2)+1.6, (Math.floor(i / width)*3.2)+1.6,{w : 0.5, h : 0.5},5);
                    this.tabDynamicBlocs.push(b);
                    break;
            }
            
        }
        this.mapCase = this.caseTable;
    }
    this.draw = function()
    {
        for(var i in this.mapCase)
        {
            this.mapCase[i].draw();
        }
    }
}
var Case = function Case(id,x,y,size,firstType,secondType,thirdType)
{
    this.id = id;
    this.x = x * size;
    this.y = y * size;
    this.width = size;
    this.height = size;
    this.toprightAngle = this.x + this.width;
    this.bottomleftAngle = this.y + this.height;
    this.firstType = firstType;
    this.secondType = secondType;
    this.colide = false;
    this.containPlayer = false;
    this.tile = config.images[18];

    this.draw = function()
    {
        contextBuffer.strokeStyle = "green";
        contextBuffer.lineWidth = 2;
        contextBuffer.strokeRect(this.x,this.y,size,size);
        if(this.secondType!=0)
        {
            var drawnb = this.secondType-7;
            if(drawnb < 0)
                drawnb = 0;
        }
        contextBuffer.drawImage(this.tile, size*this.firstType, 0, size, size, this.x, this.y, this.width, this.height);
        if(this.secondeType!=0)
            contextBuffer.drawImage(this.tile, size*drawnb, size, size, size, this.x, this.y, this.width, this.height);
    }
}




