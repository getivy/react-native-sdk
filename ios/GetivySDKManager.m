#import <React/RCTBridgeModule.h>
@import GetivySDK;

@interface RCT_EXTERN_MODULE(GetivySDKManager, NSObject)

RCT_EXTERN_METHOD(initializeDataSession:(NSString *)idString withEnvironment:(NSInteger)environment withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
