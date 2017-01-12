var Express = require("express"); 
var Morgan = require("morgan"); 
var BodyParser = require("body-parser");
var MethodOverride = require("method-override"); 
var Restful = require("node-restful");
var Mongoose = Restful.mongoose; 
var App = Express(); 



Mongoose.connect("127.0.0.1:27017");

App.use(Express.static(__dirname + '/public')); 
App.use(Morgan("dev"));
App.use(BodyParser.urlencoded({'extended':'true'}));
App.use(BodyParser.json());
App.use(BodyParser.json({type:"application/vnd.api+json"}));
App.use(MethodOverride());

var Items = App.items =  Restful.model('Items', Mongoose.Schema({
	text: String
})).methods(['get', 'post', 'put', 'delete']);

Items.register(App, '/items');

App.get('*', function(request, response) {
	response.sendFile('.public/index.html');
})

App.listen(8000); 
console.log("App is up at localhost 8000");