import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
import logoTrybetunes from '../images/logoTrybetunes.svg';
import styles from './Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      loading: false,
      logado: false,
    };
  }

  salvarNome = async () => {
    const { login } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: login });
      this.setState({ loading: false, logado: true });
    });
  };

  coletaDados = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
    );
  }

  validarNome = () => {
    const { login } = this.state;
    const nomeMinimo = 3;
    if (login.length < nomeMinimo) return true;
    return false;
  }

  render() {
    const { login, loading, logado } = this.state;
    if (logado) {
      return <Redirect push to="/search" />;
    }
    return (loading ? <Carregando />
      : (
        <div className={ styles.container } data-testid="page-login">
          <section className={ styles.logo }>
            <img alt="logo" src={ logoTrybetunes } />
          </section>
          <form>
            <input
              placeholder="Nome"
              data-testid="login-name-input"
              type="text"
              value={ login }
              name="login"
              onChange={ this.coletaDados }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              onClick={ this.salvarNome }
              disabled={ this.validarNome() }
            >
              Entrar
            </button>
          </form>

        </div>
      )
    );
  }
}

export default Login;
