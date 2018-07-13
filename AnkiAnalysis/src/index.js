class Group{
	constructor(pathToGroup){
		this.path = pathToGroup;
		this.users = [];
	}
	updateUsers(callback) {
		let xhr = new XMLHttpRequest();
		var self = this;
		xhr.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		    	let users = [];
		        let usersJson = JSON.parse(this.responseText);
		        let pathBranches = self.path.split("/");
		        for(let i=0; i<pathBranches.length; i++){
		        	usersJson = usersJson[pathBranches[i]];
		        }
		        Object.keys(usersJson).map(key => {
		        	users.push(key);
		        });
		        self.users = users;
		        callback();
		    }
		};
		xhr.open("GET", "ankigame2048-export.json", true);
		xhr.send();
	}
}

class User{
	constructor(pathToLogs, id){
		this.path = pathToLogs;
		this.id = id;
		this.logs = {};
	}
	updateLogs(callback){

		let xhr = new XMLHttpRequest();
		var self = this;
		xhr.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		    	let logs = {};
		        let logsJson = JSON.parse(this.responseText);
		        let pathBranches = self.path.split("/");
		        for(let i=0; i<pathBranches.length; i++){
		        	logsJson = logsJson[pathBranches[i]];
		        }
		        Object.keys(logsJson).map(key => {
		        	let currentLogType = logsJson[key];
		        	logs[key] = 0;
		        	Object.keys(currentLogType).map(key2 => {
			        	let currentLog = currentLogType[key2];
			        	if(currentLog.hasOwnProperty("userId")) {
				        	let userId = currentLog["userId"];
				        	if(userId === self.id) {
					        	logs[key] += 1;
				        	}
			        	}
		        	});
		        });
		        self.logs = logs;
		        callback();
		    }
		};
		xhr.open("GET", "ankigame2048-export.json", true);
		xhr.send();
	}
}