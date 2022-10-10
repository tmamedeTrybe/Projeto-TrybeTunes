import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';
import styles from './ProfileEdit.module.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nome: '',
      email: '',
      imagem: '',
      descricao: '',
      dadosAlterados: false,
    };
  }

  componentDidMount = () => {
    this.recuperaPerfil();
  }

  recuperaPerfil = () => {
    this.setState({ loading: true }, async () => {
      const usuario = await getUser();
      this.setState({ nome: usuario.name,
        email: usuario.email,
        imagem: usuario.image,
        descricao: usuario.description,
        loading: false,
      });
    });
  }

  coletaDados = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
    );
  }

  validateEmail = (email) => { // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  ativaBotao = () => {
    const { nome, email, descricao } = this.state;
    if (nome !== '' && email !== ''
      && descricao !== '' && this.validateEmail(email)) return false;
    return true;
  }

  salvarAlteracoes = async () => {
    const { nome, email, descricao, imagem } = this.state;
    const usuario = {
      name: nome,
      email,
      description: descricao,
      image: imagem,
    };
    await updateUser(usuario);
    this.setState({
      nome: '',
      email: '',
      imagem: '',
      descricao: '',
      dadosAlterados: true });
  }

  render() {
    const { nome, email, descricao, loading, imagem, dadosAlterados } = this.state;
    if (dadosAlterados) {
      return <Redirect push to="/profile" />;
    }
    return (
      <div className={ styles.back } data-testid="page-profile-edit">
        <Header />
        {loading ? <section className={ styles.loading }><Carregando /></section>
          : (
            <div className={ styles.container }>
              <section className={ styles.form }>
                <label htmlFor="imagem">
                  Imagem
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="imagem"
                    value={ imagem }
                    onChange={ this.coletaDados }
                  />
                </label>
                <label htmlFor="nome">
                  Nome
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="nome"
                    value={ nome }
                    onChange={ this.coletaDados }
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    data-testid="edit-input-email"
                    type="text"
                    name="email"
                    value={ email }
                    onChange={ this.coletaDados }
                  />
                </label>
                <label htmlFor="descricao">
                  Descrição
                  <textarea
                    data-testid="edit-input-description"
                    type="text"
                    name="descricao"
                    value={ descricao }
                    onChange={ this.coletaDados }
                  />
                </label>
              </section>
              <section>
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  disabled={ this.ativaBotao() }
                  onClick={ this.salvarAlteracoes }
                  className={ styles.saveButton }
                >
                  Salvar
                </button>
              </section>
            </div>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
