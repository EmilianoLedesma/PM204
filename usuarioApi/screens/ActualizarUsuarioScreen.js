import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const API_URL = 'http://10.134.29.44:5000/v1/usuarios';

const crearBasicAuth = () => {
  const credenciales = 'admin:1234';

  if (typeof globalThis.btoa === 'function') {
    return `Basic ${globalThis.btoa(credenciales)}`;
  }

  return `Basic ${credenciales}`;
};

export default function ActualizarUsuarioScreen() {
  const parametros = useLocalSearchParams();

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);

  const id = Array.isArray(parametros.id) ? parametros.id[0] : parametros.id;

  useEffect(() => {
    const nombreInicial = Array.isArray(parametros.nombre)
      ? parametros.nombre[0]
      : parametros.nombre;
    const edadInicial = Array.isArray(parametros.edad)
      ? parametros.edad[0]
      : parametros.edad;

    setNombre(nombreInicial ?? '');
    setEdad(edadInicial ?? '');
  }, [parametros.nombre, parametros.edad]);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarCambios = async () => {
    if (!id) {
      mostrarMensaje('Error', 'No se pudo identificar el usuario.');
      return;
    }

    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Error', 'Complete todos los campos.');
      return;
    }

    try {
      setCargando(true);

      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: crearBasicAuth(),
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          edad: Number(edad),
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos?.detail || 'No se pudo actualizar el usuario.');
      }

      mostrarMensaje('Exito', 'Usuario actualizado correctamente.');
      router.back();
    } catch (error) {
      mostrarMensaje('Error', error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Actualizar Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre del usuario"
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          placeholder="Edad del usuario"
          keyboardType="numeric"
        />

        <Pressable
          style={({ pressed }) => [
            styles.botonGuardar,
            pressed && styles.botonPresionado,
            cargando && styles.botonDeshabilitado,
          ]}
          onPress={guardarCambios}
          disabled={cargando}
        >
          <Text style={styles.textoBoton}>
            {cargando ? 'Guardando...' : 'Guardar cambios'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 22,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
    color: '#111827',
  },

  botonGuardar: {
    backgroundColor: '#F2C300',
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },

  botonPresionado: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },

  botonDeshabilitado: {
    opacity: 0.75,
  },

  textoBoton: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: 'bold',
  },
});