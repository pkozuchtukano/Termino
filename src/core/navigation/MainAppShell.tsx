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
import { effects, tokens } from '@/shared/theme';
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
        styles.barArea,
        {
          paddingBottom: Math.max(insets.bottom, tokens.spacing.md),
          paddingLeft: insets.left + tokens.spacing.lg,
          paddingRight: insets.right + tokens.spacing.lg,
        },
      ]}
    >
      <View style={styles.bar}>
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
  barArea: { backgroundColor: tokens.colors.background, paddingTop: 16 },
  bar: {
    ...effects.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    borderRadius: tokens.primaryCtaRadius,
    backgroundColor: tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: tokens.colors.border,
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
  selected: { color: tokens.colors.cyan, fontWeight: '700' },
  scan: {
    ...effects.amber,
    flex: 1.15,
    minHeight: 60,
    borderRadius: tokens.primaryCtaRadius,
    backgroundColor: tokens.colors.amber,
    marginTop: -24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  scanLabel: {
    color: tokens.colors.background,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  pressed: { opacity: 0.75 },
});
