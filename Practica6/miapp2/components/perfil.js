/*Perfil Usando desestructuracion */

import { Text, View, Button,StyleSheet } from "react-native";
import React, {useState} from 'react';

export const Perfil = ({nombre,materia,carrera,cuatri,style}) => {
    const [mostrar, setMostrar] = useState(false);

    return (
        <View style={[Styles.tarjeta, style]}>
            <Text style={Styles.nombre}>{nombre}</Text>
            {mostrar && 
                <>
                    <Text style={Styles.otroTexto}>{materia}</Text>
                    <Text style={Styles.carrera}>{carrera}</Text>
                    <Text style={Styles.otroTexto}>{cuatri}</Text>
                </>
            }
            <Button title="Ver Perfil" onPress={() => setMostrar(!mostrar)}/>
        </View>
    )
}

const Styles = StyleSheet.create({
    nombre: {
        fontSize: 24,
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    tarjeta: {
        borderWidth: 2,
        padding: 15,
        margin: 10,
    },
    carrera: {
        fontSize: 24,
        color: 'red',
        fontFamily: 'Roboto',
        fontStyle: 'italic',
    },
    otroTexto: {
        fontSize: 18,
        color: 'rgb(3, 48, 116)',
        fontFamily: 'Roboto',
        fontStyle: 'italic',
    }


});








/* Peril usando Props

import { Text, View } from "react-native";

export const Perfil = (props) => {
    return (
        <View>
            <Text>{props.nombre}</Text>
            <Text>{props.materia}</Text>
            <Text>{props.carrera}</Text>
            <Text>{props.cuatri}</Text>
        </View>
    )
}
 */