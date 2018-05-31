// 创建画布
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// 背景图片
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// 角色图片
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// 怪物图片
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// 游戏对象
var hero = {
	speed: 256 // 每秒移动多少个像素
};
var monster = {};
var monstersCaught = 0;

// 处理用户的输入
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// 将英雄放到画布的中心
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// 随即怪物的位置
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// 更新游戏对象
var update = function (modifier) {
	if (38 in keysDown) { // 向上
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // 下
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // 左
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // 右
		hero.x += hero.speed * modifier;
	}

	// 是否碰到了
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// 渲染物体
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// 循环结构
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	//将他放到main函数里面
	requestAnimationFrame(main);
};

// 设置requestAnimationFrame()
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// 开始这个游戏
var then = Date.now();
reset();
main();
