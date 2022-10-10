import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import styles from './Album.module.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
    };
  }

  componentDidMount = () => {
    this.salvarMusicas();
  }

  salvarMusicas = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState(async () => {
      const coletaMusicas = await getMusics(id);
      this.setState({ musicas: coletaMusicas });
    });
  }

  exibirMusicas = (param) => {
    const apenasMusicas = param.filter((item, index) => index !== 0);
    return apenasMusicas.map((item) => (
      <div key={ item.trackId }>
        <hr />
        <MusicCard
          nomeMusica={ item.trackName }
          audioMusica={ item.previewUrl }
          trackId={ item.trackId }
          objeto={ item }
        />
      </div>
    ));
  }

  render() {
    const { musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musicas.length === 0
          ? <div className={ styles.loading }><Carregando /></div>
          : (
            <div className={ styles.container }>
              <section className={ styles.albumInfos }>
                <img alt="capa do album" src={ musicas[0].artworkUrl100 } />
                <h1 data-testid="artist-name">{musicas[0].artistName}</h1>
                <p data-testid="album-name">{musicas[0].collectionName}</p>
              </section>
              <section className={ styles.containerMusics }>
                {this.exibirMusicas(musicas)}
              </section>
            </div>

          ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
