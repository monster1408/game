var name = prompt("1文字");
var player = document.getElementById("player");
while (name.length !== 1) {
  name = prompt("1文字");
}
player.innerHTML = name;

var stage = [0,1,0,1,1,0,0,1];
for (var i = 0;  i < stage.length; i++) {
  stage = stage.replace(/1/,g,地面.png);
  document.write("<img id="+i+" class="stage" src="+stage+">");
}
