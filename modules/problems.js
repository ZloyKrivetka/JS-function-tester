export class problems{
    constructor() {
        this.index = 0
        this.mFuncs = []
    }

    async parseData(){
        const resp = await fetch("./mathProblems.json")
        let mFuncs= await resp.json()
        for (let f of mFuncs) {
          this.mFuncs.push(new task(f.range,f.formula,f.image,f.id))
        }
    }
    mmFuncs(i){
        return this.mFuncs[i]
    }
}

export class task {
    constructor(range, form,image,id) {
        this.formula = form
        this.range = range
        this.image = image
        this.corect = false
        this.id = id
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