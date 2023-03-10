import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  StyleSheet,
  Vibration,
} from 'react-native';
import CountDown from 'react-native-countdown-component';

export default function Timer() {
  const [isPaused, setIsPaused] = useState(true);
  const [isWorking, setIsWorking] = useState(true);
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [newTime, setNewTime] = useState('');

  const countRef = useRef(null);

  const handleStart = () => {
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleFinish = () => {
    Vibration.vibrate(500);
    setIsWorking(!isWorking);
    countRef.current.reset();
    if (!isWorking) {
      setPomodoroCount(pomodoroCount + 1);
    }
    if (pomodoroCount + 1 === 4) {
      setShowBreakModal(true);
    }
  };

  const handleTimeChange = () => {
    Keyboard.dismiss();
    setShowTimeModal(false);
    setWorkTime(parseInt(newTime) * 60);
    setNewTime('');
  };

  const handleBreak = () => {
    setShowBreakModal(false);
    setPomodoroCount(0);
    setIsPaused(true);
    setIsWorking(true);
    setWorkTime(25 * 60);
    setBreakTime(5 * 60);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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