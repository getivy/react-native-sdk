import React, { useEffect, useState } from 'react';
import { ScrollView, Button, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import CurrencyPicker from './components/CurrencyPicker';
import EnvironmentPicker from './components/EnvironmentPicker';
import MarketTextInput from './components/MarketTextInput';
import TextWithSwitch from './components/TextWithSwitch';
import uuid from 'react-native-uuid';

import { NativeEventEmitter } from 'react-native';
import {
  // GetivySdkView,
  initializeCheckoutSession,
  openSDK,
  initializeDataSession,
  eventsEmitter,
} from '@getivy/react-native-getivy-sdk';
import useApiService from './hooks/useApiService';

export default function App() {
  const { postRequest } = useApiService();
  const bankId = 'de-tinktestsuccess';

  const [environment, setEnvironment] = useState('Sandbox');
  const [market, setMarket] = useState('DE');
  const [prefill, setPrefill] = useState(false);
  const [dataCheckout, setDataCheckout] = useState(false);
  const [currency, setCurrency] = useState('EUR');

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(eventsEmitter);
    const onSuccess = eventEmitter.addListener('onSuccess', (eventData) => {
      Alert.alert('Success', JSON.stringify(eventData));
    });

    const onError = eventEmitter.addListener('onError', (eventData) => {
      Alert.alert('Error', JSON.stringify(eventData));
    });

    return () => {
      onSuccess.remove();
      onError.remove();
    };
  }, []);

  const handleEnvironmentChange = (e: string) => {
    setEnvironment(e);
  };

  const handleMarketChange = (m: string) => {
    setMarket(m);
  };

  const handlePrefillChange = (isEnabled: boolean) => {
    setPrefill(isEnabled);
  };

  const handleDataSessionChange = (isEnabled: boolean) => {
    setDataCheckout(isEnabled);
  };

  const handleCurrencyChange = (c: string) => {
    setCurrency(c);
  };

  const onRestartPress = () => {
    restart();
  };

  const onOpenSDKPress = () => {
    openSDK();
  };

  const restart = async () => {
    const reponse = await postRequest({
      isDataSession: dataCheckout,
      currency,
      market,
      bankId: prefill ? bankId : undefined,
      referenceIdString: uuid.v4().toString(),
      environment,
    });

    if (reponse.error) {
      Alert.alert('Error:', JSON.stringify(reponse.error));
    } else if (reponse.id) {
      try {
        if (dataCheckout) {
          initializeDataSession(reponse.id, environment);
        } else {
          initializeCheckoutSession(reponse.id, environment);
        }
      } catch (e) {
        Alert.alert('Error:', JSON.stringify(e));
      }
    } else {
      Alert.alert('Error:', 'No id or error in response');
    }
  };

  return (
    <SafeAreaViewStyled>
      <ScrollViewStyled>
        <EnvironmentPicker onValueChange={handleEnvironmentChange} />
        <MarketTextInput onValueChange={handleMarketChange} />
        <TextWithSwitch
          textValue="Prefill de-tinktestsuccess"
          initialSwitchState={false}
          onSwitchChange={handlePrefillChange}
        />
        <TextWithSwitch
          textValue="on: data, off: checkout"
          initialSwitchState={false}
          onSwitchChange={handleDataSessionChange}
        />
        <CurrencyPicker onCurrencyChange={handleCurrencyChange} />
        <ButtonsContainer>
          <Button title="Restart" onPress={onRestartPress} />
          <Button title="Open SDK" onPress={onOpenSDKPress} />
        </ButtonsContainer>
      </ScrollViewStyled>
    </SafeAreaViewStyled>
  );
}

const SafeAreaViewStyled = styled(SafeAreaView)`
  flex: 1;
`;

const ScrollViewStyled = styled(ScrollView).attrs({
  contentContainerStyle: { alignItems: 'center' },
})`
  width: 100%;
`;

const ButtonsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;
