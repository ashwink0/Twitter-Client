import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
}));
const anchorText = 'This is a Twitter trends archiving system. You can search for trends from a specific date or location. Data collection is currently not being hosted. Example data is available for November 11, 2020.';

export default function Information() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div style={{position: 'fixed', left: '5px', top: '5px'}}>
			<Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick} startIcon={<HelpIcon/>}>
				Info
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				style={{width: '300px'}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Typography className={classes.typography}>{anchorText}</Typography>
			</Popover>
		</div>
	);
}
