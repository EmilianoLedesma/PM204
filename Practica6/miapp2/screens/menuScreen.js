// Zona 1: Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React , {useState} from 'react';
import tarjetasScreen from './tarjetasScreen';
import safeAreaScreen from './safeAreaScreen';
import PressableScreen from './pressableScreen';
import AlertScreen from './alertScreen';
import ListsScreen from './listsScreen';
import ImagesScreen from './imagesScreen';
import IndicatorScreen from './indicatorScreen';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function menuScreen() {
    const {screen, setScreen} = useState('menu');

    switch(screen){
        case 'Tarjetas':
            return <tarjetasScreen/>;
        case 'SafeArea':
            return <safeAreaScreen/>;
        case 'Pressable':
            return <pressableScreen/>;
        case 'Alert':
            return <alertScreen/>;
        case 'Lists':
            return <listsScreen/>;
        case 'Images':
            return <imagesScreen/>;
        case 'Indicator':
            return <indicatorScreen/>;
        case 'Modal':
            return <modalScreen/>;
        case 'Menu':
            default:
                return (
                <View style={styles.container}>
                    <Button title='Practica Tarjetas' onPress={() => setScreen('Tarjetas')}/>
                    <Button title='Practica SafeArea' onPress={() => setScreen('SafeArea')}/>
                    <Button title='Practica Pressable' onPress={() => setScreen('Pressable')}/>
                    <Button title='Practica Alert' onPress={() => setScreen('Alert')}/>
                    <Button title='Practica Lists' onPress={() => setScreen('Lists')}/>
                    <Button title='Practica Images' onPress={() => setScreen('Images')}/>
                    <Button title='Practica Indicator' onPress={() => setScreen('Indicator')}/>
                    <Button title='Practica Modal' onPress={() => setScreen('Modal')}/>
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
    flexDirection: 'row',
  }
});
