(() => {
    class State {
        tasks
        index


        constructor() {
            this.index = 0
            this.correctness = new Map
        }
        addTask(task) {
            if (task instanceof Task) {
                this.tasks.push(task)
            }
        }

        Addtasks() {
            let range = 10
            let arr = []
            arr.push(new Task(range, "x ** 2 + 3"))
            arr.push(new Task(range, "x ** 4 + 1"))
            arr.push(new Task(range, "x + 3"))
            arr.push(new Task(range, "Math.sin(x)+ 3"))
            arr.push(new Task(range, "Math.sin(x)"))
            arr.push(new Task(range, "Math.cos(2 * x)"))
            this.tasks = arr
            console.log(this.tasks)
        }
        updateState(i){
            this.index=i
        }
        getTask(){
            return this.tasks[this.index]
        }
        checkCorectness(ans){
            let x = this.getTask()
            return x.checkAnswer(ans)
        }
        setCor(){
            this.correctness.set(this.index,true)
            console.log(this.correctness)
        }
        setInCor(){
            this.correctness.set(this.index,false)
        }
    }

    class View {
        color
        scale

        constructor(scale) {
            this.doc = document.getElementById("canvas")
            console.log(this.doc)
            this.ctx = this.doc.getContext("2d")
            this.scale = scale
            this.color = "#000000"
        }

        Translate() {
            this.ctx.translate(this.doc.height / 2, this.doc.width / 2)
            this.ctx.scale(1, -1)
            console.log("translated")
        }

        DrowLines() {
            this.ctx.beginPath()
            this.ctx.rect(-400, -400, 800, 800)
            this.ctx.fillStyle = "#BCD7D4";
            this.ctx.fill();
            for (let i = -this.doc.height; i < this.doc.height; i += 40) {
                i === 0 ? this.ctx.strokeStyle = "black" : this.ctx.strokeStyle = "grey"
                this.ctx.beginPath()
                this.ctx.moveTo(this.doc.width, i)
                this.ctx.lineTo(-this.doc.width, i)
                this.ctx.stroke()
            }
            for (let i = -this.doc.width; i < this.doc.width; i += 40) {
                i === 0 ? this.ctx.strokeStyle = "#000000" : this.ctx.strokeStyle = "grey"
                this.ctx.beginPath()
                this.ctx.moveTo(i, -this.doc.height)
                this.ctx.lineTo(i, this.doc.height)
                this.ctx.stroke()
            }

        }

        addButtons(state) {
            for (let i = 0; i < state.tasks.length; i++) {
                let btn = document.createElement("button")
                btn.id = `${i}`
                btn.onclick = () => {
                    state.updateState(i)
                    this.draw(state.tasks[i]);
                }
                let t = document.createTextNode(`Task ${i+1}`)
                btn.appendChild(t);

                document.getElementById("rightdiv").appendChild(btn);

            }
        }
        correct(){
            this.ctx.beginPath()
            this.ctx.rect(-400, -400, 800, 800)
            this.ctx.fillStyle = "rgba(95,245,87,0.11)";
            this.ctx.fill();
        }
        incorrect(){
            this.ctx.beginPath()
            this.ctx.rect(-400, -400, 800, 800)
            this.ctx.fillStyle = "rgba(211,21,21,0.44)";
            this.ctx.fill();
        }
        draw(task) {
            console.log(task)
            let r = task.range
            let f = task.formula
            this.DrowLines()
            console.log(f)
            let x = -r
            console.log(this.color)
            this.ctx.strokeStyle = this.color
            this.ctx.beginPath()
            this.ctx.moveTo(x.toFixed(4) * this.scale, eval(f).toFixed(4) * this.scale)

            for (x = -r; x < r; x += 0.1) {
                if (x === 0) continue
                let y = eval(f)
                this.ctx.lineTo(x.toFixed(4) * this.scale, y.toFixed(4) * this.scale)
            }
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
        clr(id,color){
            let btn = document.getElementById(`${id}`)
            btn.style.backgroundColor = color
        }
    }

    class Task {
        constructor(range, form) {
            this.formula = form
            this.range = range
        }

        checkAnswer(anForm) {
            for (let x = -this.range; x < this.range; x += 0.5) {
                if (eval(anForm).toFixed(4) !== eval(this.formula).toFixed(4)) {
                    return false
                }
            }
            return true
        }
    }


    function main() {
        let g = new State()
        g.Addtasks()
        console.log(g.tasks)
        let v = new View(40)
        v.Translate()
        for (let i = 0; i < 40; i++) {
            g.addTask(new Task(10,`x ** ${i/2}`))

        }
        v.DrowLines()
        v.addButtons(g)
        let a = document.getElementById("check")
        a.onclick = () =>{
            let k = v.getAnswer()
            if(!k){
                console.log("Incorrect")
                return
            }
            if (g.checkCorectness(k)){
                g.setCor()
                v.correct()
                v.clr(g.index,"green")
            }else{
                v.incorrect()
                v.clr(g.index,"red")
            }
        }


    }

    window.onload = main
})()
