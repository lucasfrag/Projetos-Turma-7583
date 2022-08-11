import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Database from '../Database/Database';
import Veiculo from '../Models/Veiculo';

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modelo: 'EM BRANCO',
        marca: 'EM BRANCO',
        ano: 0,
        imagem: ''
    }
    //this.CadastrarBanco('Batmóvel', 'HotWheels', 2005, 'https://cf.shopee.com.br/file/dd9bfd306cbaa926a7b23f6d568cd103')
  }

  CadastrarBanco = (modelo, marca, ano, imagem) => {
    const banco = new Database();
    const veiculo = new Veiculo(null, modelo, marca, ano, imagem)
    banco.Inserir(veiculo);
  }

  render() {
    return(
      <View>
        <TextInput onChangeText={ (valor) => {this.setState({modelo: valor})}} placeholder='Digite o modelo...' />
        <TextInput onChangeText={ (valor) => {this.setState({marca: valor})}} placeholder='Digite a marca...' />
        <TextInput onChangeText={ (valor) => {this.setState({ano: valor})}}placeholder='Digite o ano...' />

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.CadastrarBanco(this.state.modelo, this.state.marca, this.state.ano, this.state.imagem)}>
                <Text style={{ backgroundColor: 'purple', width: 150, textAlign: 'center',padding: 10, margin: 5, color: 'white', borderRadius: 50 }}>Cadastrar</Text>
            </TouchableOpacity>
            <Text></Text>
        </View>

        <View>
            <Text>O veículo será cadastrado com os seguintes dados:</Text>
            <Text>Modelo: {this.state.modelo}</Text>
            <Text>Marca: {this.state.marca}</Text>
            <Text>Ano: {this.state.ano}</Text>
        </View>
      </View>
    )    
  }
}