function getCursorPosition(e)
{
  e = e || window.event;
  if (e)
  {
    if (e.pageX || e.pageX == 0) return [e.pageX,e.pageY];
    var dE = document.documentElement || {};
    var dB = document.body || {};
    if ((e.clientX || e.clientX == 0) && ((dB.scrollLeft || dB.scrollLeft == 0) || (dE.clientLeft || dE.clientLeft == 0))) return [e.clientX + (dE.scrollLeft || dB.scrollLeft || 0) - (dE.clientLeft || 0),e.clientY + (dE.scrollTop || dB.scrollTop || 0) - (dE.clientTop || 0)];
  }
  return null;
}

function mousedown(e)
{
  var mxy = getCursorPosition(e);
  var box = document.getElementById("sel_box");
  box.orig_x = mxy[0];
  box.orig_y = mxy[1];
  box.style.left = mxy[0]+"px";
  box.style.top = mxy[1]+"px";
  box.style.display = "block";
  document.onmousemove = mousemove;
  document.onmouseup = mouseup;
}

function mousemove(e)
{
  var mxy = getCursorPosition(e);
  var box = document.getElementById("sel_box");
  if(mxy[0]-box.orig_x<0){
    box.style.left = mxy[0]+"px";

  }
  if(mxy[1]-box.orig_y<0){
    box.style.top = mxy[1]+"px";
  }
  box.style.width = Math.abs(mxy[0]-box.orig_x)+"px";
  box.style.height = Math.abs(mxy[1]-box.orig_y)+"px";
}

function mouseup(e)
{
  var box = document.getElementById("sel_box");
  box.style.display = "none";
  box.style.width = "0";
  box.style.height = "0";
  document.onmousemove = function(){};
  document.onmouseup = function(){};
}

document.onmousedown = mousedown;
