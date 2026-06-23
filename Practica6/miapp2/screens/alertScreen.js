// Zona 1: Importaciones de componentes y archivos
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Alert, Platform, Button } from 'react-native';

// Zona 2: Es el main, o mejor dicho, el lugar donde irán los componentes
export default function AlertScreen() {
  const [nombre, SetNombre] = useState ('');
  const [email, SetEmail] = useState ('');
  const [pass, SetPass] = useState ('');
  const [numero, SetNumero] = useState ('');
  const [telefono, SetTelefono] = useState ('');
  const [busqueda, SetBusqueda] = useState ('');
  const [comentario, SetComentario] = useState ('');
  const [decimal, SetDecimal] = useState ('');

  const campos = [
    {label: "Nombre", value: nombre},
    {label: "Email", value: email},
    {label: "Contrasena", value: pass ? 'Ingresada': 'No Ingresada'},
    {label: "Edad", value: numero},
  ];

  const MostrarAlerta = (titulo, mensaje, botones) => {
    if (Platform.OS === 'web'){
      window.alert('${titulo\n{mensaje}');
      return;
    }
    Alert.alert (titulo, mensaje, botones);
  }

  //Alerta1
  const confirmarEnvio = () => {
    MostrarAlerta (
      'Confirmar Envio',
      'Si esta seguro de confirmar el envio',
      [
        {
          text: 'Cancelar',
          onPress: () => MostrarAlerta('Cancelado', 'No se envio nada'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => MostrarAlerta('Enviado', 'El pedido se ha enviado')
        }
      ]
    );
  };

  //Alerta2
  const validarNombre = () => {
    if (nombre === ''){
      MostrarAlerta('Campo Vacio', 'Por favor escribe tu nombre');
    }else {
      MostrarAlerta('Nombre guardado', 'Hola! ${nombre}')
    }
  };

  //Alert3
  const validarEmail = () => {
    if(email===''){
      MostrarAlerta('Campo Vacio', 'Por favor escribe tu email');
    }else if(!email.includes('@')){
      MostrarAlerta('Error', 'Ingresa un email valido')
    }else {
      MostrarAlerta('Tu email es valido', 'Felicidades')
    }
  }

  return (
    <ScrollView style = {styles.container}>
      <Text style = {styles.label}>Ejemplos de Input</Text>
      <Text style = {styles.label}>Nombre</Text>
      <TextInput
        value = {nombre}
        onChangeText={SetNombre}
        placeholder='Escribe tu nombre'
        autoCapitalize='words'
        style = {styles.input}
      />

      <Text style = {styles.label}>Email</Text>
      <TextInput
        value = {email}
        onChangeText={SetEmail}
        placeholder='Escribe tu email'
        keyboardType='email-address'
        autoCapitalize='none'
        style = {styles.input}
        />

      <Text style = {styles.label}>Password</Text>
      <TextInput
        value = {pass}
        onChangeText={SetPass}
        placeholder='**********'
        secureTextEntry={true}
        maxLength={8}
        keyboardType='numeric'
        style = {styles.input}
      />

      <Text style = {styles.label}>Edad</Text>
      <TextInput
        value = {numero}
        onChangeText={SetNumero}
        placeholder='Escribe tu edad'
        keyboardType='numeric'
        style = {styles.input}
      />

      <Text style = {styles.label}>Telefono</Text>
      <TextInput
        value = {telefono}
        onChangeText={SetTelefono}
        placeholder='Escribe tu telefono'
        keyboardType='phone-pad'
        style = {styles.input}
      />

      <Text style = {styles.label}>Busqueda</Text>
      <TextInput
        value = {busqueda}
        onChangeText={SetBusqueda}
        placeholder='Escribe tu busqueda'
        returnKeyType='search'
        style = {styles.input}
      />

      <Text style = {styles.label}>Precio</Text>
      <TextInput
        value = {decimal}
        onChangeText={SetDecimal}
        placeholder='15.5'
        keyboardType='decimal-pad'
        style = {styles.input}
      />

      <Text style = {styles.label}>Comentario</Text>
      <TextInput
        value = {comentario}
        onChangeText={SetComentario}
        placeholder='Escribe tu comentario'
        multiline={true}
        numberOfLines={4}
        keyboardType='default'
        style = {styles.input}
      />

      <View style = {styles.BotonesContainer}>
        <View style = {styles.botonWrapper}>
          <Button title='Guardar nombre' onPress={validarNombre}></Button>
        </View>
        <View style = {styles.botonWrapper}>
          <Button title='Guardar email' onPress={validarEmail}></Button>
        </View>
      </View>
    </ScrollView>
  );
}

// Zona 3: Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 12
  },
  title: {fontSize: 22, 
    fontWeight: '600', 
    marginBottom: 20},
  input: {borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
  },
  BotonesContainer: {marginTop: 20,
    gap: 8
  },
  botonWrapper: {marginBottom:4
  }
});
