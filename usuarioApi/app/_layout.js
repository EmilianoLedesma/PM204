import {Stack} from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="detalle-usuarios" options={{headerShown: true, title: ""}}/>
    </Stack>
  );
}