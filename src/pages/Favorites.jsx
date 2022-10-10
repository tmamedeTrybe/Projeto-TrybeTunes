import React from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';
import MusicCardFav from '../components/MusicCardFav';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import styles from './Favorites.module.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      listaFavoritas: [],
    };
  }

  componentDidMount() {
    this.recuperaFavoritas();
  }

  atualizaLista = (objeto) => {
    const { listaFavoritas } = this.state;
    const listaAtual = listaFavoritas.filter((item) => item.trackId !== objeto.trackId);
    this.setState({ loading: false, listaFavoritas: listaAtual });
  }

  recuperaFavoritas = () => {
    this.setState({ loading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ listaFavoritas: favoriteSongs, loading: false });
    });
  }

  exibirMusicasFavoritas = () => {
    const { listaFavoritas } = this.state;
    return listaFavoritas.map((item) => (
      <div className={ styles.FavoritesList } key={ item.trackId }>
        <hr />
        <MusicCardFav
          capaDisco={ item.artworkUrl30 }
          nomeMusica={ item.trackName }
          audioMusica={ item.previewUrl }
          trackId={ item.trackId }
          objeto={ item }
          funcaoAtualiza={ this.atualizaLista }
        />
      </div>
    ));
  }

  render() {
    const { loading } = this.state;
    return (
      <div className={ styles.back } data-testid="page-favorites">
        <Header />
        {loading ? <div className={ styles.loading }><Carregando /></div>
          : (
            <div className={ styles.container }>
              <ul>
                {this.exibirMusicasFavoritas()}
              </ul>
            </div>

          )}
      </div>
    );
  }
}

export default Favorites;
