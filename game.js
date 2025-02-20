var name = prompt("1文字");
var player = document.getElementByid("player");
if (playerName && playerName.length === 1) {
  player.innerHTML = "a";
} else {
  player.innerHTML = playerName;
}
