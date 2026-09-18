import { Text } from 'react-native';
import {
  SpatialCard,
  SpatialScreen,
  spatialStyles,
} from '@/shared/components/SpatialScreen';
export function SettingsScreen() {
  return (
    <SpatialScreen title="Ustawienia">
      {[
        {
          title: 'Synchronizacja',
          description:
            'Łączenie danych między urządzeniami nie jest jeszcze dostępne.',
        },
        {
          title: 'Powiadomienia',
          description: 'Przypomnienia o terminach nie są jeszcze dostępne.',
        },
        {
          title: 'Dane lokalne',
          description:
            'Zarządzanie zapisanymi danymi nie jest jeszcze dostępne.',
        },
      ].map(({ title, description }) => (
        <SpatialCard key={title} title={title}>
          <Text style={spatialStyles.unavailable}>
            W przygotowaniu · Niedostępne
          </Text>
          <Text style={spatialStyles.body}>{description}</Text>
        </SpatialCard>
      ))}
    </SpatialScreen>
  );
}
