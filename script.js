function drawcoordlines(arr){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.height/2,canvas.width/2)
    ctx.scale(1,-1)
    reset(arr)
}
class State{
    #tasks
    #index

    constructor(tasks) {
        this.#tasks = tasks
    }
    changeTask(index){
        if(index < this.#tasks.length){
            this.#index = index
            return this.#tasks[index]
        }else{
            return -1
        }
    }
    addTask(task){
        if(task instanceof Task) {
            this.#tasks.push(task)
        }
    }
}
class Task{
    constructor(range,form,canvas,scale) {
        this.formula = form
        this.ctx = canvas.getContext("2d")
        this.range = range
        this.scale = scale

    }
    draw(color) {
        this.ctx.strokeStyle = color
        let x = -this.range

        this.ctx.beginPath()
        this.ctx.moveTo(x.toFixed(4) *  this.scale, eval(this.formula).toFixed(4) * this.scale)
        for (x = -this.range; x < this.range; x += 0.1) {
            if (x === 0) continue
            let y = eval(this.formula)
            this.ctx.lineTo(x.toFixed(4) * this.scale, y.toFixed(4) * this.scale)
        }
        this.ctx.stroke()
    }
    checkAnswer(anForm){
        for (let x = -this.range; x < this.range; x+= 0.5) {
            if(eval(anForm).toFixed(4) !== eval(this.formula).toFixed(4)){
                return false
            }
        }
        return true
    }
}
function guessdraw(){
    let anform = document.getElementById("input").value
    let x = new Task(10,anform,document.getElementById("myCanvas",),40)
    console.log(x.formula)
    x.draw("coral")
}
function reset(arr){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.beginPath()
    ctx.rect(-400,-400,800,800)
    ctx.fillStyle = "#BCD7D4" ;
    ctx.fill();
    for (let i = -canvas.height; i < canvas.height; i+=40) {
        i === 0? ctx.strokeStyle = "black" : ctx.strokeStyle = "grey"
        ctx.beginPath()
        ctx.moveTo(canvas.width,i)
        ctx.lineTo(-canvas.width,i)
        ctx.stroke()
    }
    for (let i = -canvas.width; i < canvas.width; i+=40) {
        i === 0? ctx.strokeStyle = "#000000" : ctx.strokeStyle = "grey"
        ctx.beginPath()
        ctx.moveTo(i,-canvas.height)
        ctx.lineTo(i,canvas.height)
        ctx.stroke()
    }
    initialize(1,arr)

}
function update(IofTask,tasksarr){
    let anform = document.getElementById("input").value
    let f = tasksarr[IofTask]
    if (f.checkAnswer(anform)){
        f.draw("green")
        console.log("correct")
    }else{
        f.draw("red")
        console.log("Incorrect")
    }
}
function initialize(IofTask,taskarr){
    let f = taskarr[IofTask]
    f.draw("#000000")
}
function addtasks(){
    let canvas = document.getElementById("myCanvas")
    let scalse = 40
    let range = 10
    let arr = []
    arr.push(new Task(range,"x ** 2 + 3",canvas,scalse))
    arr.push(new Task(range,"x ** 4 + 1",canvas,scalse))
    arr.push(new Task(range,"x + 3",canvas,scalse))
    arr.push(new Task(range,"x ** 3",canvas,scalse))
    arr.push(new Task(range,"3 * x - 2",canvas,scalse))
    return arr
}
