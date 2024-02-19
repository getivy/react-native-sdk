import {
  NativeModules,
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-getivy-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type GetivySdkProps = {
  color: string;
  style: ViewStyle;
};

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

const ComponentName = 'GetivySdkView';

export const GetivySdkView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<GetivySdkProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export const initializeDataSession = (dataSessionId: string, environment: number): Promise<boolean> => {
  return GetivySDKManager.initializeDataSession(dataSessionId, environment);
}

export const eventsEmitter = GetivySDKManager

