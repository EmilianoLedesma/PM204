import { StyleSheet, View, Text, Image } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.contenedor}>
      <Image
        source={require('../assets/fondo.png')}
        style={styles.logo}
      />
      <Text style={styles.titulo}>Biblioteca</Text>
      <Text style={styles.subtitulo}>Bienvenido</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e2c275',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#aaa',
  },
});
