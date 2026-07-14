import {Tabs} from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: "Alta", href:null,}}/>
      <Tabs.Screen name="alta" options={{title: "Alta"}}/>
      <Tabs.Screen name="consulta" options={{title: "Consulta"}}/>
    </Tabs>
  );
}