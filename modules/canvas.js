export class canvasOpreations{

    constructor(scale) {
        let can = document.getElementById("Visualizer")
        this.ctx = can.getContext("2d")
        this.h = can.height
        this.w = can.width
        this.ctx.translate(this.h/ 2, this.w/ 2)
        this.ctx.scale(1, -1)
        this.s = scale
    }

    fillRect(color){
        this.ctx.beginPath()
        this.ctx.rect(-400, -400, 800, 800)
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    drowLines() {
        this.fillRect("#48a878")
        for (let i = -this.h; i < this.w; i += this.s) {
            i === 0 ? this.ctx.strokeStyle = "black" : this.ctx.strokeStyle = "grey"
            this.ctx.beginPath()
            this.ctx.moveTo(this.w, i)
            this.ctx.lineTo(-this.w, i)
            this.ctx.stroke()
        }
        for (let i = -this.w; i < this.w; i += this.s) {
            i === 0 ? this.ctx.strokeStyle = "#000000" : this.ctx.strokeStyle = "grey"
            this.ctx.beginPath()
            this.ctx.moveTo(i, -this.h)
            this.ctx.lineTo(i, this.h)
            this.ctx.stroke()
        }

    }

    drawGrap(task){
        let r = 10
        this.ctx.strokeStyle = "black"
        this.ctx.beginPath()
        for (let x = -r; x < r; x += 0.1) {
            if (x === 0) continue
            let y = eval(task.formula)
            this.ctx.lineTo(x.toFixed(4) * this.s, y.toFixed(4) * this.s)
        }
        this.ctx.stroke()
    }

    draw(task,cor) {
        console.log(task)
        let r = task.range
        let f = task.formula
        if(cor === undefined){
            this.DrowLines("#ffffff")
        }else {
            if (!cor) {
                this.DrowLines("red")
            } else {
                this.DrowLines("green")
            }
        }
        let x = -r
        console.log(this.color)
        this.ctx.strokeStyle = this.color
        this.ctx.beginPath()
        this.ctx.moveTo(x.toFixed(4) * this.scale, eval(f).toFixed(4) * this.scale)


        this.ctx.stroke()
    }
    getAnswer(){
        let a = document.getElementById("input")
        if(a.value == 0 || a.value === "Write Answer"){
            console.log("Please,type the formula")
            return false
        }else {
            return a.value
        }
    }

}