import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';

class SkeletonTrendTile extends React.Component{
	render() {
		return (
			<div className={'TrendTileContainer'}>
					<div className={'TrendTile'}>
						<div style={{ padding: '20px' }}>
							<Skeleton animation="wave" height={50} style={{width: '100%'}}/>
							<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
								<Skeleton animation="wave" width={250} height={50}/>
							</div>
						</div>
					</div>
			</div>
		);
	}
}

export default SkeletonTrendTile;
