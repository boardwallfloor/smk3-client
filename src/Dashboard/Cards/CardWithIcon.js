import React,{useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import CardIcon from './CardsIcon';


const useStyles = makeStyles({
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
    title: {},
});

const fetchData = async(resource) => {
    await fetch(`http://192.168.100.62:9000/${resource}`,{
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
            }).then(async (res) => {
                if (res.status < 200 || res.status >= 300){
                    throw new Error(res.statusText);
                }
                const result = await res.json();
                // console.log(result);
                return result;
            }).catch((err) => {
                console.log("Error")
                console.log(err)
            })
}

const CardWithIcon = (props) => {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        const resource = props.data;
        const fetchData = async () => {
            const result = await fetch(`http://192.168.100.62:9000/${resource}`)
            const json = await result.json();
            setData(json);
            console.log(json)
      }
    fetchData();
    console.log(data)
  }, []);
    return (
        <div className={classes.main}>
            <CardIcon Icon={props.icon} bgColor={props.bgcolor} />
            <Card className={classes.card}>
                <Typography className={classes.title} color="textSecondary">
                    {props.resource}
                </Typography>

                      {data.map(item => (
                         <Typography variant="subtitle1" gutterBottom >
                            {item.username}
                         </Typography>
                      ))}
            </Card>
        </div>
    );
};

export default CardWithIcon;

