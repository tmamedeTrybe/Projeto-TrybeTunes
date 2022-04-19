import React from 'react';
import PropTypes from 'prop-types';
import ChamaApi from './ChamaApi';

class listaAlbuns extends React.Component {
  render() {
    const { digitado } = this.props;
    return (
      <div>
        <ChamaApi digitado={ digitado } />
      </div>
    );
  }
}

listaAlbuns.propTypes = {
  digitado: PropTypes.string.isRequired,
};

export default listaAlbuns;
