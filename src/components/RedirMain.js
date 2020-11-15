import React from 'react'
import {Redirect} from "react-router-dom";

function RedirMain(){
	return(
		<Redirect to={"/"}/>
	);
}

export default RedirMain;
