//Objet qui contient tout les blocs
var Level = function(id,width,height)
{
    this.id = id;
    this.width = width;
	this.height = height;
    this.ennemiTab = [];
    this.levelBlocs = [];
    this.tabWallBlocs = [];
    this.tabDynamicBlocs = [];
    this.tabjoint = [];

    this.draw = function()
    {

    }
}
