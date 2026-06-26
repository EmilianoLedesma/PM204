import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function Fomrs() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const EnviarRegistro = () => {
    // 1. Validar que no haya campos vacíos
    if (nombre.trim() === '' || carrera.trim() === '' || semestre.trim() === '') {
      Alert.alert('Campos incompletos', 'Debes llenar todos los campos.');
      return;
    }

    // 2. Validar que semestre sea numérico
    if (isNaN(semestre)) {
      Alert.alert('Error', 'El semestre debe ser un número.');
      return;
    }

    // 3. Mostrar resumen del registro
    Alert.alert(
      'Registro enviado',
      `Nombre: ${nombre}\n` +
      `Carrera: ${carrera}\n` +
      `Semestre: ${semestre}\n\n` +
      `Taller: ${taller ? 'Sí' : 'No'}\n` +
      `Constancia: ${constancia ? 'Sí' : 'No'}\n` +
      `Deportes: ${deportes ? 'Sí' : 'No'}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.titulo}>Registro de Evento Universitario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Carrera"
            value={carrera}
            onChangeText={setCarrera}
          />

          <TextInput
            style={styles.input}
            placeholder="Semestre"
            value={semestre}
            onChangeText={setSemestre}
            keyboardType="numeric"
          />

          <Text style={styles.subtitulo}>Opciones</Text>

          <View style={styles.opcionRow}>
            <Text style={styles.opcionTexto}>¿Asistirá al taller?</Text>
            <Switch value={taller} onValueChange={setTaller} />
          </View>

          <View style={styles.opcionRow}>
            <Text style={styles.opcionTexto}>¿Requiere constancia?</Text>
            <Switch value={constancia} onValueChange={setConstancia} />
          </View>

          <View style={styles.opcionRow}>
            <Text style={styles.opcionTexto}>¿Participará en deportes?</Text>
            <Switch value={deportes} onValueChange={setDeportes} />
          </View>

          <TouchableOpacity style={styles.boton} onPress={EnviarRegistro}>
            <Text style={styles.botonTexto}>Enviar Registro</Text>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  opcionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  opcionTexto: {
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#1e6fe8',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});