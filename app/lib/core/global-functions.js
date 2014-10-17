intermesh = {
	isEmpty : function(v){
		return v === "" || 
				v === 0  ||
				v === null ||
				angular.isUndefined(v);
	}
};


GO.mail = {
		parseAddress : function(address){

		var parts = address.split('<');

		if(parts.length === 1){
			return {'display' : address, 'address': address};
		}else
		{
			return {
				'display' : parts[0].trim('"\' '), 
				'address': parts[1].trim('> ')
			};
		}
	}	
};