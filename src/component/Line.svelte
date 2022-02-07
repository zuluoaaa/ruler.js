<script>
    import Line, {checkDirection} from "./Line.js";
    import {domEventsInit} from "../events";



    let lines = [];



    let currentState = {
        currentLine:null,
        currentDirection:null,
        isDrawing:false,
    }


    function  insertNewLine(){
        let line = new Line({
            direction:currentState.currentDirection
        })
        lines.push(line);
        lines = lines;
        currentState.currentLine = line;

    }

    let sx,sy,mx,my;

    domEventsInit({
        start:(e)=>{

            currentState.isDrawing = true;

            let t = e.changedTouches[0];

            sx = t.clientX;
            sy = t.clientY;
            currentState.currentDirection = null;


            console.log(sx,sy,"start");

        },
        move:(e)=>{
            if(!currentState.isDrawing){
                return;
            }
            let t = e.changedTouches[0];

            mx = t.clientX;
            my = t.clientY;


            if(!currentState.currentDirection){
                currentState.currentDirection = checkDirection(sx,sy,mx,my);
                if(!currentState.currentDirection){
                    return;
                }
                insertNewLine();
            }

            let dx = mx - sx;
            let dy = my - sy;

            currentState.currentLine.updatePosition(dx*2,dy*2);
            lines = lines;
        },
        end:(e)=>{
            if(!currentState.isDrawing){
                return;
            }
            currentState.isDrawing = false;
            let t = e.changedTouches[0];
            mx = t.clientX;
            my = t.clientY;



            console.log(e.changedTouches[0],"end")
        }
    });
</script>

<div>
    {#each lines as line}
        <div class="ruler_line_{line.direction}"
             style="transform: {line.style}"
        />
    {/each}
</div>