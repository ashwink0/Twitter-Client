import React from 'react'
import './Tile.css'
class Searchbar extends React.Component{
	render(){
		return(
			<div className={'SearchbarDiv'}>
				<input type={'text'} placeholder={'Enter a username'} className={'Searchbar'}/>
				<input type={'submit'} className={'SubmitTile'}/>
			</div>
		);
	}
}

export default Searchbar;
