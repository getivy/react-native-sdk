import GetivySDK;
import React

@objc(GetivySDKManager)
class GetivySDKManager: RCTEventEmitter {

  var sdkHandler: UIHandler? = nil

  override func supportedEvents() -> [String]! {
    return ["onSuccess", "onError"]
  }

  func emitSuccessEvent(withDetails details: NSDictionary) {
      self.sendEvent(withName: "onSuccess", body: details)
  }
  
  func emitErrorEvent(withError error: NSDictionary) {
      self.sendEvent(withName: "onError", body: error)
  }

  @objc(initializeDataSession:withEnvironment:withResolver:withRejecter:)
  func initializeDataSession(dataSessionId: String, environment: Int, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    sdkHandler = nil

    let config = GetivyConfiguration(dataSessionId: dataSessionId) { result in
      let convertedResult = ["referenceId": result.referenceId ?? "", "dataSessionId": result.dataSessionId ?? "", "checkoutSessionId": result.checkoutSessionId ?? ""];
      self.emitSuccessEvent(withDetails: NSDictionary(dictionary: convertedResult))
    } onError: { error in
      let convertedError = ["code": error?.code ?? "", "message": error?.message ?? ""];
      self.emitErrorEvent(withError: NSDictionary(dictionary: convertedError))
    }
    
    GetivySDK.shared.initializeHandler(configuration: config, type: SDKFlowType.data) { handler, error in
        if let error = error {
            reject(error.code, error.message, nil)
        } else {
          print("Will initialize ui handler")
          self.sdkHandler = handler
          resolve(true)
        }
    }
  }
}
