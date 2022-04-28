import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
      console.log(await usuario);
      this.setState({ perfil: usuario, loading: false });
    });
  }

  render() {
    const { perfil, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Carregando />
          : (
            <div>
              <section>
                <img
                  data-testid="profile-image"
                  alt="imagem do usuario"
                  src={ perfil.image }
                />
                <h3> Nome </h3>
                <p>{perfil.name}</p>
                <h3>Email</h3>
                <p>{perfil.email}</p>
                <h3>Descrição</h3>
                <p>{perfil.description}</p>
              </section>
              <section>
                <Link
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </section>

            </div>

          )}

      </div>
    );
  }
}

export default Profile;
