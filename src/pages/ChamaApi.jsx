import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ChamaApi extends React.Component {
    chamaApi = async (digitado) => {
      const coletaAlbuns = await searchAlbumsAPI(digitado);
      const exibicaoAlbuns = await coletaAlbuns.map((item) => (
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
      return exibicaoAlbuns;
    }

    render() {
      const { digitado } = this.props;
      return (
        this.chamaApi(digitado)
      );
    }
}

ChamaApi.propTypes = {
  digitado: PropTypes.string.isRequired,
};

export default ChamaApi;
