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

    updatePosition(dx,dy){
       let style;
        if(this.direction === "row"){
            style = `scaleY(0.5) translate(0px, ${dy}px)`
        }
        else if(this.direction === "reverse-row"){
            style = `scaleY(0.5) translate(0px, ${dy}px)`
        }
        else if(this.direction === "column"){
            style = `scaleX(0.5) translate(${dx}px, 0px)`
        }
        else if(this.direction === "reverse-column"){
            style = `scaleX(0.5) translate(${dx}px, 0px)`
        }else{
            throw `Unknown line direction : ${this.direction}`
        }

        this.el.style.transform =style;
    }
}