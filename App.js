import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Database from './src/Database/Database';
import Veiculo from './src/Models/Veiculo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaVeiculos: []
    }
    this.ListarBanco();
    //this.CadastrarBanco('Batmóvel', 'HotWheels', 2005, 'https://cf.shopee.com.br/file/dd9bfd306cbaa926a7b23f6d568cd103')
  }



  ListarBanco = () => {
    const banco = new Database();
    banco.Listar().then( lista => { this.setState({ listaVeiculos: lista }) } )
  }

  CadastrarBanco = (modelo, marca, ano, imagem) => {
    const banco = new Database();
    const veiculo = new Veiculo(modelo, marca, ano, imagem)
    banco.Inserir(veiculo);
  }

  render() {
    return(
      <View>
        <Text>Olá, mundo!</Text>

        {
          this.state.listaVeiculos.map(
            item => (
              <Text>{item.modelo} {item.marca} {item.ano} {item.imagem}</Text>
            )
          )
        }
      </View>
    )    
  }
}