import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { formatPrice } from '../../../utilities/index';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 300,
        },
        cardContentRoot: {
            minHeight: 72
        },
        media: {
            width: 300,
            height: 200,
            objectFit: 'cover'
        },
        price: {
            marginLeft: 'auto',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

interface IProps {
    name: string
    description: string
    imgUrl: string
    price: number
    date: string
    abbrev: string
}

const MenuCard: React.FC<IProps> = ({
    name, description, imgUrl, price, date, abbrev
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {abbrev.toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={date}
            />
            <CardMedia
                className={classes.media}
                component="img"
                image={imgUrl}
                title={name}
            />
            <CardContent className={classes.cardContentRoot}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Typography
                    className={classes.price}
                    variant="h5"
                    color="secondary"
                >
                    ${formatPrice(price)}
                </Typography>
            </CardActions>
        </Card>
    );
};

export default MenuCard;