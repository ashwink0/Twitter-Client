import React, {useState} from 'react';
import DatePicker from 'react-date-picker';

const MyApp = (props) => {
	const [value, changeDate] = useState(new Date());

	return (
		<div style={{backgroundColor: 'grey', margin: '20px'}}>
			<DatePicker
				onChange={(value) => {
					if(value !== null){
						props.dateChange(value)
						changeDate(value)
					}
					else{
						props.dateChange(new Date())
						changeDate(new Date())
					}
				}}
				value={value}
			/>
		</div>
	);
}


export default MyApp;
