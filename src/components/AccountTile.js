import React from 'react';
import verified from '../assets/verified_badge.svg'
import './Tile.css'

class AccountTile extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<div className={'AccountTile'}>
					<img src={this.props.data.profile_image_url} className={'AccountTileUserImage'}/>
					<h1>{this.props.data.name}</h1>
					{this.props.data.verified ? <img src={verified} className={'VerifiedImage'}/> : <div/>}
				</div>
				<p style={{margin: '0px'}}>@{this.props.data.screen_name}</p>
				<p style={{margin: '0px'}}>{this.props.data.description}</p>
			</div>
		);
	}
}

export default AccountTile;
