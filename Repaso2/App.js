import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './screens/SplashScreen';
import MainScreen from './screens/MainScreen';

export default function App() {
  const [appLista, setAppLista] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLista(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!appLista) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}
