import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  SpatialCard,
  SpatialScreen,
  spatialStyles,
} from '@/shared/components/SpatialScreen';
import { effects, tokens } from '@/shared/theme';
import { SpatialIcon } from '@/shared/components/SpatialIcon';
export function AddDocumentScreen() {
  return (
    <SpatialScreen title="Skanowanie i OCR" nativeHeader>
      <View style={styles.frame}>
        <View
          pointerEvents="none"
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={StyleSheet.absoluteFill}
        >
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        <SpatialIcon name="camera" />
        <Text style={styles.previewTitle}>Podgląd dokumentu</Text>
        <Text style={styles.previewDescription}>
          Skanowanie i rozpoznawanie tekstu są w przygotowaniu. Aparat jest
          nieaktywny.
        </Text>
      </View>
      <SpatialCard title="Dane z dokumentu" style={styles.panel}>
        <Text style={spatialStyles.unavailable}>
          Sugestie pojawią się po udostępnieniu rozpoznawania tekstu.
        </Text>
        <View style={styles.fields}>
          {['Data', 'Kwota', 'Kategoria'].map((label) => (
            <View key={label} style={styles.field}>
              <Text style={styles.fieldLabel}>{label}</Text>
              <View style={styles.placeholder}>
                <Text style={spatialStyles.unavailable}>Brak sugestii</Text>
              </View>
            </View>
          ))}
        </View>
        <Pressable
          disabled
          accessibilityRole="button"
          accessibilityLabel="Zatwierdź sugestie"
          accessibilityState={{ disabled: true }}
          accessibilityHint="Funkcja w przygotowaniu"
          style={styles.confirm}
        >
          <Text style={styles.confirmLabel}>Zatwierdź sugestie</Text>
        </Pressable>
        <Text style={styles.disabledNote}>
          Zatwierdzanie jest jeszcze niedostępne.
        </Text>
      </SpatialCard>
    </SpatialScreen>
  );
}
const styles = StyleSheet.create({
  frame: {
    minHeight: 320,
    padding: tokens.spacing.section,
    gap: tokens.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.cardRadius,
    backgroundColor: tokens.colors.scannerSurface,
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: tokens.colors.violetText,
  },
  topLeft: {
    top: 16,
    left: 16,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 16,
    right: 16,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 16,
    left: 16,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 16,
    right: 16,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 8,
  },
  previewTitle: {
    color: tokens.colors.textPrimary,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  previewDescription: { ...spatialStyles.body, textAlign: 'center' },
  panel: {
    backgroundColor: tokens.colors.surfaceElevated,
    marginTop: -tokens.spacing.section,
    padding: tokens.spacing.xl,
  },
  fields: { gap: tokens.spacing.lg },
  field: {
    gap: tokens.spacing.sm,
  },
  placeholder: {
    minHeight: tokens.touchTarget,
    justifyContent: 'center',
    padding: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.microCardRadius,
    backgroundColor: tokens.colors.surface,
  },
  fieldLabel: {
    color: tokens.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  confirm: {
    ...effects.cyan,
    minHeight: tokens.touchTarget,
    padding: tokens.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.primaryCtaRadius,
    borderWidth: 1,
    borderColor: tokens.colors.cyanBorder,
    backgroundColor: tokens.colors.cyanTint,
    marginTop: tokens.spacing.sm,
  },
  confirmLabel: {
    color: tokens.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  disabledNote: { ...spatialStyles.unavailable, textAlign: 'center' },
});
