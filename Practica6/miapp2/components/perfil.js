/*Perfil Usando desestructuracion */

import { Text, View, Button } from "react-native";
import React, {useState} from 'react';

export const Perfil = ({nombre,materia,carrera,cuatri}) => {
    const [mostrar, setMostrar] = useState(false);

    return (
        <View>
            <Text>{nombre}</Text>
            {mostrar && 
                <>
                    <Text>{materia}</Text>
                    <Text>{carrera}</Text>
                    <Text>{cuatri}</Text>
                </>
            }
            <Button title="Ver Perfil" onPress={() => setMostrar(!mostrar)}/>
        </View>
    )
}








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