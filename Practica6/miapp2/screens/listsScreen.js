import { View, Text, StyleSheet, FlatList, SectionList } from 'react-native';

export default function listScreen() {

  const frutas = [
    { id: '1', nombre: 'Manzana' },
    { id: '2', nombre: 'Plátano' },
    { id: '3', nombre: 'Naranja' },
    { id: '4', nombre: 'Mango' },
    { id: '5', nombre: 'Piña' },
    { id: '6', nombre: 'Uva' },
    { id: '7', nombre: 'Fresa' },
    { id: '8', nombre: 'Naranja' },
    { id: '9', nombre: 'Mandarina'},
    { id: '10', nombre: 'Sandia'},
  ];

  const tareas = [
    { titulo: 'Mañana', data: ['Desayunar','Hacer ejercicio', 'Hacer labores domesticas'] },
    { titulo: 'Tarde', data: ['Estudiar', 'Hacer tarea', 'Comer'] },
    { titulo: 'Noche', data: ['Bañarse', 'Cenar', 'Dormir temprano'] },
  ];  

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>FlatList</Text>
      <FlatList
        data={frutas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.texto}>{item.nombre}</Text>
          </View>
        )}
      />

      <Text style={styles.titulo}>SectionList</Text>
      <SectionList
        sections={tareas}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.tarjeta}>
            <Text style={styles.texto}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.seccionTitulo}>{section.titulo}</Text>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 10, width: '100%'},
  titulo: { fontSize: 18, fontWeight: '700', backgroundColor: '#111', color: '#fff', padding: 6, marginTop: 10},
  seccionTitulo: {fontSize: 15, fontWeight: '700', backgroundColor: '#e9ecef', padding: 6, marginTop: 6},
  tarjeta: {backgroundColor: '#f4f4f4', padding: 10, marginBottom: 6, borderRadius: 6},
  texto: {fontSize: 14, color: '#222'}
})