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
      guard let env = Environment(rawValue: environment) else {
          reject(nil, "Wrong environment value", nil);
          return
      }
    let config = GetivyConfiguration(dataSessionId: dataSessionId, environment: env) { result in
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
          self.sdkHandler = handler
          resolve(true)
        }
    }
  }

  @objc(initializeCheckoutSession:withEnvironment:withResolver:withRejecter:)
  func initializeCheckoutSession(checkoutSessionId: String, environment: Int, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    sdkHandler = nil
      guard let env = Environment(rawValue: environment) else {
          reject(nil, "Wrong environment value", nil);
          return
      }
    let config = GetivyConfiguration(checkoutId: checkoutSessionId, environment: env) { result in
      let convertedResult = ["referenceId": result.referenceId ?? "", "dataSessionId": result.dataSessionId ?? "", "checkoutSessionId": result.checkoutSessionId ?? ""];
      self.emitSuccessEvent(withDetails: NSDictionary(dictionary: convertedResult))
    } onError: { error in
      let convertedError = ["code": error?.code ?? "", "message": error?.message ?? ""];
      self.emitErrorEvent(withError: NSDictionary(dictionary: convertedError))
    }
    
    GetivySDK.shared.initializeHandler(configuration: config, type: SDKFlowType.checkout) { handler, error in
        if let error = error {
            reject(error.code, error.message, nil)
        } else {
          self.sdkHandler = handler
          resolve(true)
        }
    }
  }
    
    @objc(openSDK)
    func openSDK() -> Void {
        DispatchQueue.main.async {
            let topMostController = self.topMostViewController()
            
            self.sdkHandler?.openUI(presentationCosure: { sdkController in
                topMostController?.present(sdkController, animated: true)
                
            }, dismissalClosure: { sdkController in
                sdkController.dismiss(animated: true)
            })
        }
    }
    
    func topMostViewController() -> UIViewController? {
        guard let keyWindow = UIApplication.shared.windows.filter({ $0.isKeyWindow }).first else {
            return nil
        }
        var topController: UIViewController? = keyWindow.rootViewController
        while let presentedViewController = topController?.presentedViewController {
            topController = presentedViewController
        }
        return topController
    }
}
