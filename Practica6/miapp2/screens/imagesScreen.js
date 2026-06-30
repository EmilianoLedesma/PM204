/* ZONA 1: Importaciones */
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

/* ZONA 2: Componente principal */
export default function ImageBackgroundScreen() {
  const [appLista, setAppLista] = useState(false);
  const [imagenIndex, setImagenIndex] = useState(0);
  const [blur, setBlur] = useState(0);

  const imagenes = [
    require('../assets/fondo1.jpg'),
    require('../assets/fondo2.jpg'),
    require('../assets/fondo3.jpg'),
  ];

  useEffect(() => {
    SplashScreen.setOptions({
      duration: 500,
      fade: true,
    });

    async function cargarRecursos() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppLista(true);
      }
    }

    cargarRecursos();
  }, []);

  useEffect(() => {
    if (appLista) {
      SplashScreen.hideAsync();
    }
  }, [appLista]);

  if (!appLista) {
    return (
      <View style={styles.splash}>
        <Image
          source={require('../assets/wave.png')}
          style={styles.wave}
        />
        <Text style={styles.splashTitulo}> Cargando app... </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={imagenes[imagenIndex]}
      style={styles.contenedor}
      imageStyle={styles.imagen}
      blurRadius={blur}
    >
      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> ImageBackground </Text>
        <Text style={styles.subtitulo}> Imagen {imagenIndex + 1} de {imagenes.length}
        </Text>
        <Button
          title="Cambiar imagen"
          onPress={() => setImagenIndex((imagenIndex + 1) % imagenes.length)}
          color="#00B4D8"
        />
        <Text style={styles.subtitulo}> blurRadius: {blur} </Text>
        <Button
          title={blur > 0 ? 'Quitar blur' : 'Aplicar blur'}
          onPress={() => setBlur(blur > 0 ? 0 : 10)}
          color="#7B68EE"
        />
      </View>
    </ImageBackground>
  );
}

/* ZONA 3: Estilos */
const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  splashTitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  contenedor: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen: {
    resizeMode: 'cover',
    opacity: 0.75,
  },
  tarjeta: {
    backgroundColor: '#000000aa',
    padding: 24,
    borderRadius: 16,
    width: '82%',
    maxWidth: 360,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff33',
  },
  subtitulo: {
    color: '#dddddd',
    fontSize: 13,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});