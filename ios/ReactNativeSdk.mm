#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReactNativeSdk, NSObject)

RCT_EXTERN_METHOD(initializeDataSession:(NSString *)idString withEnvironment:(NSString *)environment withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(initializeCheckoutSession:(NSString *)idString withEnvironment:(NSString *)environment withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(openSDK)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
