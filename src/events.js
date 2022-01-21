

export function eventsInit({
                               start,move,end,
                           }){
    const el = document.body;
    const {height} = el.getBoundingClientRect();
    el.addEventListener("touchstart",start);
    el.addEventListener("touchmove",move);
    el.addEventListener("touchend",end);

/*    el.addEventListener("mousedown",start);
    el.addEventListener("mousemove",move);
    el.addEventListener("mouseup",end)*/
}