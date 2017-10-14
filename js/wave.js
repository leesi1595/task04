//圆圈特效
var waveObj = function() {
	this.x = [];
	this.y = [];
	this.r = [];
	this.alive = [];
	this.type = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function() {  //圆圈数据初始化
	for(var i = 0; i<this.num; i++) {
		this.alive[i] = false;
		this.r[i] = 0;
		this.x[i] = 0;
		this.y[i] = 0;
		this.type[i] = 0;
	}
}
waveObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 5;
	ctx1.shadowColor = "white";
	for(var i = 0; i<this.num; i++) {
		if(this.alive[i]) {
			if(this.type[i] == 0) {  //判断是哪个圆圈特效
				this.r[i] += deltaTime * 0.02;
				if(this.r[i] > 50) {
					this.alive[i] = false;
					continue;
				}
				var alpha = 1 - this.r[i] / 50;
				ctx1.beginPath();
				ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
				ctx1.closePath();
				ctx1.strokeStyle = "rgba(255, 255, 255," + alpha + ")";
				ctx1.stroke();
			} else {
				this.r[i] += deltaTime * 0.05;
				if(this.r[i] > 100) {
					this.alive[i] = false;
					continue;
				}
				var alpha = 1 - this.r[i] / 100;
				ctx1.beginPath();
				ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
				ctx1.closePath();
				ctx1.strokeStyle = "rgba(203, 91, 0," + alpha + ")";
				ctx1.stroke();	
			}
		}
	}
	ctx1.restore();
}
waveObj.prototype.born = function(x, y, type) {
	for(var i = 0; i<this.num; i++) {
		if(!this.alive[i]) {
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i]= y;
			this.type[i] = type;
			return;
		}
	}
}