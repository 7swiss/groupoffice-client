Date.prototype.toIntermeshApiFormat = function () {
	
	
	if (this.getHours() === 0 && this.getMinutes() === 0) {
		//when there's no time in the date we just want to send 2014-09-01 for example.
		return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
	} else
	{
		return this.toISOString();
	}
};


Date.INTERMESH_API_REGEX = /^(\d{4})-(\d\d)-(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;

Date.fromIntermeshApiFormat = function (string) {
	var match;

	if (match = string.match(Date.INTERMESH_API_REGEX)) {

		var date = new Date(),
				tzHour = 0,
				tzMin = 0,
				dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
				timeSetter = match[8] ? date.setUTCHours : date.setHours;
		if (match[9]) {
			tzHour = int(match[9] + match[10]);
			tzMin = int(match[9] + match[11]);
		}
		dateSetter.call(date, parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
		var h = parseInt(match[4] || 0) - tzHour;
		var m = parseInt(match[5] || 0) - tzMin;
		var s = parseInt(match[6] || 0);
		var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
		timeSetter.call(date, h, m, s, ms);
		return date;
	}
	
	return false;
};
