import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NotificationManager } from './src/Notification'

export default class App extends Component {
  constructor(props) {
    super(props)
    notificador = NotificationManager
  }
  
  

  componentDidMount() {
    this.notificador = NotificationManager
    this.notificador.configure();
    this.notificador.createChannel();
    this.notificador.buildNotificationSchedule();
  }

  onPressSendNotification = () => {
    this.notificador.showNotification(
      1,
      "Esse é o nosso título",
      "E aqui está a mensagem. Vamos inserir uma mensagem um pouco mais longa para vermos o Android irá se adaptar ao conteúdo na tela?",
      {}, // data
      {} // options
    )
  }

  onPressCancelAllLocalNotification = () => {
    this.notificador.cancelAllLocalNotification()
  }

  render() {
    let { container, button } = styles

    return (
      <View style={container}>
        <TouchableOpacity
          style={button}
          onPress={this.onPressSendNotification}
        >
          <Text>Enviar notificação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={button}
          onPress={this.onPressCancelAllLocalNotification}>
          <Text>Cancelar notificações</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

/* Estilização do projeto */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    marginTop: 10
  }
});