var name = prompt("1文字");
var player = document.getElementById("player");
var stageElement = document.getElementById("stage");
while (name.length !== 1) {
  name = prompt("1文字");
}
player.innerHTML=name;

var imgName="";
var stage = [0,1,0,1,1,0,0,1];
for (var i = 0; i < stage.length; i++) {
  if (stage[i] === 1) {
    imgName += "<img src='地面.png' class='stage'>";  // 1の場合、地面画像
  } else {
    imgName += "<img src='空.png' class='stage'>";  // 0の場合、空画像
  }
}
stageElement.innerHTML=imgName





