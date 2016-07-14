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
	
	function worker(subscriber) {
		
		var blob = new Blob(["onmessage = function(e){(" + subscriber.toString() + ")(e.data)};"], {type: 'application/javascript'});
		var URL = window.URL.createObjectURL(blob);
		
		return new Worker(URL);
	}
	
	eventBus.subscribe("first", function(currentEvent) {
									worker(firstSubscriberFunction)
										.postMessage(currentEvent);
								});

	eventBus.subscribe("second", function(currentEvent) {
									worker(secondSubscriberFunction)
										.postMessage(currentEvent);
								});
			
	for (var i = 0; i < 5; i++) {
		eventBus.post("first", "someData #" + i);
	}
	
})