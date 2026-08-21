import { EventEmitter } from 'node:events';

function createDomEvent() {
    const emitter = new EventEmitter();

    return {
        addEventListener(eventType, listener) {
            emitter.on(eventType, listener);
        },

        removeEventListener(eventType, listener) {
            emitter.off(eventType, listener);
        },

        dispatchEvent(event) {
            event.target = this;
            event.currentTarget = this;
            emitter.emit(event.eventType, event);
        }
    }
}


const button = createDomEvent();


button.addEventListener("save", () => {
    console.log("Saving...");
});


button.addEventListener("submit", () => {
    console.log("Data is submitted sucessfully...");
});


button.addEventListener("click", handleClick);
button.addEventListener("click", (event)=>{
    console.log("mouse clicked");
    console.log(event.eventType);
    console.log("message$event.details")
});


function handleClick(event) {
    console.log("Button Clicked!");
    console.log("Event:", event);
}


button.dispatchEvent({
    eventType: "save"
});

button.dispatchEvent({
    eventType: "submit"
});


button.dispatchEvent({
    eventType: "click",
    detail: "This is the click dispatch"
});