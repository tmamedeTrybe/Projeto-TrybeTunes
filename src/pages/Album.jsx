import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';

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
    console.log(apenasMusicas);
    return apenasMusicas.map((item) => (
      <div key={ item.trackName }>
        <MusicCard nomeMusica={ item.trackName } audioMusica={ item.previewUrl } />
      </div>
    ));
  }

  render() {
    const { musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musicas.length === 0
          ? <Carregando />
          : (
            <div>
              <section>
                {console.log(musicas[0].artistName)}
                <h1 data-testid="artist-name">{musicas[0].artistName}</h1>
                <p data-testid="album-name">{musicas[0].collectionName}</p>
              </section>
              <section>
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
