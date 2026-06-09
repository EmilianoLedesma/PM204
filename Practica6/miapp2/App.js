// Zona 1: Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/wave.png')}/>
      <Text>Hola mundo react native</Text>
      <Saludo/>
      <Saludo2></Saludo2>
      <StatusBar style="auto" />
    </View>
  );
}

// Zona 3: Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
