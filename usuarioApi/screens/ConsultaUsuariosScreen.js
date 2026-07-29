import React, { useCallback, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function ConsultaUsuariosScreen() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch('http://10.134.29.44:5000/v1/usuarios/');
      const datos = await respuesta.json();
      console.log(datos);

      setUsuarios(datos.usuarios);
    }catch (error){
      console.error('Error al obtener los usuarios:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderTarjeta = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPresionada]}
      onPress={() =>
        router.push({
          pathname: '/detalle-usuarios',
          params: {
            id: String(item.id),
            nombre: item.nombre,
            edad: String(item.edad),
          },
        })
      }
    >

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

    </Pressable>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardPresionada: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

});