import React from "react-native";

import {
    StyleSheet, 
    Text, 
    View
} from "react-native";

export default function Timer () {

    const [isPaused, setIsPaused] = useState(true);
  const [isWorking, setIsWorking] = useState(true);
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [newTime, setNewTime] = useState('');

    return (
<View styles={styles.Timer}>
        <Text>Timer</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    Timer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });