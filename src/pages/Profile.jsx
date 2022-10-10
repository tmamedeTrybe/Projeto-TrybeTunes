import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import styles from './Profile.module.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      perfil: '',
    };
  }

  componentDidMount = () => {
    this.recuperaPerfil();
  }

  recuperaPerfil = () => {
    this.setState({ loading: true }, async () => {
      const usuario = await getUser();
      this.setState({ perfil: usuario, loading: false });
    });
  }

  render() {
    const { perfil, loading } = this.state;
    return (
      <div className={ styles.back } data-testid="page-profile">
        <Header />
        {loading ? <section className={ styles.loading }><Carregando /></section>
          : (
            <div className={ styles.container }>
              <section className={ styles.infos }>
                <section>
                  <img
                    data-testid="profile-image"
                    alt="imagem do usuario"
                    src={ perfil.image }
                  />
                </section>
                <section className={ styles.name }>
                  <h3> Nome </h3>
                  <p>{perfil.name}</p>
                </section>
                <section className={ styles.email }>
                  <h3>Email</h3>
                  <p>{perfil.email}</p>
                </section>
                <section className={ styles.description }>
                  <h3>Descrição</h3>
                  <p>{perfil.description}</p>
                </section>
              </section>
              <section >
                <Link
                  to="/profile/edit"
                >
                  <button type='submit' className={ styles.EditButton }>Editar Perfil</button>
                </Link>
              </section>

            </div>

          )}

      </div>
    );
  }
}

export default Profile;
