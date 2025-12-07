import {problems} from "./modules/problems.js"
import {canvasOpreations} from "./modules/canvas.js"
import {viewOpearations} from "./modules/sides.js"




    function main() {
        let P = new problems();

        (async () =>{
            await P.parseData()
            let c = new canvasOpreations(40)
            let v = new viewOpearations(c);
            c.drowLines()
            v.addButtons(P)
            c.drawGrap(P.mmFuncs(1))
        })()



        // let a = document.getElementById("check")
        // a.onclick = () =>{
        //     let k = v.getAnswer()
        //     if(!k){
        //         console.log("Incorrect")
        //         return
        //     }
        //     if (g.checkCorectness(k)){
        //         g.setCor()
        //         v.updateScore(g)
        //         v.correct()
        //         v.clr(g.index,"green")
        //     }else{
        //         v.incorrect()
        //         g.setInCor()
        //         v.clr(g.index,"red")
        //     }
        // }


    }
    main()

