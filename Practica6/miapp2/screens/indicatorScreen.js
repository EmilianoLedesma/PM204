// IMPORTACIONES

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';


// COMPONENTE PRINCIPAL

export default function IndicatorScreen() {

  const AZUL = '#021a57';

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const [cargando, setCargando] = useState(false);
  const [logueado, setLogueado] = useState(false);
  const [error, setError] = useState('');
  const [saliendo, setSaliendo] = useState(false);

  // LOGIN

  const iniciarSesion = () => {

    if (!nombre || !correo || !contrasena || !confirmarContrasena)
      return setError('Completa campos');

    if (!correo.includes('@'))
      return setError('Correo inválido');

    if (contrasena !== confirmarContrasena)
      return setError('Las contraseñas no coinciden');

    setError('');
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setLogueado(true);
    }, 1200);
  };

  // LOGOUT

  const cerrarSesion = () => {

    setSaliendo(true);

    setTimeout(() => {
      setLogueado(false);
      setNombre('');
      setCorreo('');
      setContrasena('');
      setConfirmarContrasena('');
      setError('');
      setSaliendo(false);
    }, 1000);
  };

  // PANTALLA LOGUEADO
  

  if (logueado) {
    return (
      <View style={[styles.pantallaLogueado, { backgroundColor: AZUL }]}>

        <Text style={styles.titulo}>Bienvenid@ {nombre}</Text>

        {saliendo ? (
          <>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.textoSalida}>Saliendo...</Text>
          </>
        ) : (
          <TouchableOpacity style={styles.botonCerrarSesion} onPress={cerrarSesion}>
            <Text style={styles.textoBoton}>Cerrar sesión</Text>
          </TouchableOpacity>
        )}

        <StatusBar style="light" />
      </View>
    );
  }

  // FORMULARIO
  return (
    <KeyboardAvoidingView
      style={styles.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView contentContainerStyle={styles.scrollContenido}>

        <Image
          source={require('../assets/fondo1.jpg')}
          style={styles.imagen}
        />

        <Text style={[styles.titulo, { color: AZUL }]}>
          Inicio de sesión
        </Text>

        <TextInput
          style={[styles.campoTexto, { borderColor: AZUL, color: AZUL }]}
          placeholder="Nombre"
          placeholderTextColor="#666"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={[styles.campoTexto, { borderColor: AZUL, color: AZUL }]}
          placeholder="Correo"
          placeholderTextColor="#666"
          value={correo}
          onChangeText={setCorreo}
        />

        <TextInput
          style={[styles.campoTexto, { borderColor: AZUL, color: AZUL }]}
          placeholder="Contraseña"
          placeholderTextColor="#666"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />

        <TextInput
          style={[styles.campoTexto, { borderColor: AZUL, color: AZUL }]}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#666"
          value={confirmarContrasena}
          onChangeText={setConfirmarContrasena}
          secureTextEntry
        />

        {!!error && (
          <Text style={[styles.textoError, { color: AZUL }]}>
            {error}
          </Text>
        )}

        {cargando ? (
          <ActivityIndicator size="large" color={AZUL} />
        ) : (
          <TouchableOpacity
            style={[styles.botonIngresar, { backgroundColor: AZUL }]}
            onPress={iniciarSesion}
          >
            <Text style={styles.textoBoton}>Ingresar</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 120 }} />

      </ScrollView>

      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}


// ESTILOS

const styles = StyleSheet.create({

  contenedor: {
    flex: 1,
    backgroundColor: '#fff'
  },

  scrollContenido: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40
  },

  pantallaLogueado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },

  campoTexto: {
    width: '85%',
    borderWidth: 1,
    marginVertical: 6,
    padding: 12,
    fontSize: 18
  },

  botonIngresar: {
    padding: 14,
    marginTop: 15,
    borderRadius: 8
  },

  botonCerrarSesion: {
    padding: 14,
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: '#ac0707'
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },

  textoError: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16
  },

  textoSalida: {
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18
  },

  imagen: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10
  }
});