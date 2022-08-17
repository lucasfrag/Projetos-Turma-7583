import React, {Component} from 'react';
import { View, Text } from 'react-native';

import ItemVeiculo from '../Components/ItemVeiculo';
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

    ExcluirBanco = (id) => {
      const banco = new Database();
      banco.Remover(id);
      this.ListarBanco();
    }    

    render() {
      return(
        <View style={{flex: 1}}>
  
          {
            this.state.listaVeiculos.map(
              item => (
                <ItemVeiculo 
                  key={item.id}
                  id={item.id}
                  modelo={item.modelo} 
                  marca={item.marca}
                  ano={item.ano}
                  imagem={item.imagem}
                  excluir={this.ExcluirBanco}
                />
              )
            )
          }
        </View>
      )    
    }
  }