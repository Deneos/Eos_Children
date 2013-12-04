//objet des piques
//blessent le joueurs
var Spike = function()
{
    
}
//objet correspondant au collider d'un trou
//qu'on utilise quand on tombe dans un trou, enleve de la vie et remet le player au checkpoint
var Hole = function(x,y,width)
{
    this.x = x;
    this.y = y;
    this.width = width;

    this.fall = function()
    {
        //fonction de distance
        //racine de x1 - x2 au carre + racine de y1 - y2 au carre indique la distance entre deux objets
        var range = Math.sqrt(Math.pow(objetA.x-objetB.x,2) + Math.pow(objetA.y-objetB.y,2));
    }
}