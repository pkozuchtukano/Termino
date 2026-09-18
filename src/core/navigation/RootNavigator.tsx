import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainAppShell } from '@/core/navigation/MainAppShell';
import type { RootStackParamList } from '@/core/navigation/types';
import { AddDocumentScreen } from '@/features/add-document/AddDocumentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainAppShell}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDocument"
        component={AddDocumentScreen}
        options={{ title: 'Dodaj dokument' }}
      />
    </Stack.Navigator>
  );
}
