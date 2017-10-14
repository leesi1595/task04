//果实绘制
var fruitObj = function() {
	this.alive = [];  //是否存活，bool
	this.x = [];	
	this.y = [];	
	this.l = [];
	this.aneNO = [];
	this.s = [];	//上浮速度
	this.fruitType = [];
	this.f1 = new Image();
	this.f2 = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {  //果实数据初始化
	for(var i = 0;i<this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;
		this.s[i] = Math.random() * 0.017 + 0.003;
		fruit.fruitType[i] = "";
		this.born(i);
	}
	this.f1.src = './src/fruit.png';
	this.f2.src = './src/blue.png';
}
fruitObj.prototype.draw = function() {  //绘制
	var pic, NO = 0;
	for(var i = 0;i<this.num; i++) {
		if(this.alive[i]) {
			if(this.fruitType[i] == 'f2') {
				pic = this.f2;
			} else {
				pic = this.f1;
			}
			if(this.l[i] <= 16) {
				NO = this.aneNO[i];
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.l[i] += this.s[i] * deltaTime;
			} else {
				this.y[i] -= this.s[i] * 6 * deltaTime;
			}
			ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			if(this.y[i] < 10) {
				this.alive[i] = false;
			}
		}
	}
}
fruitObj.prototype.born = function(i) {  //果实产生
	var ran = Math.random();
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	if(ran < 0.2) {
		this.fruitType[i] = 'f2';
	} else {
		this.fruitType[i] = 'f1';
	}
}
fruitObj.prototype.dead = function(i) {
	this.alive[i] = false;
}
function fruitMonitor() {  //果实循环出现
	var aliveNum = 0;
	for(var i = 0; i < fruit.num; i++) {  //判断当前存活果实数
		if(fruit.alive[i]) {
			aliveNum++;
		}
		if(aliveNum < 15) {
			sendFruit();
			return;
		}
	}
}
function sendFruit() {  //判断果实池状态
	for(var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}