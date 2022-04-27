import React from 'react';
import PropTypes from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCardFav extends React.Component {
  constructor() {
    super();

    this.state = {
      favorita: true,
      loading: false,
    };
  }

  coletaCheck = ({ target }) => {
    const { name } = target;
    const value = target.checked;
    this.setState({ [name]: value });
    const { objeto, funcaoAtualiza } = this.props;
    this.setState({ favorita: false, loading: true }, async () => {
      await removeSong(objeto);
      funcaoAtualiza(objeto);
      this.setState({ loading: false });
    });
  }

  render() {
    const { capaDisco, nomeMusica, audioMusica, trackId } = this.props;
    const { favorita, loading } = this.state;
    return (
      <div>
        {loading ? <Carregando />
          : (
            <li key={ trackId }>
              <img src={ capaDisco } alt="capa" />
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

            </li>

          )}

      </div>
    );
  }
}

MusicCardFav.propTypes = {
  capaDisco: PropTypes.string.isRequired,
  nomeMusica: PropTypes.string.isRequired,
  audioMusica: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  funcaoAtualiza: PropTypes.func.isRequired,
  objeto: PropTypes.oneOfType([PropTypes.object]).isRequired,

};

export default MusicCardFav;
