import React, {Component} from 'react';
import { View, Text } from 'react-native';

import Database from '../Database/Database'

export default class Listagem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listaVeiculos: []
      }
      this.ListarBanco();
    }
  
    ListarBanco = () => {
      const banco = new Database();
      banco.Listar().then( lista => { this.setState({ listaVeiculos: lista }) } )
    }
    
    render() {
      return(
        <View>
  
          {
            this.state.listaVeiculos.map(
              item => (
                <Text>ID: {item.id} Modelo: {item.modelo} Marca: {item.marca} Ano: {item.ano} Imagem: {item.imagem}</Text>
              )
            )
          }
        </View>
      )    
    }
  }