import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-getivy-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const GetivySDK = NativeModules.ReactNativeSdk
  ? NativeModules.ReactNativeSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const initializeDataSession = (
  dataSessionId: string,
  environment: string
): Promise<void> => {
  if (!GetivySDK.initializeDataSession) {
    throw new Error(LINKING_ERROR);
  }
  return GetivySDK.initializeDataSession(dataSessionId, environment);
};

export const initializeCheckoutSession = (
  checkoutSessionId: string,
  environment: string
): Promise<void> => {
  if (!GetivySDK.initializeCheckoutSession) {
    throw new Error(LINKING_ERROR);
  }
  return GetivySDK.initializeCheckoutSession(checkoutSessionId, environment);
};

export const openSDK = () => {
  if (!GetivySDK.openSDK) {
    throw new Error(LINKING_ERROR);
  }
  GetivySDK.openSDK();
};

export const eventsEmitter = GetivySDK;
