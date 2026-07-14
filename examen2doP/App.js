import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Tarjeta } from './components/TarjetaPelicula';

export default function App() {
  return (
    <View style={styles.container}>
      <Tarjeta titulo = "Interestelar" genero = "Ciencia Ficcion" pelicula = "Interestelar"/>
      <Tarjeta titulo = "Project Hail Mary" genero = "Ciencia Ficcion" pelicula = "Project Hail Mary"/>
      <Tarjeta titulo = "Odisea en el Espacio" genero = "Ciencia Ficcion" pelicula = "Odisea en el espacio"/>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
