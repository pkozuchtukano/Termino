import { StyleSheet, Text, View } from 'react-native';
import {
  SpatialCard,
  SpatialScreen,
  spatialStyles,
} from '@/shared/components/SpatialScreen';
import { tokens } from '@/shared/theme';
export function AddDocumentScreen() {
  return (
    <SpatialScreen title="Miejsce na nowy dokument" nativeHeader>
      <View accessible={false} style={styles.frame}>
        <View style={styles.page}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </View>
      <SpatialCard title="Skanowanie — w przygotowaniu">
        <Text style={spatialStyles.body}>
          Tu rozpocznie się dodawanie dokumentu. Aparat, import i rozpoznawanie
          tekstu nie są jeszcze dostępne.
        </Text>
      </SpatialCard>
    </SpatialScreen>
  );
}
const styles = StyleSheet.create({
  frame: {
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: tokens.colors.primary,
    borderRadius: tokens.cardRadius,
    backgroundColor: tokens.colors.surface,
  },
  page: {
    width: 88,
    height: 112,
    borderWidth: 1,
    borderColor: tokens.colors.textSecondary,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    gap: 12,
    transform: [{ rotate: '-6deg' }],
  },
  line: { height: 2, backgroundColor: tokens.colors.border },
});
