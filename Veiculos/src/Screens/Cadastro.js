import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera'
import ItemVeiculo from '../Components/ItemVeiculo';

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

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({imagem: data.uri})
    }
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TextInput onChangeText={(valor) => { this.setState({ modelo: valor }) }} placeholder='Digite o modelo...' />
          <TextInput onChangeText={(valor) => { this.setState({ marca: valor }) }} placeholder='Digite a marca...' />
          <TextInput onChangeText={(valor) => { this.setState({ ano: valor }) }} placeholder='Digite o ano...' />
          <Text></Text>
        </View>


        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }}
          />

        </View>


        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Text style={{ fontSize: 14 }}>Tirar foto </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.CadastrarBanco(this.state.modelo, this.state.marca, this.state.ano, this.state.imagem)}>
            <Text style={{ backgroundColor: 'purple', width: 150, textAlign: 'center', padding: 10, margin: 5, color: 'white', borderRadius: 50 }}>Cadastrar</Text>
          </TouchableOpacity>
          <Text></Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center' }}>O veículo será cadastrado com os seguintes dados:</Text>

          <ItemVeiculo
            modelo={this.state.modelo}
            marca={this.state.marca}
            ano={this.state.ano}
            imagem={this.state.imagem}
          />

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    flex: 1,
    height: 50,
    
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});