// プレイヤーキャラクターの設定
var playerName = prompt("1文字");
var player = document.getElementById("player");
var stageElement = document.getElementById("stage");

// プレイヤーが1文字でない場合は再度入力を促す
while (playerName.length !== 1) {
  playerName = prompt("1文字");
}
player.innerHTML = playerName; // プレイヤーの表示名

// ステージのデータ（地面の位置: 1 = 地面、0 = 空）
var groundPositions = [];
var stageElements = "";
var stageLayout = [1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0]; // ステージ構造
var stageWidth = stageLayout.length * 64; // ステージの横幅

// ステージの表示
for (var i = 0; i < stageLayout.length; i++) {
  if (stageLayout[i] === 1) {
    stageElements += "<img src='ground.png' class='stage' style='left:" + i * 64 + "px; top: 416px;'>"; // 地面の位置
    groundPositions.push(i * 64, (i + 1) * 64); // 地面の範囲（左右端）を記録
  } else {
    stageElements += "<img src='sky.png' class='stage' style='left:" + i * 64 + "px; top: 352px;'>"; // 空の位置
  }
}
stageElement.innerHTML = stageElements; // ステージを描画

// プレイヤーの初期位置
player.style.left = "0px";
player.style.top = "352px"; // 初期のY座標（地面に合わせる）

// プレイヤーの動き
var playerMoveSpeed = 4; // プレイヤーの移動速度
var fallSpeed = 2; // 重力（落下速度）
var jumpSpeed = 20; // ジャンプの速度
var isPlayerJumping = false; // プレイヤーがジャンプしているかどうか

// プレイヤー移動関数
function movePlayer() {
  var playerXPosition = parseInt(player.style.left);
  var playerYPosition = parseInt(player.style.top);

  // プレイヤーが地面にいるか確認
  var onGround = false;
  for (var i = 0; i < groundPositions.length; i += 2) {
    if (playerXPosition >= groundPositions[i] && playerXPosition < groundPositions[i + 1]) {
      onGround = true;
      break;
    }
  }

  // プレイヤーが地面にいる場合、移動
  if (onGround) {
    player.style.left = playerXPosition + playerMoveSpeed + "px"; // 左から右へ移動
    if (!isPlayerJumping) {
      player.style.top = "352px"; // 地面にいる時はY位置をリセット
    }
  } else {
    player.style.top = playerYPosition + fallSpeed + "px"; // 空中では落下
  }

  // ジャンプ中であれば、上に移動
  if (isPlayerJumping) {
    player.style.top = playerYPosition - jumpSpeed + "px"; // 上方向に移動
    isPlayerJumping = false; // 1回ジャンプしたら、フラグをリセット
  }
}

// キー入力処理
document.addEventListener('keydown', function(e) {
  var playerXPosition = parseInt(player.style.left);
  var playerYPosition = parseInt(player.style.top);

  if (e.key === "ArrowRight") { // 右矢印キー
    player.style.left = playerXPosition + 5 + "px";
  }
  if (e.key === "ArrowLeft") { // 左矢印キー
    player.style.left = playerXPosition - 5 + "px";
  }

  if (e.key === " " && !isPlayerJumping) { // スペースキーでジャンプ
    isPlayerJumping = true; // ジャンプフラグを立てる
  }
});

// ゲームループ（60fpsでプレイヤーの移動を更新）
setInterval(movePlayer, 16); // 約60fpsでゲーム更新
