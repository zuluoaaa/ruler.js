let id = 0;

export default class Line{
    constructor({x=0,y=0,color="#007AFF",direction="cow",
        parentNode=document.body,clickLine
    }={}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.direction = direction;

        this.parentNode = parentNode;
        this._id = (++id);
        this.clickLine = clickLine;
    }

    toJSONObject(){
        return {
            x:this.x,
            y:this.y,
            color:this.color,
            direction:this.direction,
            _id:this._id
        }
    }

    drawLine(){
        if(!this.direction){
            throw "Line direction is not defined";
        }
        this.el = document.createElement("div");
        this.el.className = "ruler_line_"+this.direction;
        this.el.addEventListener("click",this.clickLine);
        this.parentNode.appendChild(this.el);
        return this;
    }

    updatePosition(x,y){
        if(this.direction === "row"){

        }else{

        }
    }
}