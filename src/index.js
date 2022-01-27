import { eventsInit } from "./events.js";
import "./css/main.scss";
import Line from "./Line";
import ScanPage from "./scanPage";

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
        el.setAttribute("id","rulerJs");

        let html = document.getElementsByTagName("html")[0];
        html.appendChild(el);
        

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
        this.initScan();

    }

    init(){

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

                let dx = mx - sx;
                let dy = my - sy;
            
         
                this.data.currentLine.updatePosition(dx*2,dy*2);

            },
            end:(e)=>{
                if(!this.data.isDrawing){
                    return;
                }
                this.data.isDrawing = false;
                let t = e.changedTouches[0];
                mx = t.clientX;
                my = t.clientY;



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

    initScan(){
        new ScanPage(document.getElementsByTagName("body")[0]);
    }

    render(){

    }

    renderLine(){

    }
}



export default Ruler;