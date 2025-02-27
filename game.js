// ゲームオーバー関数
function gameOver() {
  alert("ゲームオーバー！ プレイヤーが空中に浮いてしまいました。");
  // ゲームオーバー時の処理（例: プレイヤーを停止、リセットなど）
  player.style.left = "0px"; // プレイヤーを初期位置に戻す
  player.style.top = "352px"; // プレイヤーを地面に戻す
  playerXPosition = 0; // X座標リセット
  playerYPosition = 480; // Y座標リセット
  isPlayerJumping = false; // ジャンプ状態リセット
  jumpHeight = 0; // ジャンプの高さリセット
}

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
    stageElements += "<img src='地面.png' class='stage' style='left:" + i * 64 + "px; top: 560px;'>"; // 地面の位置
    groundPositions.push(i * 64, (i + 1) * 64); // 地面の範囲（左右端）を記録
  } else {
    stageElements += "<img src='空.png' class='stage' style='left:" + i * 64 + "px; top: 560px;'>"; // 空の位置
  }
}
stageElement.innerHTML = stageElements; // ステージを描画

// プレイヤーの初期位置
player.style.left = "0px";
player.style.top = "480px"; // 初期のY座標（地面に合わせる）

// プレイヤーの動き
var playerMoveSpeed = 4; // プレイヤーの移動速度
var fallSpeed = 2; // 重力（落下速度）
var jumpSpeed = 1; // ジャンプの速度
var isPlayerJumping = false; // プレイヤーがジャンプしているかどうか
var playerXPosition = 0; // プレイヤーのX座標
var playerYPosition = 480; // プレイヤーのY座標（地面の位置）
var jumpHeight = 0; // ジャンプの高さ

// プレイヤー移動関数
function movePlayer() {
  // プレイヤーが地面にいるか確認
  var onGround = false;

  // プレイヤーが地面にいるか、空にいるかチェック
  for (var i = 0; i < groundPositions.length; i += 2) {
    if (playerXPosition >= groundPositions[i] && playerXPosition < groundPositions[i + 1]) {
      onGround = true;
      break;
    }
  }

  // プレイヤーが空の位置以下にいる場合はゲームオーバー
  if (playerYPosition > 560 && !onGround) {
    gameOver(); // ゲームオーバー関数を呼び出し
    return; // ゲームオーバーになったので、以下の処理は実行しない
  }

  // プレイヤーが地面にいる場合、移動
  if (onGround) {
    player.style.left = playerXPosition + "px"; // プレイヤーX位置の更新
    if (!isPlayerJumping) {
      player.style.top = "480px"; // 地面にいる時はY位置をリセット
      playerYPosition = 480; // Y座標もリセット
    }
  } else {
    // ジャンプ中や空中では落下
    player.style.top = playerYPosition + fallSpeed + "px"; // 空中では落下
    playerYPosition += fallSpeed; // 空中でのY座標更新
  }

  // ジャンプ中であれば、上に移動
  if (isPlayerJumping && playerYPosition > 480 - 40) { // 高さが40ピクセルを超えたら上昇を止める
    player.style.top = playerYPosition - jumpSpeed + "px"; // 上に移動
    playerYPosition -= jumpSpeed; // プレイヤーを上に移動
  }

  // ジャンプ終了処理
  if (playerYPosition <= 480 - 40) { // 高さが40ピクセル以下でジャンプ終了
    isPlayerJumping = false; // ジャンプフラグをリセット
  }
}

// キー入力処理
document.addEventListener('keydown', function(e) {
  if (e.key === "ArrowRight") { // 右矢印キー
    playerXPosition += playerMoveSpeed; // 右に移動
    player.style.left = playerXPosition + "px";
  }
  if (e.key === "ArrowLeft") { // 左矢印キー
    playerXPosition -= playerMoveSpeed; // 左に移動
    player.style.left = playerXPosition + "px";
  }

  if (e.key === " " && !isPlayerJumping) { // スペースキーでジャンプ
    isPlayerJumping = true; // ジャンプフラグを立てる
  }
});

// ゲームループ（60fpsでプレイヤーの移動を更新）
setInterval(movePlayer, 16); // 約60fpsでゲーム更新
