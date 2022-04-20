import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { nomeMusica, audioMusica } = this.props;
    return (
      <div>
        <p>
          {nomeMusica}
          <audio data-testid="audio-component" src={ audioMusica } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </p>
      </div>
    );
  }
}

MusicCard.propTypes = {
  nomeMusica: PropTypes.string.isRequired,
  audioMusica: PropTypes.string.isRequired,
};

export default MusicCard;
