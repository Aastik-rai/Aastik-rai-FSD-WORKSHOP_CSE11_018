import EventEmitter from 'node:events';
const myEmitter = new EventEmitter();
myEmitter.on("greet", (teacher) => {
    console.log(`class started by ${teacher}`);
});
myEmitter.on("exit", (teacher) => {
    console.log(`class finished by ${teacher}`);
});
myEmitter.on("present", (student) => {
    console.log(`class joined by ${student}`);
});
myEmitter.emit("greet", "chandrahas");
myEmitter.emit("exit", "chandrahas");
myEmitter.emit("present", "Aastik Rai");