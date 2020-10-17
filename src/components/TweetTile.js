import React from 'react';
import './Tile.css'

class TweetTile extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			text:"",
		}

	}
	componentDidMount() {
		this.setState({
			text: this.props.data.text,
		})
	}


	render() {
		return(
			<div className={'TweetTileContainer'}>
				<div className={'TweetTile'}>
					<div style={{padding: '20px'}}>
						<h1>{this.state.text}</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default TweetTile;
