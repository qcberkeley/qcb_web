function check(input) {
  let certIDs = new Map([
    ["66132699", "Zhou Zhengyang"],
    ["10403201", "Alexa Ramirez"],
    ["21244812", "Andy Dong"],
    ["58598436", "Angel Tu"],
    ["59071468", "Ashley Jung"],
    ["21390815", "Bethany Lu"],
    ["78355393", "Binhan Hua"],
    ["37709651", "Brandon Stinson"],
    ["99494644", "Daniel Endraws"],
    ["12345678", "Emiliia D"],
    ["24962337", "Guy Eustace"],
    ["65484289", "Jennifer Zhao"],
    ["83082175", "Jose Gonzalez"],
    ["11205398", "Kitty Ng Lin"],
    ["47757667", "Mathias Joergensen"],
    ["92118838", "Meilin Yen"],
    ["88900937", "Meshan Khosla"],
    ["84980915", "Ofir Dvir"],
    ["16942191", "Raiyan Rizwan"],
    ["90354391", "Samyak Surti"],
    ["91170662", "Saransh Saini"],
    ["23324282", "Sashwat Mahalingam"],
    ["72063349", "Youxun Liu"],
    ["56817508", "Yuetian Tang"],
  ])

  if (certIDs.has(input)) {
    alert("This Certification belongs to " + certIDs.get(input) + ", show it off!");
  }
  else {
    alert('This Certification is invalid.');
  }
}

function plotSine(ctx, xOffset, yOffset) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var scale = 20;

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";

    // console.log("Drawing point...");
    // drawPoint(ctx, yOffset+step);
    
    var x = 4;
    var y = 0;
    var amplitude = 40;
    var frequency = 40;
    //ctx.moveTo(x, y);
    // ctx.moveTo(x, 50);
    while (x < width) {
        y = height/2 + amplitude * Math.sin((x+xOffset)/frequency);
        ctx.lineTo(x, y);
        x++;
        // console.log("x="+x+" y="+y);
    }
    ctx.stroke();
    ctx.save();

    // console.log("Drawing point at y=" + y);
    // drawPoint(ctx, y);
    ctx.stroke();
    // ctx.stroke();
    ctx.restore();
}

function draw() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, 500, 500);
    // showAxes(context);
    context.save();            
    
    plotSine(context, step, 100);
    context.restore();
    
    // Speed of animation
    step += 1.5; 

    window.requestAnimationFrame(draw);
}