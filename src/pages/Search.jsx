import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
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

render() {
  const { pesquisa } = this.state;
  return (
    <div data-testid="page-search">
      <Header />
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
      >
        Pesquisar
      </button>
    </div>
  );
}
}

export default Search;
