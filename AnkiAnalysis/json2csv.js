"use strict";

let anki = require("./ankigame2048-export.json");
let fs = require('fs');

function retrieveUsers(path) {
	let properties = ["nickName", "points", "bestScore", "date", "time"];
	let users = [];
	let usersJson = anki;
	let pathBranches = path.split("/");
	for (let i = 0; i < pathBranches.length; i++) {
		usersJson = usersJson[pathBranches[i]];
	}

	let file_name = "data/" + path.replace(/\//g, "_") + ".csv";
	fs.writeFile(file_name, '', err => {
		if(err) throw err;
	});

	Object.keys(usersJson).map(function (key) {
		let currentUser = usersJson[key];
		let stringCsv = key + ",";
		for(const prop of properties){
			stringCsv += getProperty(currentUser, prop) + ",";
		}
		stringCsv = stringCsv.slice(0, -1);
		stringCsv += "\n";
		fs.appendFile(file_name, stringCsv, err => {
			if(err) throw err;
		});
	});
}

function getProperty(jsonObject, property) {
	if(jsonObject.hasOwnProperty(property)) {
		return jsonObject[property];
	}
	return "";
}

retrieveUsers("connection/users");
retrieveUsers("independent/users");
retrieveUsers("public/connection/users");
retrieveUsers("public/independent/users");

