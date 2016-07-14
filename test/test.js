define = require('node-requirejs-define');

var EventBus = require('../scripts/eventBus');

var eventBus = new EventBus();

var firstSubscriberExpectedEvent = "firstData";
var secondSubscriberExpectedEvent = "secondData";

var firstEventDelivered = false;
var secondEventDelivered = false;
		
var firstSubscriber = function(currentEvent) {
	
	firstEventDelivered = (currentEvent == firstSubscriberExpectedEvent);
	
	console.log(currentEvent + " from f1()");
}

var secondSubscriber = function(currentEvent) {
	
	secondEventDelivered = (currentEvent == secondSubscriberExpectedEvent);

	console.log(currentEvent + " from f2()");
}

eventBus.subscribe("first", firstSubscriber);
eventBus.subscribe("second", secondSubscriber);

eventBus.post("second", "secondData");
eventBus.post("first", "firstData");

//

var test = require('unit.js');

describe('Testing event bus functionality', function(){
	
	it('Event bus successfully created', function(){
		setTimeout(function(){
			test
			.object(eventBus)
				.isNotEmpty()
				.hasProperty("subscribe")
				.hasProperty("post");			
		}, 2000);
    });
	
	it('First event subscribed', function(){
		setTimeout(function(){
			test
				.bool(firstEventDelivered)
					.isTrue();			
		}, 2000);
	  
	});
	
	it('Second event subscribed', function(){
		setTimeout(function(){
			test
				.bool(secondEventDelivered)
					.isTrue();			
		}, 2000);
	});
});