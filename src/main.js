import App from './App.svelte';


const RULERJS_ID = "___rulerJs";

class Ruler {
    constructor() {

        if(document.getElementById(RULERJS_ID)){
            console.warn("RulerJs is already exist")
            return;
        }

        this.coreInstance = new App({
            target:  document.getElementsByTagName("html")[0],
            props: {

            }
        });
    }
}

export default Ruler;


