import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainScreen() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
      return;
    }
    Alert.alert(titulo, mensaje);
  };

  const agregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      mostrarAlerta('Campos incompletos', 'Por favor, llena todos los campos antes de agregar el libro.');
      return;
    }

    setGuardando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros((prev) => [nuevoLibro, ...prev]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setGuardando(false);

      mostrarAlerta('¡Libro agregado!', `"${nuevoLibro.titulo}" fue guardado correctamente.`);
    }, 4000);
  };

  const renderLibro = ({ item }) => (
    <View style={styles.tarjeta}>
      <Text style={styles.tarjetaTitulo}>{item.titulo}</Text>
      <Text style={styles.tarjetaDetalle}>Autor: {item.autor}</Text>
      <Text style={styles.tarjetaDetalle}>Género: {item.genero}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/fondo1.jpg')}
      style={styles.fondo}
      imageStyle={styles.fondoImagen}
    >
      <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={renderLibro}
          contentContainerStyle={styles.listaContenido}
          ListHeaderComponent={
            <View style={styles.formulario}>
              <Text style={styles.encabezado}>Agregar Libro</Text>

              <TextInput
                style={styles.input}
                placeholder="Título del libro"
                placeholderTextColor="#aaa"
                value={titulo}
                onChangeText={setTitulo}
              />

              <TextInput
                style={styles.input}
                placeholder="Autor"
                placeholderTextColor="#aaa"
                value={autor}
                onChangeText={setAutor}
              />

              <TextInput
                style={styles.input}
                placeholder="Género"
                placeholderTextColor="#aaa"
                value={genero}
                onChangeText={setGenero}
              />

              {guardando ? (
                <View style={styles.indicadorContenedor}>
                  <ActivityIndicator size="large" color="#e2c275" />
                  <Text style={styles.indicadorTexto}>Guardando libro...</Text>
                </View>
              ) : (
                <Pressable
                  style={({ pressed }) => [
                    styles.boton,
                    pressed && styles.botonPresionado,
                  ]}
                  onPress={agregarLibro}
                >
                  <Text style={styles.botonTexto}>Agregar libro</Text>
                </Pressable>
              )}

              {libros.length > 0 && (
                <Text style={styles.subtituloLista}>
                  Libros registrados ({libros.length})
                </Text>
              )}
            </View>
          }
        />
      </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fondoImagen: {
    resizeMode: 'cover',
    opacity: 0.85,
  },
  flex: {
    flex: 1,
  },
  listaContenido: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  formulario: {
    backgroundColor: '#000000bb',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  encabezado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2c275',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff15',
    borderWidth: 1,
    borderColor: '#ffffff44',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#e2c275',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  botonPresionado: {
    backgroundColor: '#c9a84c',
    opacity: 0.85,
  },
  botonTexto: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  indicadorContenedor: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  indicadorTexto: {
    color: '#e2c275',
    marginTop: 8,
    fontSize: 14,
  },
  subtituloLista: {
    color: '#e2c275',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 4,
  },
  tarjeta: {
    backgroundColor: '#000000bb',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  tarjetaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2c275',
    marginBottom: 4,
  },
  tarjetaDetalle: {
    fontSize: 13,
    color: '#ccc',
  },
});
