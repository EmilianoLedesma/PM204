// Zona 1: Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from '../components/perfil';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function tarjetasScreen() {
  return (
    <View style={styles.container}>
      <Perfil style={styles.tarjeta1} nombre="Emiliano" materia="Movil" carrera="Sistemas" cuatri="9"/>

      <Perfil style={styles.tarjeta2} nombre="Diego" materia="Bases de Datos" carrera="Sistemas" cuatri="7"/>

      <Perfil style={styles.tarjeta1} nombre="Ivan" materia="Movil" carrera="Sistemas" cuatri="10"/>

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
    flexDirection: 'row',
  },
  tarjeta1: {
    backgroundColor: '#fe8677',
  },
  tarjeta2: {
    backgroundColor: '#61ea12',
  },
});
