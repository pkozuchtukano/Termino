import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'react-native';

import type {
  MainTabParamList,
  RootStackParamList,
} from '@/core/navigation/types';
import { DocumentsScreen } from '@/features/documents/DocumentsScreen';
import { SettingsScreen } from '@/features/settings/SettingsScreen';

const Tabs = createBottomTabNavigator<MainTabParamList>();

export function MainAppShell({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Main'>) {
  return (
    <Tabs.Navigator
      initialRouteName="Documents"
      screenOptions={{
        tabBarIcon: () => null,
        tabBarIconStyle: { display: 'none' },
        tabBarLabelStyle: { fontSize: 14 },
        headerRightContainerStyle: { paddingRight: 16 },
        headerRight: () => (
          <Button
            title="Dodaj"
            accessibilityLabel="Dodaj dokument"
            onPress={() => navigation.navigate('AddDocument')}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="Documents"
        component={DocumentsScreen}
        options={{ title: 'Dokumenty' }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Ustawienia' }}
      />
    </Tabs.Navigator>
  );
}
