import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorita: false,
    };
  }

coletaCheck = ({ target }) => {
  const { name } = target;
  const { objeto } = this.props;
  const value = target.checked;
  this.setState({ [name]: value });
  const { favorita } = this.state;
  if (!favorita) {
    this.setState({ loading: true }, async () => {
      await addSong(objeto);
      this.setState({ loading: false });
    });
  }
}

render() {
  const { loading, favorita } = this.state;
  const { nomeMusica, audioMusica, trackId } = this.props;
  return (loading ? <Carregando />
    : (
      <div>
        <p>{nomeMusica}</p>
        <audio data-testid="audio-component" src={ audioMusica } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ favorita }
            name="favorita"
            onChange={ this.coletaCheck }
            id={ trackId }
          />
        </label>

      </div>
    )

  );
}
}

MusicCard.propTypes = {
  nomeMusica: PropTypes.string.isRequired,
  audioMusica: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  objeto: PropTypes.oneOfType([PropTypes.object]).isRequired, // https://github.com/jsx-eslint/eslint-plugin-react/issues/2079

};

export default MusicCard;
