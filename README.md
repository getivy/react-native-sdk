# @getivy/react-native-sdk

# Getting Started

- Installation
- Usage

## Step 1: Installation

Add the module to your react native project by executing:

```bash
# using npm
npm install @getivy/react-native-sdk

# OR using Yarn
yarn add @getivy/react-native-sdk
```

Create a personal Github access token with permission _read:packages_ and add the following in your Android application root _build.gradle_ file:

```
allprojects {
        repositories {
            maven {
                name = "GitHub"
                url = uri("https://maven.pkg.github.com/getivy/android-sdk-public")
                credentials {
                    username = <Github_username>
                    password = <Github_token>
                }
            }
        }
    }
```

Even though the Maven repository is public, Github requires this to be able to get the package.

## Step 2: Usage

Import the package:

```
import * as GetivySDK from '@getivy/react-native-sdk';
```

Initialize the SDK with data session or checkout session id and environment:

```
// Data session
GetivySDK.initializeDataSession(dataSessionId, "production");
```

```
// Checkout session
GetivySDK.initializeCheckoutSession(checkoutSessionId, "sandbox");
```

Possible environment values: _production_ and _sandbox_

Open SDK UI:

```
GetivySDK.openSDK();
```

It will open a modal view on top of your application in iOS, and new activity in Android.

Listen for SDK events:

```
import { NativeEventEmitter } from 'react-native';

// Component implementation

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
```

While going through SDK, closing, succeeding to pay or failing, events will be delivered by the listeners.

Refer to the _example_ application for more indepth usage example.
