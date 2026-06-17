import { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text,TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SafeAreaScreen() {
  const [mostrarMensaje,setMostrarMensaje] = useState(true);

  return (
    //State: controla si el mensaje de bienvenida se muestra
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Mis Tareas</Text>
      </View>

    {mostrarMensaje &&(
      <View style = {styles.mensaje}>
        <Text style = {styles.mensajeTexto}> Bienvenido de nuevo!</Text>
        <TouchableOpacity onPress={() => setMostrarMensaje(false)}>
          <Text style = {styles.mensajeCerrar}>x</Text>
        </TouchableOpacity>
      </View>
    )}

    <ScrollView style = {styles.scroll}
      contentContainerStyle = {styles.listaContenido}
      showsVerticalScrollIndicator = {false}>

      {['Comprar pan', 'Estudiar para el final', 'Hacer las practicas',
        'Llamar a Dios','Revisar el classroom','Leer 10 paginas',
        'practicar Santeria', 'Sacar a pasear a Saul', 'Arrepentirme de estudiar esta carrera', 'Jugar'
      ].map((tarea,i) => (
        <View key={i} style = {styles.tarjeta}>
          <Text style = {styles.tarjetaTexto}>{tarea}</Text>
        </View>
      ))} 
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  encabezado: { padding: 20, backgroundColor: '#111' },
  titulo: { color: '#fff', fontSize: 22, fontWeight: '700' },
  mensaje: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff3cd', padding: 14, margin: 16, borderRadius:8},
  mensajeTexto: {fontSize: 14, color: '#664d03' },
  mensajeCerrar: {fontSize: 16, fontWeight: '700', color: '#664d03', paddingHorizontal: 6},
  scroll: { flex: 1},
  listaContenido: { padding: 16, paddingBottom: 40 },
  tarjeta: { backgroundColor: '#f4f4f4f4', borderRadius: 10, padding: 16, marginBottom:10 },
  tarjetaTexto: { fontSize: 15, color: '#222'}
});