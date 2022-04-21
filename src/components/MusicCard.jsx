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
  const { name, checked } = target;
  this.setState({ [name]: checked });
}

coletaDados = (objeto) => {
  const { favorita } = this.state;
  if (favorita) {
    this.setState({ loading: true }, async () => {
      await addSong(objeto);
      this.setState({ loading: false });
    });
  }
}

render() {
  const { loading } = this.state;
  const { nomeMusica, audioMusica, trackId, objeto } = this.props;
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
            name="favorita"
            onChange={ this.coletaDados(objeto) }
            checked={ this.coletaCheck }
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
  objeto: PropTypes.objectOf(PropTypes.object()).isRequired, // https://github.com/jsx-eslint/eslint-plugin-react/issues/2079

};

export default MusicCard;
