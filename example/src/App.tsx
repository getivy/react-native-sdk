import React, { useEffect, useRef } from 'react';
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
  initializeCheckoutSession,
  openSDK,
  initializeDataSession,
  eventsEmitter,
} from '@getivy/react-native-sdk';
import useApiService from './hooks/useApiService';

export default function App() {
  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { postRequest } = useApiService();
  const bankId = 'de-tinktestsuccess';

  const environment = useRef('Sandbox');
  const market = useRef('DE');
  const prefill = useRef(false);
  const dataCheckout = useRef(false);
  const currency = useRef('EUR');

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
    environment.current = e;
    restart();
  };

  const handleMarketChange = (m: string) => {
    market.current = m;
    restart();
  };

  const handlePrefillChange = (isEnabled: boolean) => {
    prefill.current = isEnabled;
    restart();
  };

  const handleDataSessionChange = (isEnabled: boolean) => {
    dataCheckout.current = isEnabled;
    restart();
  };

  const handleCurrencyChange = (c: string) => {
    currency.current = c;
    restart();
  };

  const onRestartPress = () => {
    restart();
  };

  const onOpenSDKPress = () => {
    openSDK();
  };

  const restart = async () => {
    const reponse = await postRequest({
      isDataSession: dataCheckout.current,
      currency: currency.current,
      market: market.current,
      bankId: prefill.current ? bankId : undefined,
      referenceIdString: uuid.v4().toString(),
      environment: environment.current,
    });

    if (reponse.error) {
      Alert.alert('Error:', JSON.stringify(reponse.error));
    } else if (reponse.id) {
      try {
        if (dataCheckout.current) {
          initializeDataSession(reponse.id, environment.current);
        } else {
          initializeCheckoutSession(reponse.id, environment.current);
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
