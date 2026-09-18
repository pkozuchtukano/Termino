import { Text } from 'react-native';
import {
  SpatialCard,
  SpatialScreen,
  spatialStyles,
} from '@/shared/components/SpatialScreen';
export function SettingsScreen() {
  return (
    <SpatialScreen title="Ustawienia">
      <SpatialCard title="Twoja przestrzeń">
        <Text style={spatialStyles.body}>
          Konfiguracja pojawi się w kolejnych etapach. Obecnie nie ma ustawień
          do zmiany.
        </Text>
      </SpatialCard>
    </SpatialScreen>
  );
}
