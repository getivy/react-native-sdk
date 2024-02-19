import GetivySDK

class GetivySDKSharedViewController {
    static let shared = GetivySDKSharedViewController()
    
    var sdkViewController: UIHandler? = nil
    
    private init() {}
}