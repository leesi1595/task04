//小鱼绘制
var smallFishObj = function() {
	this.x;
	this.y;
	this.angle;
	//尾巴计时器、计数器
	this.smallTailTimer = 0;
	this.smallTailCount = 0;
	//眼睛计时器、计数器、时间间隔
	this.smallEyeTimer = 0;
	this.smallEyeCount = 0;
	this.smallEyeInterval = 1000;
	//身体计时器、计数器
	this.smallBodyTimer = 0;
	this.smallBodyCount = 0;
}
smallFishObj.prototype.init = function() {
	this.x = canWidth * 0.5 ;
	this.y = canHeight *0.5 ;
	this.angle = 0;
}
smallFishObj.prototype.draw = function() {
	//小鱼趋向大鱼移动
	this.x = lerpDistance(bigFish.x, this.x, 0.98);
	this.y = lerpDistance(bigFish.y, this.y, 0.98);

	//小鱼角度趋向大鱼
	var deltaY = this.y - bigFish.y,
		deltaX = this.x -bigFish.x,
		beta = Math.atan2(deltaY, deltaX);	//-PI ~ PI
	this.angle = lerpAngle(beta, this.angle, 0.5);

	//小鱼尾巴动画
	this.smallTailTimer += deltaTime;
	if(this.smallTailTimer > 150) {
		this.smallTailCount = (this.smallTailCount + 1) % 8;  //0~7
		this.smallTailTimer %= 50;
	}
	//小鱼眨眼
	this.smallEyeTimer += deltaTime;
	if(this.smallEyeTimer > this.smallEyeInterval) {
		this.smallEyeCount = (this.smallEyeCount + 1) % 2;  //0~1
		this.smallEyeTimer %= this.smallEyeInterval;
		if(this.smallEyeCount == 0) {
			this.smallEyeInterval = Math.random() * 1500 + 2000;
		} else {
			this.smallEyeInterval = 200;
		}
	}
	//小鱼身体动画
	this.smallBodyTimer += deltaTime;
	if(this.smallBodyTimer > 500) {  //小鱼身体变白时间
		this.smallBodyCount = this.smallBodyCount + 1;
		this.smallBodyTimer %= 500;
		if(smallBodyCount >= 19) {
			this.smallBodyCount = 19;
			//game over
			data.gameOver = true;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	var smallTailCount = this.smallTailCount,
		smallEyeCount = this.smallEyeCount
		smallBodyCount = this.smallBodyCount;
	ctx1.drawImage(smallFishTail[smallTailCount], -smallFishTail[smallTailCount].width * 0.5 + 23, -smallFishTail[smallTailCount].height * 0.5);
	ctx1.drawImage(smallFishBody[smallBodyCount], -smallFishBody[smallBodyCount].width * 0.5, -smallFishBody[smallBodyCount].height * 0.5);
	ctx1.drawImage(smallFishEye[smallEyeCount], -smallFishEye[smallEyeCount].width * 0.5, -smallFishEye[smallEyeCount].height * 0.5);
	ctx1.restore();
}