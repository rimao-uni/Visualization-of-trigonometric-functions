var cw, ch;
  var xmin, xmax, ymin, ymax;
  var canvas, ctx;
  var canvasImageData;

function Canvas(canvasname, backcolor) {

    canvas = document.getElementById(canvasname);
    if ( ! canvas || ! canvas.getContext ) {
      return false;
    }

    ctx = canvas.getContext('2d');
    ctx.fillStyle = backcolor;
    ctx.beginPath();
    ctx.fillRect(0,0,cw,ch);
    ctx.stroke();
}
function drawLine(x0,y0, x1,y1, linecolor,linewidth, dash) {
    var cx0,cy0,cx1,cy1;
    cx0 = Math.round((x0-xmin)/(xmax-xmin)*cw);
    cy0 = Math.round((ymax-y0)/(ymax-ymin)*ch);
    cx1 = Math.round((x1-xmin)/(xmax-xmin)*cw);
    cy1 = Math.round((ymax-y1)/(ymax-ymin)*ch);
    ctx.strokeStyle = linecolor;
    ctx.lineWidth = linewidth;
    if (dash !== undefined) ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(cx0,cy0);
    ctx.lineTo(cx1,cy1);
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([]);
}
function graph() {
    var f, x,y, x0,y0, dx, interval;
    f = document.iform.f.value;
    xmin = eval(document.iform.xmin.value);
    xmax = eval(document.iform.xmax.value);
    ymin = eval(document.iform.ymin.value);
    ymax = eval(document.iform.ymax.value);
    interval = eval(document.iform.interval.value);
    // ＸＹ座標軸の設定
    cw = 700;  ch = 220;
    Canvas("canvas1", "White");
    drawLine(xmin,0, xmax,0, "Black", 1);
    drawLine(0,ymin, 0,ymax, "Black", 1);

    dx = Math.PI/180*3;
    x = xmin;
    x0 = x;
    y0 = eval(f);

    x = xmin;
    x0 = x;
    y0 = eval(f);

    var timerId = setInterval(function(){
        x = x + dx;
        if(x>xmax) clearInterval(timerId);
        y = eval(f);
        drawLine(x0,y0, x,y, "Black", 2);
        x0 = x;
        y0 = y;
    }, interval);
}
