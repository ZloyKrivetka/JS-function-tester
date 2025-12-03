(() => {
    class State {
        tasks
        index

        constructor() {
            this.index = 0
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
            this.tasks = arr
            console.log(this.tasks)
        }
        updateState(i){
            this.index=i
        }
        getTask(){
            return this.tasks[this.index]
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
                let t = document.createTextNode(`Task ${i+1}\n${state.tasks[i].formula};`)
                btn.appendChild(t);
                document.body.appendChild(btn);

            }
        }

        draw(task) {
            console.log(task)
            this.ctx.strokeStyle = this.color
            let r = task.range
            let f = task.formula
            this.DrowLines()
            console.log(f)
            let x = -r

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
        console.log("SMTH")
        let g = new State()
        g.Addtasks()
        console.log(g.tasks)
        let v = new View(40)
        v.Translate()
        v.DrowLines()
        console.log("aaa")
        v.addButtons(g)
        let a = document.getElementById("check")
        a.onclick = () =>{
            let k = v.getAnswer()
            if(!k){
                console.log("Incorrect")
                return
            }
            if (g.getTask().checkAnswer(k)){

                console.log("Correct")
            }else{
                console.log("Incorrect")
            }
        }


    }

    window.onload = main
})()
