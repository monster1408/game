var name = prompt("1文字");
var player = document.getElementByid("player");
if (name.length == 1) {
  document.getElementByid("player").innerHTML = "a";
}

document.getElementById("player").innerHTML = name;
