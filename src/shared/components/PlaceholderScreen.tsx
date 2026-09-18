import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  title: string;
  message: string;
};

export function PlaceholderScreen({ title, message }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.message}>{message}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 24, fontWeight: '700', color: '#172033' },
  message: { marginTop: 16, fontSize: 16, color: '#46536b' },
});
