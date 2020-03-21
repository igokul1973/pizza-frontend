import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles(theme => ({
    galleryItemRoot: {
        overflow: 'hidden',
        outline: 0,
        marginTop: '-2rem',
        marginBottom: '2rem',
        marginLeft: '-2rem',
        marginRight: '-2rem',
    },
    img: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    imgRoot: {
        outline: 0,
        height: 600,
        overflow: 'hidden'
    }
}));

export interface IGalleryItem {
    src: string
    index: number
}

interface IProps {
    galleryItems: IGalleryItem[]
}

const ImageGallery: React.FC<IProps> = ({ galleryItems }) => {
    const classes = useStyles();

    const settings = {
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 2500,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <div className={classes.galleryItemRoot}>
            <Slider {...settings}>
                {galleryItems.map(item => {
                    return (
                        <div key={item.index} className={classes.imgRoot}>
                            <img className={classes.img} alt={''} src={item.src} />
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
};

export default ImageGallery;