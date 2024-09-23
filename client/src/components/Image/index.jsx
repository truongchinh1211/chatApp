import { forwardRef, useState } from "react";
import noImage from '~/assets/images/no-image.svg'
import PropTypes from 'prop-types'

const Image = forwardRef(({src,alt,fallBack: customFallBack = noImage, ...props }, ref) => {
    const [fallBack, setFallBack]= useState('')
    
    
    const handleError = () => {
        setFallBack(customFallBack)
    }

    return (
        <img ref={ref} alt={alt} src={fallBack || src } {...props} onError={handleError} />
    );
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    fallBack:PropTypes.string,
};

Image.displayName = 'Image';
export default Image;