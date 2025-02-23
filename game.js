var name = prompt("1文字");
var player = document.getElementById("player");
while (name.length !== 1) {
  name = prompt("1文字");
}
player.innerHTML = name;


