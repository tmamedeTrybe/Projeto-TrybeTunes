import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

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
        </header>
      );
    }
}

export default Header;
