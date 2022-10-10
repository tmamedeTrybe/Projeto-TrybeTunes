import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import styles from './Search.module.css';

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
      <p>{item.artistName}</p>
      <img src={ item.artworkUrl100 } alt="capa" />
      <p>{item.collectionName}</p>
      <Link
        data-testid={ `link-to-album-${item.collectionId}` }
        to={ `/album/${item.collectionId}` }
      >
        {item.collectionName}
      </Link>
    </div>
  ));
}

render() {
  const { pesquisa, loading, albuns, pesquisaAtual } = this.state;
  return (
    <div className={ styles.container } data-testid="page-search">
      <Header />
      {loading ? <section className={ styles.loading }><Carregando /></section>
        : <main className={ styles.main }>
          <section className={ styles.form }>
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
            {albuns.length > 0 ? (
              <div className={ styles.result }>
                <section className={ styles.albunsListTitle }>
                  <p>
                    {`Resultado de álbuns de: ${pesquisaAtual}` }
                  </p>
                </section>

                <section className={ styles.albunsList }>
                  {albuns.map((item) => (
                    <div className={ styles.album } key={ item.collectionId }>
                      <Link
                        data-testid={ `link-to-album-${item.collectionId}` }
                        to={ `/album/${item.collectionId}` }
                      >
                        <p>{item.artistName}</p>
                        <img src={ item.artworkUrl100 } alt="capa" />

                        <p>{item.collectionName}</p>
                      </Link>
                    </div>
                  ))}
                </section>
              </div>
            ) : (
              <span>Nenhum álbum foi encontrado</span>
            )}
          </section>
        </main>}
    </div>
  );
}
}

export default Search;
