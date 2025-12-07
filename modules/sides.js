export class viewOpearations{
    constructor(canvas) {
        this.txtarea = document.getElementById("formulas-textarea")
        this.currentFormula = ""
        this.txtarea.addEventListener("change", () => {
            let x = document.getElementById("formulas-textarea")
            this.currentFormula = x.value
            console.log(this.currentFormula)
        })
    }






    Formula(){
        return this.currentFormula
    }
    addButtons(state) {
        for (let i = 0; i < state.mFuncs.length; i++) {
            console.log(i)
            let btn = document.createElement("button")
            btn.id = `${i}`
            // btn.onclick = () => {
            //     this.draw(state.tasks[i],state.correctness.get(i));
            // }
            let t = document.createTextNode(`Task ${i+1}`)
            btn.appendChild(t);

            document.getElementById("Buttons-div").appendChild(btn);

        }
    }

}