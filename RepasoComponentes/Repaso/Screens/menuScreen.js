// Zona 1: Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React , {useState} from 'react';
import FormsScreen from './FormsScreen';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function menuScreen() {
    const [screen, setScreen] = useState('menu');

    switch(screen){
        case 'Forms':
            return <FormsScreen/>;
        case 'SafeArea':
        case 'Menu':
            default:
                return (
                <View style={styles.container}>
                    <View style={styles.btnWrapper}><Button title='Practica Formulario Repaso' onPress={() => setScreen('Forms')}/></View>
                    <StatusBar style="auto" />
                </View>
        );
    }
}
// Zona 3: Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  btnWrapper: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  }
});
