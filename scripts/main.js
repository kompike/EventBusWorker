require(['eventbus'], function(EventBus){
	
	var eventBus = new EventBus;
	
	var firstSubscriberFunction = function(currentEvent) {
		
		var result = 0;
		
		for(var i = 0; i < 1000000; i++) {
			result += Math.random();
			
			if (i % 3 == 0) {
				result = result / Math.random();
			}
		}
		
		console.log(currentEvent + " from f1()");
	}
	
	var secondSubscriberFunction = function(currentEvent) {
	
		console.log(currentEvent + " from f2()");
	}
	
	eventBus.subscribe("first", firstSubscriberFunction);

	eventBus.subscribe("second", secondSubscriberFunction);
			
	for (var i = 0; i < 5; i++) {
		eventBus.post("first", "someData #" + i);
	}
	
})