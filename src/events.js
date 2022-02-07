

export function domEventsInit({
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


const EVENT_LISTENER = [];

export function listen(eventName,callback){
    EVENT_LISTENER.push({
        name:eventName,
        callback
    })
}

function unListen(item){
    let type;
    if(typeof item === "function"){
        type = "callback";
    }else{
        type = "name"
    }
    //todo
}

export function dispatch(eventName,...args){
    EVENT_LISTENER.forEach(({name,callback})=>{
        if(eventName === name){
            callback(...args);
        }
    })
}