// import firebase from "firebase";
let config = {
	apiKey: "AIzaSyC-iHjB9P17NdHiwd9iJyZ3gOUpOWU_tqc",
	authDomain: "ankigame2048.firebaseapp.com",
	databaseURL: "https://ankigame2048.firebaseio.com",
	projectId: "ankigame2048",
	storageBucket: "ankigame2048.appspot.com",
	messagingSenderId: "427007683779"
};

let defaultApp = firebase.initializeApp(config);
let defaultDb = defaultApp.database();

defaultDb.ref('/connection/users/').once('value', (snapshot) => {
	let n_users = 0;
	snapshot.forEach((childSnapshot) => {
		n_users++;
	});

	// let connection = document.getElementById("connectionGroup");
	// let l_users = document.createElement("span");
	// l_users.innerText = "" + n_users;
	// connection.append(l_users);
});

class Group{
	constructor(pathToGroup){
		this.path = pathToGroup;
		this.users = [];
	}
	updateUsers(callback) {
		defaultDb.ref(this.path).once('value', snapshot => {
			let users = [];
			snapshot.forEach(childSnapshot => {
				users.push(childSnapshot.key);
			});
			this.users = users;
			callback(); // Async process, do something once work is done
		});
	}
}

class User{
	constructor(pathToLogs, id){
		this.path = pathToLogs;
		this.id = id;
		this.logs = {};
	}
	updateLogs(callback){
		defaultDb.ref(this.path).once('value', logsSnapshot => {

			let logs = {};
			logsSnapshot.forEach(logTypeSnapshot => {

				logs[logTypeSnapshot.key] = 0;
				logTypeSnapshot.forEach(log => {

					if(log.hasChild("userId")) {

						let currentId = log.child("userId").val();
						if(currentId === this.id) {

							logs[logTypeSnapshot.key] += 1;
						}
					}
				})
			});
			this.logs = logs;
			callback();
		});
	}
}