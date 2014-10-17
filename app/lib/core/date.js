Date.prototype.toIntermeshApiFormat = function(){	
	if (this.getUTCHours() === 0 && this.getUTCMinutes() === 0) {		
		//when there's no time in the date we just want to send 2014-09-01 for example.
		return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1) + "-" + this.getUTCDate();
	} else
	{
		return this.toISOString();
	}
};