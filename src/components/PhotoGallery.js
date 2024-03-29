import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

const wrapperStyle = {
    display: "block",
    minHeight: "1px",
    width: "100%",
    border: "1px solid #ddd",
    overflow: "auto"
};

function PhotoGallery(props) {
    const { images } = props;
    const imageArr = images.map(image => {
        return {
            ...image,
            customOverlay: (
                <div style = {captionStyle}>
                    <div>{`${image.user}: ${image.caption}`}</div>
                </div>
            )
        }
    });

    return (
        <div style={wrapperStyle}>
            <Gallery images={imageArr}
                     enableImageSelection={false}
                     backdropClosesModal={true}
            />
        </div>
    );
}

PhotoGallery.protoTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.string.isRequired,
            caption: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            thumbnailWidth: PropTypes.string.isRequired,
            thumbnailHeight: PropTypes.string.isRequired,
        })
    ).isRequired
};

export default PhotoGallery;