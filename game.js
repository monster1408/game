var name = prompt("1文字");
var player = document.getElementById("player");
var stageElement = document.getElementById("stage");
while (name.length !== 1) {
  name = prompt("1文字");
}
player.innerHTML=name;
var hit = [];
var imgName="";
var stage = [1,1,0,1,1,0,0,0,1,1,0,0];
for (var i = 0; i < stage.length; i++) {
  if (stage[i] === 1) {
    imgName += "<img src='地面.png' class='stage'>";  // 1の場合、地面画像
    hit.push(i*64,(i+1)*64);
  } else {
    imgName += "<img src='空.png' class='stage'>";  // 0の場合、空画像
  }
}
stageElement.innerHTML=imgName

function playermove(){
    for(i=0; i<hit.length; i++)
    if (parseInt(player.style.left) < hit[i*2] && parseInt(player.style.left) > hit[i*2+1]){
      player.style.left= parseInt(player.style.left)+1;
    }
}
