import { eventsInit } from "./events.js";
import "./css/main.scss";
import Line from "./Line";


const MIN_DISTANCE = 50;


function checkDirection(sx,sy,mx,my){
    let diffX = mx - sx;
    let diffY = my - sy;

    if(Math.abs(diffX) < MIN_DISTANCE && Math.abs(diffY) < MIN_DISTANCE){
        return null;
    }

    if(Math.abs(diffX) > Math.abs(diffY)){
        if(diffX > 0){
            return "column"
        }else{
            return  "reverse-column"
        }
    }else{
        if(diffY > 0){
            return "row"
        }else{
            return "reverse-row"
        }
    }
}

class Ruler {
    constructor(){
        console.log("start init ruler");


        let el = document.createElement("div");
        el.className = "g_ruler_container";
        document.body.appendChild(el);
        

        const cacheKey = "_RULER_LINES";
        let lines = localStorage.getItem(cacheKey);

        if(lines){
            try{
                lines = JSON.parse(lines);
            }catch(e){
                lines = [];
            }
        }else{
            lines = []
        }

    

        this.data = {
            lines,
            visibleLines:true,
            el,

            isDrawing:false,
            currentLine:null,
            currentDirection:null,
            isOn:true,


        }
        
        this.init();
        this.render();
    }

    init(){
        console.log("init")

        let sx,sy,mx,my;

        eventsInit({
            start:(e)=>{
                if(!this.data.isOn){
                    return;
                }
                this.data.isDrawing = true;

                let t = e.changedTouches[0];

                sx = t.clientX;
                sy = t.clientY;
                this.data.currentDirection = null;


                console.log(sx,sy,"start");

            },
            move:(e)=>{
                if(!this.data.isDrawing){
                    return;
                }
                let t = e.changedTouches[0];

                mx = t.clientX;
                my = t.clientY;

                if(!this.data.currentDirection){
                    this.data.currentDirection = checkDirection(sx,sy,mx,my);
                    if(!this.data.currentDirection){
                        return;
                    }

                    this.insertNewLine();
                }

                this.data.currentLine.updatePosition();

            },
            end:(e)=>{
                if(!this.data.isDrawing){
                    return;
                }
                console.log(e.changedTouches[0],"end")
            }
        });
    }

    insertNewLine(){
        let line = new Line({
            parentNode:this.data.el,
            direction:this.data.currentDirection
        }).drawLine();
        this.data.lines.push(line);
        this.data.currentLine = line;
    }

    render(){

    }

    renderLine(){

    }
}



export default Ruler;