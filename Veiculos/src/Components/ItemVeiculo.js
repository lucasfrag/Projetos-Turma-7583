import React, { Component } from 'react'
import { View, Text, Image, Button } from 'react-native'

export default class ItemVeiculo extends Component {

    verificarExcluir() {
        if(this.props.excluir) {
            return (
            <View style={{ flex: 1 }}>
                <Button title="Excluir" onPress={() => {this.props.excluir(this.props.id)}}></Button>
            </View>)
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ height: 80, marginRight: 10 }}
                        source={{ uri: this.props.imagem }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text>Modelo: {this.props.modelo} </Text>
                    <Text>Marca: {this.props.marca}</Text>
                    <Text>Ano: {this.props.ano}</Text>
                </View>

                {this.verificarExcluir()}
            </View>
        )
    }
}

