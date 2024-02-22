#import <React/RCTBridgeModule.h>
@import GetivySDK;

@interface RCT_EXTERN_MODULE(GetivySDKManager, NSObject)

RCT_EXTERN_METHOD(initializeDataSession:(NSString *)idString withEnvironment:(NSInteger)environment withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(initializeCheckoutSession:(NSString *)idString withEnvironment:(NSInteger)environment withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(openSDK)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
