import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-getivy-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const GetivySDKManager = NativeModules.GetivySdk
  ? NativeModules.GetivySdk
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
  if (!GetivySDKManager.initializeDataSession) {
    throw new Error(LINKING_ERROR);
  }
  return GetivySDKManager.initializeDataSession(dataSessionId, environment);
};

export const initializeCheckoutSession = (
  checkoutSessionId: string,
  environment: string
): Promise<void> => {
  if (!GetivySDKManager.initializeCheckoutSession) {
    throw new Error(LINKING_ERROR);
  }
  return GetivySDKManager.initializeCheckoutSession(
    checkoutSessionId,
    environment
  );
};

export const openSDK = () => {
  if (!GetivySDKManager.openSDK) {
    throw new Error(LINKING_ERROR);
  }
  GetivySDKManager.openSDK();
};

export const eventsEmitter = GetivySDKManager;
