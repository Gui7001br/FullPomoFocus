import { StyleSheet, Text, View } from 'react-native';
import Timer from "./src/components/Timer/index"

export default function App() {
  return (
    <View style={styles.container}>
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BA4949',
    color: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
});

