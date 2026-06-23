import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Switch } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [contador, setContador] = useState(0);

  const [isDark, setIsDark] = useState(false);

  const tema = {
    fondo: isDark ? '#1a1a2e' : '#eef2ff',
    texto: isDark ? '#e2e8f0':'#1e293b',
    tarjeta: isDark ? '#16213e':'#ffffff'
  }

  return (
    <View style={[styles.container, {backgroundColor: tema.fondo}]}>
      <Text style={[styles.titulo, {color: tema.texto}]}>Práctica Pressable</Text>
      <Text style={[styles.contador, {color: tema.texto}]}>Presiones: {contador}</Text>

      <Text style={{color: tema.texto, fontSize: 16}}>
        {isDark ? 'Modo Oscuro' : 'Modo Claro'}
      </Text>
      <Switch
        value={isDark}
        onValueChange={(value) => setIsDark(value)}
        trackColor={{false: '#cbd5e1', true:'#6366f1'}}
        thumbColor={isDark ? '#ffffff': '#f1f5f9'}
      />

      <Pressable
        style={({ pressed }) => [
          styles.boton,
          pressed && styles.botonPresionado,
          contador >= 5 && styles.botonDesactivado
        ]}
        onPress={() => setContador(contador + 1)}
        onPressIn={() => console.log('Empezaste a presionar')}
        onPressOut={() => console.log('Soltaste el botón')}
        onLongPress={() => alert('Presión larga detectada')}
        delayLongPress={1000}
        disabled={contador >= 5}
        hitSlop={10}
        android_ripple={{ color: '#93c5fd' }}
      >
        <Text style={styles.textoBoton}>
          {contador >= 5 ? 'Botón desactivado' : 'Aumentar contador'}
        </Text>
      </Pressable>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contador: {
    fontSize: 20,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  botonPresionado: {
    backgroundColor: '#1e40af',
    transform: [{ scale: 0.96 }],
  },
  botonDesactivado: {
    backgroundColor: '#9ca3af',
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});