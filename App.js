// Importação de bibliotecas
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das telas
import Home from './src/Screens/Home';
import Listagem from './src/Screens/Listagem';
import Cadastro from './src/Screens/Cadastro';

// Criação de variáveis auxiliares
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Página Inicial" component={Home} />
          <Stack.Screen name="Listagem" component={Listagem} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
      </NavigationContainer>
    )    
  }
}