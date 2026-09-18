import { Text, View } from 'react-native';
import {
  SpatialCard,
  SpatialScreen,
  spatialStyles,
} from '@/shared/components/SpatialScreen';
export function DocumentsScreen() {
  return (
    <SpatialScreen title="Dokumenty">
      <SpatialCard title="Najbliższe terminy">
        <Text style={spatialStyles.body}>
          Nie masz jeszcze zapisanych terminów.
        </Text>
      </SpatialCard>
      <View style={spatialStyles.row}>
        <View style={spatialStyles.tile}>
          <SpatialCard title="Twoje dokumenty">
            <Text style={spatialStyles.body}>
              Tu znajdziesz swoje dokumenty. Na razie jest tu pusto.
            </Text>
          </SpatialCard>
        </View>
        <View style={spatialStyles.tile}>
          <SpatialCard title="Miejsce na ważne sprawy">
            <Text style={spatialStyles.body}>
              Porządkowanie dokumentów pojawi się w kolejnych etapach.
            </Text>
          </SpatialCard>
        </View>
      </View>
    </SpatialScreen>
  );
}
