function check(input) {
  const certIDs = ['12345678', '12345678'];
  if (certIDs.includes(input)) {
    alert('This Certification is valid, show it off!');
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