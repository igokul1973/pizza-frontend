import React from 'react';
import { Typography } from '@material-ui/core';

const AboutUs: React.FC<{}> = () => {
    return (
        <div className="about-us-component">
            <Typography variant="h1">
                About Us
            </Typography>
            <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, corporis atque? Voluptas unde eos rem quasi quia.
                Illum, quam minima corrupti quibusdam delectus maiores est odio ad tenetur odit impedit.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima dolor possimus eveniet temporibus delectus corporis,
                illum eaque omnis nemo ea sequi quia? Quod minima harum possimus excepturi saepe placeat molestiae!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sed cupiditate minima esse error harum
                veniam similique rem ipsa incidunt commodi vitae, provident non quia id, quo voluptatum adipisci accusamus?
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae doloremque hic fugiat sit suscipit deleniti
                delectus! Perferendis assumenda provident asperiores veritatis dolore incidunt quisquam nihil quos,
                debitis libero veniam magni?
            </Typography>
        </div>
    );
}

export default AboutUs;
