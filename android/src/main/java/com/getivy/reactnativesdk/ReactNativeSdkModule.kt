package com.getivy.reactnativesdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.getivy.sdk.GetivySDK
import io.getivy.sdk.data.SDKFlowType
import io.getivy.sdk.handler.Handler

class ReactNativeSdkModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var handler: Handler? = null

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun initializeDataSession(dataSessionId: String, environment: String, promise: Promise) {
    handler = null
    GetivySDK.createHandler(
      context = currentActivity!!.applicationContext,
      sessionId = dataSessionId,
      type = SDKFlowType.DATA,
      environment = environment)
    { handler ->
      this.handler = handler
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun initializeCheckoutSession(checkoutSessionId: String, environment: String, promise: Promise) {
    handler = null
    GetivySDK.createHandler(
      context = currentActivity!!.applicationContext,
      sessionId = checkoutSessionId,
      type = SDKFlowType.CHECKOUT,
      environment = environment)
    { handler ->
      this.handler = handler
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun openSDK() {
    handler?.open {

      when (it) {
        is Handler.Result.Success -> {
          val eventData: WritableMap = Arguments.createMap().apply {
            putString("sessionId", it.dataId)
            putString("referenceId", it.referenceId)
          }

          reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("onSuccess", eventData)
        }
        is Handler.Result.Error -> {
          val eventData: WritableMap = Arguments.createMap().apply {
            putString("code", it.code)
            putString("message", it.message)
          }

          reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("onError", eventData)
        }
      }
    }
  }

  companion object {
    const val NAME = "ReactNativeSdk"
  }
}
