import { StatusBar } from 'react-native';

import { HomeScreen } from '@/features/home/HomeScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <HomeScreen />
    </>
  );
}
