import { StyleSheet, Text, View } from 'react-native';
import {
  SpatialCard,
  SpatialScreen,
  spatialStyles,
} from '@/shared/components/SpatialScreen';
import { effects, tokens, typography } from '@/shared/theme';
export function DocumentsScreen() {
  return (
    <SpatialScreen title="Dokumenty">
      <SpatialCard
        title="Najbliższe terminy"
        centeredTitle
        style={styles.deadline}
        titleStyle={typography.deadlineTitle}
      >
        <View style={styles.deadlineContent}>
          <Text style={styles.emptyTitle}>BRAK TERMINÓW</Text>
          <Text style={styles.centeredBody}>
            Twoje ważne daty znajdą tu swoje miejsce.
          </Text>
        </View>
      </SpatialCard>
      <SpatialCard title="Twoje dokumenty">
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
    ...effects.deadline,
    backgroundColor: tokens.colors.deadlineSurface,
    borderColor: tokens.colors.deadlineEdge,
    borderTopColor: tokens.colors.deadlineHighlight,
    borderLeftColor: tokens.colors.deadlineHighlight,
    borderRadius: tokens.microCardRadius,
    paddingVertical: tokens.spacing.xl,
  },
  deadlineContent: {
    minHeight: 110,
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  emptyTitle: {
    ...typography.deadlineValue,
    color: tokens.colors.violetText,
  },
  centeredBody: { ...spatialStyles.body, textAlign: 'center' },
  microCard: {
    flex: 1,
    borderRadius: tokens.microCardRadius,
    padding: tokens.spacing.lg,
    backgroundColor: tokens.colors.surfaceElevated,
  },
});
