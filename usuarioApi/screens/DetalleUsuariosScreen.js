import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
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

export default function DetalleUsuariosScreen() {
  const parametros = useLocalSearchParams();

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

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

  const eliminarUsuario = async () => {
    if (!id) {
      mostrarMensaje('Error', 'No se pudo identificar el usuario.');
      return;
    }

    try {
      setCargando(true);
      setMostrarModalEliminar(false);

      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: crearBasicAuth(),
        },
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos?.detail || 'No se pudo eliminar el usuario.');
      }

      mostrarMensaje('Exito', 'Usuario eliminado correctamente.');
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
        <Text style={styles.titulo}>Detalle de Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          placeholder="Nombre del usuario"
          editable={false}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={edad}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          editable={false}
        />

        <View style={styles.bloqueBotones}>
          <Pressable
            style={({ pressed }) => [
              styles.botonBase,
              styles.botonActualizar,
              pressed && styles.botonPresionado,
            ]}
            onPress={() =>
              router.push({
                pathname: '/actualizar-usuario',
                params: {
                  id: String(id ?? ''),
                  nombre,
                  edad,
                },
              })
            }
            disabled={cargando}
          >
            <Text style={[styles.textoBoton, styles.textoActualizar]}>Actualizar</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.botonBase,
              styles.botonEliminar,
              pressed && styles.botonPresionado,
            ]}
            onPress={() => setMostrarModalEliminar(true)}
            disabled={cargando}
          >
            <Text style={styles.textoBoton}>Eliminar</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        transparent
        visible={mostrarModalEliminar}
        animationType="fade"
        onRequestClose={() => setMostrarModalEliminar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>

            <Text style={styles.modalTexto}>
              ¿Estás seguro de que deseas eliminar al usuario{' '}
              {nombre.trim() || 'seleccionado'}?
            </Text>

            <View style={styles.modalBotones}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalBoton,
                  styles.modalCancelar,
                  pressed && styles.modalPresionado,
                ]}
                onPress={() => setMostrarModalEliminar(false)}
                disabled={cargando}
              >
                <Text style={styles.modalTextoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.modalBoton,
                  styles.modalEliminar,
                  pressed && styles.modalPresionado,
                ]}
                onPress={eliminarUsuario}
                disabled={cargando}
              >
                <Text style={styles.modalTextoEliminar}>Sí, eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    opacity: 0.9,
  },

  bloqueBotones: {
    gap: 12,
    marginTop: 18,
    alignItems: 'center',
  },

  botonBase: {
    width: 130,
    paddingVertical: 7,
    borderRadius: 6,
    alignItems: 'center',
  },

  botonActualizar: {
    backgroundColor: '#F2C300',
  },

  botonEliminar: {
    backgroundColor: '#D92D20',
  },

  botonPresionado: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  textoActualizar: {
    color: '#1F2937',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D92D20',
    textAlign: 'center',
    marginBottom: 14,
  },

  modalTexto: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },

  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },

  modalBoton: {
    minWidth: 95,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalCancelar: {
    backgroundColor: '#E5E7EB',
  },

  modalEliminar: {
    backgroundColor: '#D92D20',
  },

  modalTextoCancelar: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },

  modalTextoEliminar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  modalPresionado: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});