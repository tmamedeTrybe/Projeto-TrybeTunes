import React from 'react';
import styles from './Carregando.module.css';

class Carregando extends React.Component {
  render() {
    return (
      <div className={ styles.container }>
        <span> Carregando... </span>
      </div>
    );
  }
}

export default Carregando;
