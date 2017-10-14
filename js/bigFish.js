//大鱼绘制
var bigFishObj = function() {
	this.x;
	this.y;
	this.angle;
	//尾巴计时器、计数器
	this.bigTailTimer = 0;
	this.bigTailCount = 0;
	//眼睛计时器、计数器、时间间隔
	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;
	//身体计数器
	this.bigBodyCount = 0;
}
bigFishObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}
bigFishObj.prototype.draw = function() {
	//大鱼趋向鼠标移动
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	//大鱼角度趋向鼠标
	var deltaY = this.y - my,
		deltaX = this.x -mx,
		beta = Math.atan2(deltaY, deltaX);	//-PI ~ PI
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//大鱼尾巴动画
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 150) {
		this.bigTailCount = (this.bigTailCount + 1) % 8;  //0~7
		this.bigTailTimer %= 50;
	}
	//大鱼眨眼
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval) {
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;  //0~1
		this.bigEyeTimer %= this.bigEyeInterval;
		if(this.bigEyeCount == 0) {
			this.bigEyeInterval = Math.random() * 1500 + 2000;
		} else {
			this.bigEyeInterval = 200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	var bigBodyCount = this.bigBodyCount,
		bigTailCount = this.bigTailCount,
		bigEyeCount = this.bigEyeCount;
		
	if(data.double == 1) {
	 	ctx1.drawImage(bigFishBodyF1[bigBodyCount], -bigFishBodyF1[bigBodyCount].width * 0.5, -bigFishBodyF1[bigBodyCount].height * 0.5);
		
	} else {
		ctx1.drawImage(bigFishBodyF2[bigBodyCount], -bigFishBodyF2[bigBodyCount].width * 0.5, -bigFishBodyF2[bigBodyCount].height * 0.5);
	}
	ctx1.drawImage(bigFishTail[bigTailCount], -bigFishTail[bigTailCount].width * 0.5 + 23, -bigFishTail[bigTailCount].height * 0.5);
	
	ctx1.drawImage(bigFishEye[bigEyeCount], -bigFishEye[bigEyeCount].width * 0.5, -bigFishEye[bigEyeCount].height * 0.5);
	ctx1.restore();
}