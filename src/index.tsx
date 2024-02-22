import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-getivy-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const GetivySDKManager = NativeModules.GetivySDKManager
  ? NativeModules.GetivySDKManager
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
  environment: number
): Promise<boolean> => {
  if (!GetivySDKManager.initializeDataSession) {
    throw new Error(LINKING_ERROR);
  }
  console.log('initializeDataSession', dataSessionId, environment);
  return GetivySDKManager.initializeDataSession(dataSessionId, environment);
};

export const initializeCheckoutSession = (
  checkoutSessionId: string,
  environment: number
): Promise<boolean> => {
  if (!GetivySDKManager.initializeCheckoutSession) {
    throw new Error(LINKING_ERROR);
  }
  console.log('initializeCheckoutSession', checkoutSessionId, environment);
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
