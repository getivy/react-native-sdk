import * as React from 'react';
import { useEffect } from 'react';

import { Button, NativeEventEmitter, StyleSheet, View } from 'react-native';
import { GetivySdkView, initializeDataSession, eventsEmitter } from 'react-native-getivy-sdk';

export default function App() {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(eventsEmitter);
    const onSuccess = eventEmitter.addListener('onSuccess', (eventData) => {
      console.log('Received success event from native module:', eventData);
    });

    const onError = eventEmitter.addListener('onError', (eventData) => {
      console.log('Received error event from native module:', eventData);
    });

    return () => {
      onSuccess.remove(); 
      onError.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Button title="Initialize Data Session" onPress={() => {
        initializeDataSession('dataSessionId', 2);
      }} />
      <GetivySdkView color="#32a852" style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
