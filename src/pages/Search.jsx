import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
      pesquisaAtual: '',
      loading: false,
      albuns: [],
    };
  }

  async componentDidMount() {
    const { pesquisaAtiva } = this.state;
    if (pesquisaAtiva) {
      await this.exibirAlbuns();
    }
  }

coletaDados = ({ target }) => {
  const { name, value } = target;
  this.setState(
    { [name]: value },
  );
}

validarPesquisa = () => {
  const { pesquisa } = this.state;
  const pesquisaMinimo = 2;
  if (pesquisa.length < pesquisaMinimo) return true;
  return false;
}

pesquisar = async () => {
  const { pesquisa } = this.state;
  this.setState({ loading: true }, async () => {
    const coletaAlbuns = await searchAlbumsAPI(pesquisa);
    this.setState({
      albuns: coletaAlbuns,
      pesquisa: '',
      loading: false,
      pesquisaAtual: pesquisa });
  });
}

exibirAlbuns = () => {
  const { albuns } = this.state;
  return albuns.map((item) => (
    <div key={ item.collectionId }>
      {item.artistName}
      {item.artworkUrl100}
      {item.collectionName}
      <Link
        data-testid={ `link-to-album-${item.collectionId}` }
        to={ `/album/${item.collectionId}` }
      />
    </div>
  ));
}

render() {
  const { pesquisa, loading, albuns, pesquisaAtual } = this.state;
  return (loading ? <Carregando />
    : (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.coletaDados }
            value={ pesquisa }
            name="pesquisa"
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ this.validarPesquisa() }
            onClick={ this.pesquisar }
          >
            Pesquisar
          </button>
        </section>
        <section>
          <p>
            {`Resultado de álbuns de: ${pesquisaAtual}` }
          </p>
          {albuns.length > 0 ? this.exibirAlbuns() : (
            <span>Nenhum álbum foi encontrado</span>
          )}
        </section>
      </div>
    )
  );
}
}

export default Search;
