// Zona 1: Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function indicatorScreen() {
  return (
    <View style={styles.container}>
        <Text>Aqui va la Practica de Indicator</Text>
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
