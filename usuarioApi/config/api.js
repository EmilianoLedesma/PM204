import Constants from 'expo-constants';

// ponytail: hostUri only exists in dev (Expo Go / dev client). Release APK
// builds fall back to FALLBACK_HOST — update it if the backend machine's IP changes.
const FALLBACK_HOST = '10.16.72.238';

const getHost = () => {
  const hostUri = Constants.expoConfig?.hostUri ?? Constants.expoGoConfig?.debuggerHost;
  return hostUri ? hostUri.split(':')[0] : FALLBACK_HOST;
};

export const API_URL = `http://${getHost()}:5000/v1/usuarios`;
