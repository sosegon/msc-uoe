class Analysis extends React.Component {
	render() {
		return(
			<div>
				<BoardView name='AnkiGame study' path='/connection' />
				<BoardView name='AnkiPlay study' path='/independent' />
				<BoardView name='AnkiGame public' path='/public/connection' />
				<BoardView name='AnkiPlay public' path='/public/independent' />
			</div>
		);
	}
}
class BoardView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {group: new Group(props.path + "/users")};
		this.state.group.updateUsers(() => {
			this.setState({group: this.state.group});
		});
	}
	render() {
		let userElems = this.state.group.users
		.map(value => <UserView path={this.props.path} id={value} />);
		return (
			<div>
				<div>
					<span>{this.props.name}</span>
				</div>
				<div>
					<span>Number of users: </span>
					<span>{this.state.group.users.length}</span>
				</div>
				<div>{userElems}</div>
			</div>
		);
	}
}

class UserView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user: new User(props.path + "/logs", props.id)};
	}
	getLogs(){
		this.state.user.updateLogs(() => {
			this.setState({user: this.state.user});
			console.log("done");
		});
	}
	render(){
		console.log(this.state.user.logs);
		let logElems = Object.keys(this.state.user.logs).map((key, index) => {
			console.log(key);
			return(
				<LogView name={key} count={this.state.user.logs[key]} />
			);
		});
		console.log(logElems);
		return(
			<div>
				<span onClick={this.getLogs.bind(this)}>{this.props.id}</span>
				{logElems}
			</div>
		);
	}
}

class LogView extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
				<span>{this.props.name}</span>
				<span>{this.props.count}</span>
			</div>
		)
	}
}
ReactDOM.render(<Analysis />, document.getElementById('analysis'));
