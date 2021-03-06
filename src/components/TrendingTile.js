import React from 'react';

class TrendingTile extends React.Component{

	render() {
		return (
			<div className={'TrendTileContainer'}>
				<a href={this.props.data.url} className="AnchorTrend">
					<div className={'TrendTile'}>
						<div style={{padding: '20px', wordWrap: 'break-word'}}>
							<h1>{this.props.data.name}</h1>
							{this.props.data.tweet_volume != null ? <h3>Tweet Volume: {this.props.data.tweet_volume}</h3> : <div/>}
						</div>
					</div>
				</a>
			</div>
		);
	}
}

export default TrendingTile;
