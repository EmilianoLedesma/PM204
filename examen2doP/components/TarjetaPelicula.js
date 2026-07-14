import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export const Tarjeta = (props) => {
    return (
        <View>
            <View style = {Style.Tarjeta1}><Text>{props.titulo}</Text></View>
            <Text>{props.genero}</Text>
            <Text>{props.pelicula}</Text>
        </View>
    )
}