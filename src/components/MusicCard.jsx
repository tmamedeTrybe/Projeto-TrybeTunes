import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorita: '',
      listaFavoritas: [],
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ listaFavoritas: favoriteSongs });
    const { listaFavoritas } = this.state;
    const { trackId } = this.props;
    if (listaFavoritas.some((item) => item.trackId === trackId)) {
      this.setState({ favorita: true });
    }
  }

coletaCheck = ({ target }) => {
  const { name } = target;
  const value = target.checked;
  this.setState({ [name]: value });
  const { objeto } = this.props;
  const { favorita } = this.state;
  if (!favorita) {
    this.setState({ loading: true, favorita: true }, async () => {
      await addSong(objeto);
      this.setState({ loading: false });
    });
  } else if (favorita) {
    this.setState({ loading: true }, async () => {
      await removeSong(objeto);
      this.setState({ loading: false, favorita: false });
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
