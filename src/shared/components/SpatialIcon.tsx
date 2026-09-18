import { StyleSheet, View } from 'react-native';
import { tokens } from '@/shared/theme';

type IconName = 'camera' | 'documents' | 'settings';

// Geometria ikon bez dodatkowych fontów ani zależności natywnych.
export function SpatialIcon({
  name,
  color = tokens.colors.textSecondary,
}: {
  name: IconName;
  color?: string;
}) {
  return (
    <View
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.icon}
    >
      {name === 'camera' ? (
        <>
          <View style={[styles.cameraTop, { borderColor: color }]} />
          <View style={[styles.camera, { borderColor: color }]}>
            <View style={[styles.lens, { borderColor: color }]} />
          </View>
        </>
      ) : name === 'documents' ? (
        <View style={[styles.document, { borderColor: color }]}>
          <View style={[styles.line, { backgroundColor: color }]} />
          <View style={[styles.line, { backgroundColor: color }]} />
        </View>
      ) : (
        <View style={styles.sliders}>
          {[0, 1, 2].map((row) => (
            <View key={row} style={[styles.rail, { backgroundColor: color }]}>
              <View
                style={[
                  styles.knob,
                  { borderColor: color, left: row === 1 ? 14 : 4 },
                ]}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraTop: {
    position: 'absolute',
    top: 3,
    width: 14,
    height: 7,
    borderWidth: 2,
    borderRadius: 3,
  },
  camera: {
    width: 30,
    height: 22,
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lens: { width: 12, height: 12, borderRadius: 6, borderWidth: 2 },
  document: {
    width: 21,
    height: 26,
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 4,
    justifyContent: 'center',
    gap: 5,
  },
  line: { height: 1.5, width: '100%' },
  sliders: { width: 26, gap: 7 },
  rail: { height: 1.5 },
  knob: {
    position: 'absolute',
    top: -3,
    width: 7,
    height: 7,
    borderWidth: 1.5,
    borderRadius: 4,
    backgroundColor: tokens.colors.surfaceElevated,
  },
});
