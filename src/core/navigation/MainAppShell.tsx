import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type {
  MainTabParamList,
  RootStackParamList,
} from '@/core/navigation/types';
import { DocumentsScreen } from '@/features/documents/DocumentsScreen';
import { SettingsScreen } from '@/features/settings/SettingsScreen';
import { tokens } from '@/shared/theme';
const Tabs = createBottomTabNavigator<MainTabParamList>();
function ShellBar({
  state,
  descriptors,
  navigation,
  insets,
  onScan,
}: BottomTabBarProps & { onScan: () => void }) {
  const section = (index: number) => {
    const route = state.routes[index];
    const selected = state.index === index;
    return (
      <Pressable
        key={route.key}
        accessibilityRole="tab"
        accessibilityState={{ selected }}
        accessibilityLabel={descriptors[route.key].options.title}
        onPress={() => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!selected && !event.defaultPrevented)
            navigation.navigate(route.name);
        }}
        onLongPress={() =>
          navigation.emit({ type: 'tabLongPress', target: route.key })
        }
        style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
      >
        <Text style={[styles.label, selected && styles.selected]}>
          {descriptors[route.key].options.title}
        </Text>
      </Pressable>
    );
  };
  return (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(insets.bottom, 12),
          paddingLeft: Math.max(insets.left, 8),
          paddingRight: Math.max(insets.right, 8),
        },
      ]}
    >
      {section(0)}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Skanuj — dodaj dokument"
        onPress={onScan}
        style={({ pressed }) => [styles.scan, pressed && styles.pressed]}
      >
        <Text style={styles.scanLabel}>Skanuj</Text>
      </Pressable>
      {section(1)}
    </View>
  );
}
export function MainAppShell({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Main'>) {
  return (
    <Tabs.Navigator
      initialRouteName="Documents"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <ShellBar
          {...props}
          onScan={() => navigation.navigate('AddDocument')}
        />
      )}
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
const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 12,
    backgroundColor: tokens.colors.surface,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
  },
  tab: {
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  label: {
    color: tokens.colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
  selected: { color: tokens.colors.textPrimary, fontWeight: '700' },
  scan: {
    flex: 1.15,
    minHeight: 60,
    borderRadius: tokens.primaryCtaRadius,
    backgroundColor: tokens.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    elevation: 4,
    shadowColor: tokens.colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  scanLabel: {
    color: tokens.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  pressed: { opacity: 0.75 },
});
