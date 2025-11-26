
function getgraf(formulastring,range){
    let arr = []
    for (let x = -range; x < range; x+=0.1) {
        if (x === 0) continue
    let y = eval(formulastring)
    arr.push([x.toFixed(4),-y.toFixed(4)])
}
    return arr
}
function drawcoordlines(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.moveTo(-canvas.width/2,0)
    ctx.lineTo(canvas.width/2,0)
    ctx.stroke()

     ctx.moveTo(0,-canvas.height/2)
    ctx.lineTo(0,canvas.height/2)
    ctx.stroke()

}
function drawoncanvas(pointarr){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.rect(0, 0, 900, 900);
    ctx.fillStyle = "aqua";
    ctx.translate(canvas.height/2,canvas.width/2)
    ctx.fill();
    ctx.moveTo((40 * pointarr[0][0]),(40 * pointarr[0][1]))
    for (let i = 0; i < pointarr.length-1; i++) {
    ctx.lineTo((40 * pointarr[i+1][0]),(40 * pointarr[i][1]))
}
    ctx.stroke()
}
//stroke post cycle,moveTo before:Done
//get used to gitHub
//graphics:DONE
//find analogs
//canvas transformations:DONE

function add(){
    const list = document.getElementById("list")
    let form = document.getElementById("input").value
    list.value += form
}
function update(){
    let form = document.getElementById("input").value
    let points = getgraf(form,5)
    drawoncanvas(points)
    drawcoordlines()

}