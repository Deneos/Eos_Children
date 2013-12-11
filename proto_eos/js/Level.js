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
    this.end                    =       null;

    this.sample = function()
    {
        //creer les plateformes
        var b = new Platform(9,11,20,0.5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(9,10,1,1,"ground");
        this.levelBlocs.push(b);
        //murs
        var b = new Platform(0,0,0.5,35,"ground");
        this.levelBlocs.push(b)
        var b = new Platform(33,0,0.5,35,"ground");
        this.levelBlocs.push(b)
        var b = new Platform(16,8.5,1,2.5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(23,8.5,1,2.5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(25,16,8,0.5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(10,16,3,0.5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(9,28,20,0.5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(6,33,6,0.5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(24,33,9,0.5,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(8,20,0.5,4,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(29.5,25.5,0.5,3,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(12,26.5,1,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(13,25,1,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(14,26.5,1,1,"ground");
        this.levelBlocs.push(b);
        var b = new Platform(21,25,1,2.5,"ground");
        this.levelBlocs.push(b);
        
        //creer les boites dynamiques
        var b = new Box(14,2,{w : 1, h : 1},true);
        this.tabDynamicBlocs.push(b);
        //elements de gameplay
        var s = new Spike(2,10,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(18,10,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(19,10,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(22,10,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(25,15,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(2,27,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(16,27,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(17,27,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(18,27,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(19,27,0.5,0.5);
        this.tabTraps.push(s);
        var s = new Spike(20,27,0.5,0.5);
        this.tabTraps.push(s);

        var h = new Hole(15,17,2,0.1);
        this.tabFallingBlocs.push(h);
        var h = new Hole(13.5,33,1.5,0.1);
        this.tabFallingBlocs.push(h);

        var f = new FallingBloc(32,11,3,0.5);
        this.tabFallingBlocs.push(f);
        var f = new FallingBloc(3.5,16,3.5,0.5);
        this.tabFallingBlocs.push(f);
        var f = new FallingBloc(3.5,20,3.5,0.5);
        this.tabFallingBlocs.push(f);
        var f = new FallingBloc(3.5,25,3.5,0.5);
        this.tabFallingBlocs.push(f);

        var c = new Checkpoint(26,10,1,1);
        this.tabChekpoint.push(c);
        var c = new Checkpoint(10,15,1,1);
        this.tabChekpoint.push(c);
        var c = new Checkpoint(25,26.5,1,1);
        this.tabChekpoint.push(c);

        this.end = new EndPoint(5,32.5,2,0.1);
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
