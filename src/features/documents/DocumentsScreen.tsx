import { StyleSheet, Text, View } from 'react-native';
import {
  SpatialCard,
  SpatialScreen,
  spatialStyles,
} from '@/shared/components/SpatialScreen';
import { effects, tokens } from '@/shared/theme';
export function DocumentsScreen() {
  return (
    <SpatialScreen title="Dokumenty">
      <SpatialCard title="Najbliższe terminy" style={styles.deadline}>
        <View style={styles.deadlineContent}>
          <Text style={styles.emptyTitle}>BRAK TERMINÓW</Text>
          <Text style={styles.centeredBody}>
            Twoje ważne daty znajdą tu swoje miejsce.
          </Text>
        </View>
      </SpatialCard>
      <SpatialCard title="Twoje dokumenty">
        <Text style={spatialStyles.eyebrow}>WSZYSTKO W JEDNYM MIEJSCU</Text>
        <Text style={styles.emptyHeading}>Przestrzeń na ważne sprawy</Text>
        <Text style={spatialStyles.body}>
          Nie masz jeszcze dokumentów. Tutaj pojawią się ich kwoty, daty i
          kategorie.
        </Text>
        <Text style={spatialStyles.unavailable}>
          Dodawanie dokumentów jest w przygotowaniu.
        </Text>
      </SpatialCard>
      <View style={spatialStyles.row}>
        {[
          {
            title: 'Kategorie',
            description: 'Miejsce na porządek w dokumentach.',
          },
          { title: 'Archiwum', description: 'Miejsce na zakończone sprawy.' },
        ].map(({ title, description }) => (
          <View key={title} style={spatialStyles.tile}>
            <SpatialCard title={title} style={styles.microCard}>
              <Text style={spatialStyles.body}>{description}</Text>
              <Text style={spatialStyles.unavailable}>W przygotowaniu</Text>
            </SpatialCard>
          </View>
        ))}
      </View>
    </SpatialScreen>
  );
}
const styles = StyleSheet.create({
  deadline: {
    ...effects.violet,
    backgroundColor: tokens.colors.violetTint,
    borderColor: tokens.colors.violetBorder,
  },
  deadlineContent: {
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  emptyTitle: {
    color: tokens.colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1,
  },
  centeredBody: { ...spatialStyles.body, textAlign: 'center' },
  emptyHeading: {
    color: tokens.colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
  },
  microCard: {
    flex: 1,
    borderRadius: tokens.microCardRadius,
    padding: tokens.spacing.lg,
    backgroundColor: tokens.colors.surfaceElevated,
  },
});
