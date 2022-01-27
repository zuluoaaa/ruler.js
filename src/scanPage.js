
const GRID_GAP = 10; //10% distance of each grid


const exceptTag = ["script","link","noscript"]
/**
 * Scanner every element in the document (not include the g_ruler_container element) ,
 * Save the elements position and width/height to the grid object
 */
export default class ScanPage{
    constructor(rootElement) {

        let rect = rootElement.getBoundingClientRect();
        console.log(rootElement.children)
        this.rootElement = rootElement;

        this.rootWidth = rect.width;
        this.rootHeight = rect.height;

        this.quadtree = [];
        this.gridGap = GRID_GAP;

        this.init();
        this.dfs(this.rootElement);
    }

    init(){

    }

    dfs(node){
        if(exceptTag.includes(node.tagName.toString().toLowerCase())){
            return;
        }

    }

    insertObject(){

    }


    queryObjects(x,y,direction){

    }

}


class Quadtree {
    constructor() {
        this.nodes = [];
        this.tl = [];
        this.tr = [];
        this.bl = [];
        this.br = [];


    }
}