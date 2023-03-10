import { useState, useRef } from 'react';
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
  const [newTime, setNewTime] = useState(25);

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
    setNewTime();
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
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <CountDown
          size={60}
          until={workTime}
          onFinish={handleFinish}
          onPress={isPaused ? handleStart : handlePause}
          timeToShow={['M', 'S']}
          timeLabels={{ m: '', s: '' }}
          digitStyle={styles.digitStyle}
          digitTxtStyle={styles.digitTxtStyle}
          separatorStyle={styles.separatorStyle}
          running={!isPaused}
          showSeparator
        />
        <Text style={styles.timerText}>{isWorking ? 'Work' : 'Break'}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setShowTimeModal(true)}>
        <Text style={styles.buttonText}>Change time</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setShowBreakModal(true)}>
        <Text style={styles.buttonText}>Take a break</Text>
      </TouchableOpacity>
      <Text style={styles.pomodoroCountText}>{`Pomodoros done: ${pomodoroCount}`}</Text>
      {showTimeModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Change work time</Text>
            <TextInput
              style={styles.modalInput}
              value={newTime}
              placeholder="New time in minutes"
              keyboardType="number-pad"
              onChangeText={text => setNewTime(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleTimeChange}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showBreakModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Take a break</Text>
            <Text style={styles.modalText}>You completed 4 pomodoros! Time for a break.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleBreak}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BA4949',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  digitStyle: {
    backgroundColor: '#1B1B1B',
    borderWidth: 2,
    borderColor: '#FAB81E',
  },
  digitTxtStyle: { color: '#FAB81E' },
  separatorStyle: { color: '#FAB81E' },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#FAB81E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#1B1B1B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pomodoroCountText: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: 150,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FAB81E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});