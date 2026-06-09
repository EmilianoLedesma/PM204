// Zona 1: Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from './components/perfil';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/wave.png')}/>
      <Perfil nombre="Emiliano" materia="Movil" carrera="Sistemas" cuatri="9"/>
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
