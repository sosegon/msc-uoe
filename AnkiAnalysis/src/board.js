class Analysis extends React.Component {
	render() {
		return(
			<div>
				<BoardView name='AnkiGame study' path='/connection/users/' />
				<BoardView name='AnkiPlay study' path='/independent/users/' />
				<BoardView name='AnkiGame public' path='/public/connection/users/' />
				<BoardView name='AnkiPlay public' path='/public/independent/users/' />
			</div>
		);
	}
}
class BoardView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {group: new Group(props.path)};
		this.state.group.updateNumberOfUsers(() => {
			this.setState({group: this.state.group});
		});
	}
	render() {
		let n_users = this.state.group.n_users;
		return (
			<div>
				<div>
					<span>{this.props.name}</span>
				</div>
				<div>
					<span>Number of users: </span>
					<span>{n_users}</span>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Analysis />, document.getElementById('analysis'));
