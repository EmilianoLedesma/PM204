// --- Importaciones ---
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';

// --- Componente principal ---
export default function modalScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => setBottomSheetVisible(!bottomSheetVisible);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Práctica de componentes</Text>

      <Pressable style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Abrir modal clásico</Text>
      </Pressable>

      <Pressable style={styles.buttonSecondary} onPress={toggleBottomSheet}>
        <Text style={styles.ButtonText}>Abrir bottom sheet</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Este es un modal centrado clásico.</Text>
            <Pressable style={styles.buttonClose} onPress={toggleModal}>
              <Text style={styles.textStyle}>Cerrar modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={bottomSheetVisible} onRequestClose = {toggleBottomSheet}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetView}>
            <Text style = {styles.modalText}>Este es un bottom sheet nativo.</Text>
            <Pressable style = {styles.buttonClose} onPress={toggleBottomSheet}>
              <Text style = {styles.textStyle}>Ocultar panel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' },
  title: { fontSize: 24, marginBottom: 30, fontWeight: '600' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginVertical: 10, width: 200, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalView: { width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', elevation: 5 },
  buttonClose: { backgroundColor: '#FF3B30', padding: 12, borderRadius: 10, marginTop: 15, width: '100%' },
  textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalText: { marginBottom: 20, textAlign: 'center', fontSize: 16 },
  buttonSecondary: {backgroundColor: '#34C759', padding: 15, borderRadius: 10, marginVertical: 10, width: 200, alignItems: 'center'},
  bottomSheetContainer: {flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0, 0.6)'},
  bottomSheetView: {backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 35, alignItems: 'center', elevation: 5}
});
