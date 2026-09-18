import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { effects, tokens, typography } from '@/shared/theme';
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
        {!nativeHeader && (
          <View style={styles.heading}>
            <Text accessibilityRole="header" style={styles.brand}>
              Termino
            </Text>
            <Text accessibilityRole="header" style={styles.title}>
              {title}
            </Text>
          </View>
        )}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
export function SpatialCard({
  title,
  children,
  style,
  centeredTitle = false,
  titleStyle,
}: PropsWithChildren<{
  title: string;
  style?: StyleProp<ViewStyle>;
  centeredTitle?: boolean;
  titleStyle?: StyleProp<TextStyle>;
}>) {
  return (
    <View style={[styles.card, style]}>
      <Text
        accessibilityRole="header"
        style={[
          styles.cardTitle,
          centeredTitle && { textAlign: 'center' },
          titleStyle,
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
export const spatialStyles = StyleSheet.create({
  body: { ...typography.cardBody, color: tokens.colors.textSecondary },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  tile: { flexGrow: 1, flexBasis: 140 },
  eyebrow: {
    color: tokens.colors.cyan,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  unavailable: {
    color: tokens.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
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
  brand: {
    color: tokens.colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: tokens.colors.textSecondary,
    fontSize: 14,
  },
  heading: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.sm,
  },
  card: {
    ...effects.card,
    backgroundColor: tokens.colors.surface,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.cardRadius,
    padding: 24,
    gap: 12,
  },
  cardTitle: {
    ...typography.cardTitle,
    color: tokens.colors.textPrimary,
  },
});
