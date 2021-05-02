import React ,{useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';

import CardWithIcon from '../CardWithIcon';

const useStyles = makeStyles({
    table: {
        width: '100%',
        padding: 0,
        // marginTop: 20,
  	},
  	bold: {
  		fontWeight: 'bold',
  	}
});

const UserTable = (props) => {

    const classes = useStyles();
    
	return (
		<Table className={classes.table} size="small" aria-label="simple table">
	        <TableHead>
          		<TableRow>
		            <TableCell className={classes.bold}>Nama</TableCell>
		            <TableCell className={classes.bold}>Username</TableCell>
	          	</TableRow>
	        </TableHead>
	        <TableBody>
	          	{props.data.map(item => (
	            	<TableRow key={item._id}>
	              	<TableCell component="th" scope="item">
	                	{item.full_name}
	              	</TableCell>
	              	<TableCell component="th" scope="item">
	                	{item.username}
	              	</TableCell>
	            	</TableRow>
	          	))}
	        </TableBody>
	    </Table>
		)
}

export const UserCard = () => {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);

    useEffect(() => {
        const resource = "user"
        const fetchData = async () => {
            //Remember to Populate in Backend
            const result = await fetch(`${process.env.REACT_APP_API_LINK}/${resource}/db`)
            const json = await result.json();
            console.log(json)
            setData(json.data);
            setCount(json.count);
      }
    fetchData();
  	}, []);
	return (
		<CardWithIcon icon={GroupIcon} link="#/user" bgcolor="#f44336" name="User" data={<UserTable data={data}/>} length={count}/>
		)
}