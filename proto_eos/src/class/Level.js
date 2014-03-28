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

    this.tileTable              =       [];
    this.nb_of_case             =       0;
    this.readyToDraw            =       false;

    this.backgroundImg          =       config.images[33];
    this.backgroundWidth        =       7000;
    this.backgroundHeight       =       3500;

    this.hColliders = [];
    this.finalBlocs = [];
    this.tileSize = 96;

    this.init = function()
    {
        var id = 0;
        this.file = GetLevel(); 
        var height = this.file.layers[0].height, 
            width = this.file.layers[0].width,
            sizeCase = this.file.tileheight;
        this.tileCouche1 = [];
        this.tileCouche2 = [];
        this.tileCouche3 = [];
        this.layerObject = [];

        for(var i = 0; i < this.file.layers.length; i++)
        {
            if(this.file.layers[i].name === "couche1")
                this.tileCouche1 = this.file.layers[i].data;
            if(this.file.layers[i].name === "couche2")
                this.tileCouche2 = this.file.layers[i].data;
            if(this.file.layers[i].name === "couche3")
                this.tileCouche3 = this.file.layers[i].data;
            if(this.file.layers[i].name === "object")
                this.layerObject = this.file.layers[i].data;

        }
        this.sizeX = width * this.file.tileheight;
        this.sizeY = height * this.file.tileheight;

        canvasBuffer.width  =  this.sizeX;
        canvasBuffer.height  = this.sizeY;
        this.width = this.sizeX;
        this.height = this.sizeY;
        game.camera  =  new Camera(0,0,document.getElementById("wrapper").width,document.getElementById("wrapper").height,this.sizeX,this.sizeY);
        this.levelConstructor(width,height,sizeCase);
    }
    this.levelConstructor = function(width,height,sizeCase)
    {
        //creation des objets
        for (var i = 0; i < this.tileCouche1.length ; i++)
        {

            this.tileTable.push(new Case(id, i % width, Math.floor(i / width), sizeCase, this.tileCouche1[i], this.tileCouche2[i],this.tileCouche3[i]));
            id++;

            switch(this.layerObject[i])
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
        this.createHorizontalCollider();
        this.createVerticalCollider();
    }
    this.createHorizontalCollider = function()  //Création des colliders horizontaux ("premier assemblage des blocks")
    {
        var _checkedBlocks = [];    //Tableau de stockage temporaire des blocks que l'on est en train d'assembler
        var _toDestroy = [];
        var _alsoAWall = [];
        var _alsoUsed = [];
        var _canBeUsed = true;
        var _wrong = false;
        var _nb = 1;

        var _x;
        var _y;
        var _width;
        var _height = this.tileSize;

        for(var i = 0; i < this.levelBlocs.length; i++)
        {
            if(i == 0)
            {
                _checkedBlocks.push(this.levelBlocs[i]);
            }
            else if((Math.round((this.levelBlocs[i].GetBody().GetPosition().x - _checkedBlocks[_checkedBlocks.length-1].GetBody().GetPosition().x)*30) == this.tileSize) &&
                ((Math.round((this.levelBlocs[i].GetBody().GetPosition().y - _checkedBlocks[_checkedBlocks.length-1].GetBody().GetPosition().y)*30) == 0)))
            {
                _checkedBlocks.push(this.levelBlocs[i]);
            }
            else if(_checkedBlocks.length > 0)
            {
                //On crée le collider horizontal
                _width = (_checkedBlocks.length * this.tileSize)/30/2;
                _x = (_checkedBlocks[0].GetBody().GetPosition().x) + _width - ((this.tileSize/2)/30);
                _y = _checkedBlocks[0].GetBody().GetPosition().y;


                this.hColliders.push(new Platform(_x,_y,_width,_height/30/2,"ground"));

                
                this.hColliders[this.hColliders.length-1].width = _width;

                //On détruit les blocks temporaires
                for(var j = 0; j < _checkedBlocks.length; j++)
                {
                    game.world.DestroyBody(_checkedBlocks[j].GetBody());
                }
                
                //On vide le tableau de bloque temporaires
                _checkedBlocks = [];

                _checkedBlocks.push(this.levelBlocs[i]);
            }
        }
        if(_checkedBlocks.length > 0)
        {
            //On crée le collider horizontal
            _width = (_checkedBlocks.length * this.tileSize)/30/2;
            _x = (_checkedBlocks[0].GetBody().GetPosition().x) + _width - ((this.tileSize/2)/30);
            _y = _checkedBlocks[0].GetBody().GetPosition().y;

           
            this.hColliders.push(new Platform(_x,_y,_width,_height,"ground"));

            
            this.hColliders[this.hColliders.length-1].width = _width;

            //On détruit les blocks temporaires
            for(var j = 0; j < _checkedBlocks.length; j++)
            {
                game.world.DestroyBody(_checkedBlocks[j].GetBody());
            }
        }

        _checkedBlocks = [];
        this.destroyEveryBodyInTable(this.levelBlocs);
        console.log(this.hColliders);
    }
    this.createVerticalCollider = function()
    {
        var _alsoDone = [];

        for(var i = 0;  i < this.hColliders.length; i++)
        {
            var _toAdd = [];    //Raz du tableau temporaire des colliders à merge

            var _next = {};
            _next.x = (this.hColliders[i].GetBody().GetWorldCenter().x*30);
            _next.y = (this.hColliders[i].GetBody().GetWorldCenter().y*30) + (this.tileSize);

            if(!this.checkIfInTable(i, _alsoDone))   //Si le collider n'a pas été traité
            {
                _toAdd.push(i); //On push de base les premiers quitte à faire un collider solo

                for(var j = 0; j < this.hColliders.length; j++) //On regarde parmis les autres qui est collé à celui-là
                {
                    if((j !== i) && (!this.checkIfInTable(j, _alsoDone)) && ((this.hColliders[j].GetBody().GetWorldCenter().x*30 == _next.x)) && (this.hColliders[j].width == this.hColliders[_toAdd[0]].width))
                    {
                        if((Math.round(this.hColliders[j].GetBody().GetWorldCenter().y*30) == Math.round((this.hColliders[i].GetBody().GetWorldCenter().y*30) + (_toAdd.length*this.tileSize))))
                        {
                            _toAdd.push(j); //On met dans un tableau tout les colliders qui ont le même x
                            _alsoDone.push(j);
                        }
                    }
                }
            }

            if(_toAdd.length > 0)
            {
                var _x = this.hColliders[_toAdd[0]].GetBody().GetWorldCenter().x;
                var _height = (_toAdd.length*this.tileSize)/2/30;
                var _y = (this.hColliders[_toAdd[0]].GetBody().GetWorldCenter().y) + _height - ((this.tileSize/2)/30);
                var _width = this.hColliders[_toAdd[0]].width;
                this.finalBlocs.push(new Platform(_x,_y,_width,_height,"ground"));;
            }

            _alsoDone.push(i);
            _toAdd = [];
        }

         this.destroyEveryBodyInTable(this.hColliders);
    }
    this.destroyEveryBodyInTable = function(table)  //Detruit tout les body d'un tableau et le vide
    {
        for(var _i = 0; _i < table.length; _i++)
        {
            game.world.DestroyBody(table[_i].GetBody());
        }

        table = [];
    }
    this.checkIfInTable = function(id, table)   //Vérifie si une variable se trouve dans un tableau
    {
        for(var _i = 0; _i < table.length; _i++)
        {
            if(table[_i] === id)
            {
                return true;
            }
        }

        return false;
    }

    this.draw = function()
    {
        contextBuffer.drawImage(this.backgroundImg, 0, 0, this.backgroundWidth, this.backgroundHeight, 0, 0, this.backgroundWidth, this.backgroundHeight);
        for(var i in this.tileTable)
        {
            this.tileTable[i].draw();
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
