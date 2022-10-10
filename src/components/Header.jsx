import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import logoWhite from '../images/logoWhite.svg';
import styles from './Header.module.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.exibirNome();
  }

    exibirNome = async () => {
      this.setState({ loading: true }, async () => {
        const usuario = await getUser();
        this.setState({ loading: false, user: usuario.name, image: usuario.image });
      });
    }

    render() {
      const { user, loading, image } = this.state;
      return (
        <div className={ styles.top } data-testid="header-component">
          <header>
            <img alt="logo" src={ logoWhite } />
            {loading ? <section className={ styles.loading }><Carregando /></section> : (
              <div className={ styles.user }>
                <img alt="Foto do usuario" src={ image } />
                <p data-testid="header-user-name">{user}</p>
              </div>
            ) }
          </header>
          <nav>
            <Link
              id={ styles.pesquisa }
              data-testid="link-to-search"
              to="/search"
            >
              Pesquisa
            </Link>
            <Link
              id={ styles.pesquisa }
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritas

            </Link>
            <Link
              id={ styles.pesquisa }
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil

            </Link>
          </nav>
        </div>
      );
    }
}

export default Header;
