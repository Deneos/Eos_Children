var Camera = function(viewX,viewY,canvasWidth,canvasHeight,mapSizeX,mapSizeY)
{
    //position de la camera
    this.viewX = viewX || 0;
    this.viewY = viewY || 0;

    // distance entre l'objet suivit et le bord avant le mouvement
    this.deadZoneX = 0;
    this.deadZoneY = 0;

    // dimension de la vue
    this.viewWidth= canvasWidth;
    this.viewHeight = canvasHeight; 

    // taille complete de la map
    this.mapSizeX = mapSizeX;
    this.mapSizeY = mapSizeY;

    //objet suivi par la camera
    this.target = game.player;

    //faire un champ de camera ou le mouvement du player ne la fait pas bouger
    //si on est dans le champs, le player bouge
    //si on est pas dans le champs, la camera bouge
}
