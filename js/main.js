var can1, can2, ctx1, ctx2;
var lastTime, deltaTime;
var bgPic = new Image();
var canWidth = 800, canHeight = 600;
var ane, fruit, bigFish, smallFish, data, wave, halo, dust;
var smallFishTail = [],  //小鱼图片数组
	smallFishEye = [],
	smallFishBody = [],
	bigFishTail = [],  //大鱼图片数组
	bigFishEye = [],
	bigFishBodyF1 = [],
	bigFishBodyF2 = [],
	dustPic = [];
var mx, my;  //鼠标位置

document.body.onload = game;

function game() {
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
	
}

function init() {	//初始化
	//获得canvas context	
	can1 = document.getElementById('canvas1');
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');
	ctx2 = can2.getContext('2d'); 
	
	//监听鼠标事件
	can1.addEventListener("mousemove", onMouseMove, false);
	
	//背景图
	bgPic.src = "./src/background.jpg";
	
	//获取对象并初始化
	ane= new aneObj();
	ane.init();
	fruit= new fruitObj();
	fruit.init();
	bigFish = new bigFishObj();
	bigFish.init();
	smallFish = new smallFishObj();
	smallFish.init();
	data= new dataObj();
	wave = new waveObj();
	wave.init();
	dust = new dustObj();
	dust.init();
	
	mx = bigFish.x;
	my = bigFish.y;

	for(var i = 0; i < 8; i++) {  //初始化小鱼尾巴动画图片
		smallFishTail[i] = new Image();
		smallFishTail[i].src = "./src/babyTail" + i + ".png";
	}
	for(var i = 0; i < 2; i++) {  //初始化小鱼眼睛动画图片
		smallFishEye[i] = new Image();
		smallFishEye[i].src = "./src/babyEye" + i + ".png";
	}
	for(var i = 0; i < 20; i++) {  //初始化小鱼身体变白动画图片
		smallFishBody[i] = new Image();
		smallFishBody[i].src = "./src/babyFade" + i + ".png";
	}

	for(var i = 0; i < 8; i++) {  //初始化大鱼尾巴动画图片
		bigFishTail[i] = new Image();
		bigFishTail[i].src = "./src/bigTail" + i + ".png";
	}
	for(var i = 0; i < 2; i++) {  //初始化大鱼眼睛动画图片
		bigFishEye[i] = new Image();
		bigFishEye[i].src = "./src/bigEye" + i + ".png";
	}
	for(var i = 0; i < 8; i++) {  //初始化大鱼身体动画图片
		bigFishBodyF1[i] = new Image();
		bigFishBodyF2[i] = new Image();
		bigFishBodyF1[i].src = "./src/bigSwim" + i + ".png";
		bigFishBodyF2[i].src = "./src/bigSwimBlue" + i + ".png";
	}
	for(var i = 0; i <7; i++) {  //初始化漂浮物图片
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}

	//得分面板字体、大小
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";
}

function gameloop() {  //循环
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	if(deltaTime > 40) {  //让两帧间时间最大为40，避免浏览器切换标签时果实过大
		deltaTime = 40;
	}
	lastTime = now;

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0, 0, canWidth, canHeight);
	bigFish.draw();
	smallFish.draw();
	collision();
	collision2();
	data.draw();
	wave.draw();
	dust.draw();
}

function drawBackground() {  //绘制背景
		ctx2.drawImage(bgPic, 0, 0, canWidth, canHeight);
}
function onMouseMove(e) {  //获得鼠标位置
	if(!data.gameOver) {
		if(e.offsetX || e.layerX) {
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;	
		}
	}
	
}

function collision() {  //判断大鱼是否吃到果实
	if(data.gameOver) {
		return;
	} else {
		for(var i = 0; i<fruit.num; i++) {
			if(fruit.alive[i]){
				var l = calLength2(fruit.x[i], fruit.y[i], bigFish.x, bigFish.y);
				if(l < 900) {
					fruit.dead(i);
					data.fruitNum++;
					bigFish.bigBodyCount++;
					if(bigFish.bigBodyCount >= 7) {
						bigFish.bigBodyCount = 7;
					}
					if(fruit.fruitType[i] == "f2") {  //蓝色果实分数加倍
						data.double = 2;
					}
					wave.born(fruit.x[i], fruit.y[i], 0);
				}
			}
		}
	}
}

function collision2() {  //判断大鱼是否给小鱼喂食
	if(data.fruitNum > 0 && !data.gameOver) {  
		var l = calLength2(bigFish.x, bigFish.y, smallFish.x, smallFish.y);
		if (l < 900) {
			//小鱼恢复状态
			smallFish.smallBodyCount = 0;
			//大鱼身体恢复
			bigFish.bigBodyCount = 0;
			//加分
			data.addScore();

			wave.born(smallFish.x, smallFish.y, 1);
		}
	}
	
}