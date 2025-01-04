
import React from 'react';
import PropTypes from 'prop-types';

const SeriesVideoPlayer = ({ videoUrl }) => {
  return (
    <div>
      <video controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

SeriesVideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default SeriesVideoPlayer;