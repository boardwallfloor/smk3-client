import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

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
        minHeight: 52,
    },
    padding: {
        padding: 16,        
    },
    title: {},
    table: {
        width: '100%',
        padding: 0,
        // marginTop: 20,
  },
});

    const CardWithIcon = (props) => {
        const classes = useStyles();
        return (
        <div className={classes.main}>
            <CardIcon Icon={props.icon} bgColor={props.bgcolor} link={props.link}/>
            <Card className={classes.card}>
                <CardContent className={classes.padding}>
                    <Typography className={classes.title} color="textSecondary">
                        {props.name}
                    </Typography>
                    <Typography  variant="h4" component="h4">
                        {props.length}
                    </Typography>
                </CardContent>
                {props.data}
            </Card>
        </div>
    );
    };

export default CardWithIcon;

