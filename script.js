function drawcoordlines(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.rect(0, 0, 800, 800);
    ctx.fillStyle = "#BCD7D4" ;
    ctx.fill();
    ctx.translate(canvas.height/2,canvas.width/2)
    ctx.scale(1,-1)
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

}
//stroke post cycle,moveTo before:Done
//get used to gitHub
//graphics:DONE
//find analogs
//canvas transformations:DONE
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
function update(){
    let anform = document.getElementById("input").value
    let form = "x ** 2"
    let f = new Task(10,form,document.getElementById("myCanvas"),40)
    f.draw()
    if (f.checkAnswer(anform)){
        f.draw("green")
        console.log("correct")
    }else{
        f.draw("red")
        console.log("Incorrect")
    }
}