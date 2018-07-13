"use strict";

let anki = require("./ankigame2048-export.json");
let fs = require('fs');

function retrieveUsers(path, properties) {
	let objectsJson = anki;
	let pathBranches = path.split("/");
	for (let i = 0; i < pathBranches.length; i++) {
		objectsJson = objectsJson[pathBranches[i]];
	}

	let file_name = "data/" + path.replace(/\//g, "_") + ".csv";
	fs.writeFile(file_name, '', err => {
		if(err) throw err;
	});
	let out = fs.createWriteStream(file_name, {flags: 'a'});

	Object.keys(objectsJson).map(function (key) {
		let currentUser = objectsJson[key];
		let stringCsv = key + ",";
		for(const prop of properties){
			stringCsv += getProperty(currentUser, prop) + ",";
		}
		stringCsv = stringCsv.slice(0, -1);
		stringCsv += "\n";
		out.write(stringCsv, 'utf-8');
		fs.appendFile(file_name, stringCsv, err => {
			if(err) throw err;
		});
	});
}

function retrieveLogs(path, properties) {
	let objectsJson = anki;
	let pathBranches = path.split("/");
	for (let i = 0; i < pathBranches.length; i++) {
		objectsJson = objectsJson[pathBranches[i]];
	}

	let file_name = "data/" + path.replace(/\//g, "_") + ".csv";
	fs.writeFile(file_name, '', err => {
		if(err) throw err;
	});
	let out = fs.createWriteStream(file_name, {flags: 'a'});

	Object.keys(objectsJson).map(key => {
		let currentLogType = objectsJson[key];
		Object.keys(currentLogType).map(key2 => {
			let currentLog = currentLogType[key2]
			let stringCsv = key2 + ",";
			for(const prop of properties){
				stringCsv += getProperty(currentLog, prop) + ",";
			}
			stringCsv = stringCsv.slice(0, -1);
			stringCsv += "\n";
			out.write(stringCsv, 'utf-8');
			// fs.appendFile(file_name, stringCsv, err => {
			// 	if(err) throw err;
			// });
		});
	});
}

function getProperty(jsonObject, property) {
	if(jsonObject.hasOwnProperty(property)) {
		return jsonObject[property];
	}
	return "";
}

let userProperties = ["nickName", "points", "bestScore", "date", "time"];
retrieveUsers("connection/users", userProperties);
retrieveUsers("independent/users", userProperties);
retrieveUsers("public/connection/users", userProperties);
retrieveUsers("public/independent/users", userProperties);

// let logProperties = ["cardAnswer", "cardEase", "cardInfo", "coinsInCard",
// "deckInfo", "dueDeckInfo", "earnedCoins", "earnedPoints", "elapsedTime",
// "favCard", "isFavCard", "logType", "pointsInCard", "totalCoins", "totalPoints",
// "userId", "date", "time"];
let logProperties = ["cardEase", "coinsInCard","earnedCoins", "earnedPoints", "elapsedTime",
"favCard", "isFavCard", "logType", "pointsInCard", "totalCoins", "totalPoints",
"userId", "date", "time"];
retrieveLogs("connection/logs", logProperties);
retrieveLogs("independent/logs", logProperties);
retrieveLogs("public/connection/logs", logProperties);
retrieveLogs("public/independent/logs", logProperties);