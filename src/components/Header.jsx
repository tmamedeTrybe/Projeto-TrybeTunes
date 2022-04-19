import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.exibirNome();
  }

    exibirNome = async () => {
      this.setState({ loading: true }, async () => {
        const usuario = await getUser();
        this.setState({ loading: false, user: usuario.name });
      });
    }

    render() {
      const { user, loading } = this.state;
      return (
        <header data-testid="header-component">
          {loading ? <Carregando /> : <p data-testid="header-user-name">{user}</p> }
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </header>
      );
    }
}

export default Header;
