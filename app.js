const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
	res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

	// Grabing the API from the url created from open weather map and postman.
	const query = req.body.cityName;
	const apiKey = "appid=a3940c9b16517022865a7a2a8f7810af";
	const units = "imperial";
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&"+ apiKey +"&units="+ units;
	https.get(url, function(response) {

		// This code grabs the status code of 200 from bunch of code.
		console.log(response.statusCode);


		// Converting the data to Javascript Data with JSON.parse
		response.on("data", function(data) {
			const weatherData = JSON.parse(data);

		// Making const to grab a specific data out of the converted javascript object data	
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;

		// Grabbing the image API url address	
			const weatherImage = weatherData.weather[0].icon;
			const imageURL = "http://openweathermap.org/img/wn/"+ weatherImage +"@2x.png";
			console.log(temp);
			console.log(weatherDescription);

		// Creating what the users view on the web page after input.	
			res.write("<p>The Weather is currently " + weatherDescription + "</p>")
			res.write("<h1>The tempature in "+ query +" is " + Math.round(temp) + " degrees Fahrenheit!</h1>");
			res.write("<img src=" + imageURL +">");
			res.send();

			// Converts a javascript object into a string
			// const object = {
			// 	name: "Byung",
			// 	favoritefood: "Ramen"
			// }
			// console.log(JSON.stringify(object));
		})
	});
})

	


app.listen(3000, function() {
	console.log("Server is running on port 3000.");
})