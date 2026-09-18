import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '@/shared/theme';
export function SpatialScreen({
  title,
  children,
  nativeHeader = false,
}: PropsWithChildren<{ title: string; nativeHeader?: boolean }>) {
  return (
    <SafeAreaView
      style={styles.screen}
      edges={
        nativeHeader ? ['left', 'right', 'bottom'] : ['top', 'left', 'right']
      }
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>Terminie</Text>
        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
export function SpatialCard({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.card}>
      <Text accessibilityRole="header" style={styles.cardTitle}>
        {title}
      </Text>
      {children}
    </View>
  );
}
export const spatialStyles = StyleSheet.create({
  body: { color: tokens.colors.textSecondary, fontSize: 16, lineHeight: 24 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  tile: { flexGrow: 1, flexBasis: 240 },
});
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.colors.background },
  content: {
    padding: 20,
    gap: 20,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingBottom: 32,
  },
  brand: { color: tokens.colors.textSecondary, fontSize: 14, letterSpacing: 2 },
  title: {
    color: tokens.colors.textPrimary,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  card: {
    backgroundColor: tokens.colors.surface,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.cardRadius,
    padding: 24,
    gap: 12,
  },
  cardTitle: {
    color: tokens.colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
});
