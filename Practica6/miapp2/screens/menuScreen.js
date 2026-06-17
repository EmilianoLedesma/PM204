// Zona 1: Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React , {useState} from 'react';
import TarjetasScreen from './tarjetasScreen';
import SafeAreaScreen from './safeAreaScreen';
import PressableScreen from './pressableScreen';
import AlertScreen from './alertScreen';
import ListsScreen from './listsScreen';
import ImagesScreen from './imagesScreen';
import IndicatorScreen from './indicatorScreen';
import ModalScreen from './modalScreen';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function menuScreen() {
    const [screen, setScreen] = useState('menu');

    switch(screen){
        case 'Tarjetas':
            return <TarjetasScreen/>;
        case 'SafeArea':
            return <SafeAreaScreen/>;
        case 'Pressable':
            return <PressableScreen/>;
        case 'Alert':
            return <AlertScreen/>;
        case 'Lists':
            return <ListsScreen/>;
        case 'Images':
            return <ImagesScreen/>;
        case 'Indicator':
            return <IndicatorScreen/>;
        case 'Modal':
            return <ModalScreen/>;
        case 'Menu':
            default:
                return (
                <View style={styles.container}>
                    <View style={styles.btnWrapper}><Button title='Practica Tarjetas' onPress={() => setScreen('Tarjetas')}/></View>
                    <View style={styles.btnWrapper}><Button title='Practica SafeArea' onPress={() => setScreen('SafeArea')}/></View>
                    <View style={styles.btnWrapper}><Button title='Practica Pressable' onPress={() => setScreen('Pressable')}/></View>
                    <View style={styles.btnWrapper}><Button title='Practica Alert' onPress={() => setScreen('Alert')}/></View>
                    <View style={styles.btnWrapper}><Button title='Practica Lists' onPress={() => setScreen('Lists')}/></View>
                    <View style={styles.btnWrapper}><Button title='Practica Images' onPress={() => setScreen('Images')}/></View>
                    <View style={styles.btnWrapper}><Button title='Practica Indicator' onPress={() => setScreen('Indicator')}/></View>
                    <View style={styles.btnWrapper}><Button title='Practica Modal' onPress={() => setScreen('Modal')}/></View>
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
