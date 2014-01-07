//Objet qui contient tout les blocs
var Level = function(id,width,height)
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
    this.end                    =       null;

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
        var b = new Box(28,4,{w : 2, h : 2},true);
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
        var i = new LifeUp(10,15,1);
        this.tabItem.push(i);

        this.end = new EndPoint(10,65,4,0.2);
    }
    this.init = function()
    {
        this.file = getLevel();
        this.blocs = [];
        //on recupere le level, sa hauteur et sa largeur
        var levelData = this.file.layers[0].data , 
            height = this.file.layers[0].height, 
            width = this.file.layers[0].width;
        //on parcourt le level une premiere fois pour ensuite construire les blocs servant aux colliders
        for (var i = 0; i < levelData.length ; i++){
            if (levelData[i] != 0){
                //ceux ci sont des blocs temporaires
                this.blocs.push(new Platform( i % width, Math.floor(i / width),1.6,1.6,"blocs", levelData[i]));
            }
        }

        //on parcourt les blocks temporaires pour voir si les blocs adjacents sont de même type
        //dans ce cas là il feront parti du même collider
        for (var i = 0; i < this.blocs.length ; i++){
            //tableau servant a savoir le bloc a ete ajoute a un collider
            var blocksAdded = [];
            //on verifie que le bloc n'a pas ete ajoute a un collider
            if (blocksAdded.indexOf(this.blocs[i].id) == -1)
                blocksAdded.push(this.blocs[i].id)
            //taille par defaut d'un collider
            var width = 16;
            var height = 16;
            //on compare l'élément de la première boucle avec tous les autres blocs
            //NB: on est sur que l'on est sur la même ligne, et on regarde les blocs qui sont a droite
            for (var j = i + 1; j < this.blocs.length ; j++){
                //si le bloc est de même type alors on ajoute de la largeur
                if (this.blocs[i].type == this.blocs[j].type ){
                    width += 16;
                    //on ajoute aussi le bloc dans une liste de bloc a ne plus traiter
                    //pour ne pas avoir plusieurs blocs qui se chevauchent
                    blocksAdded.push(this.blocs[j].id);
                }
            }
        }
    }
}
