// Zona 1: Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function ImagesScreen() {
  return (
    <View style={styles.container}>
        <Text>Aqui va la Practica de Images</Text>
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
  }
});
