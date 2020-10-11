package com.sanafansapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnativecommunity.toolbarandroid.ReactToolbarPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.progressview.RNCProgressViewPackage;
import com.reactnativecommunity.androidprogressbar.RNCProgressBarPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.filepicker.FilePickerPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this lines
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new ReactToolbarPackage(),
            new RNFSPackage(),
            new RNCProgressViewPackage(),
            new RNCProgressBarPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new FilePickerPackage(),
            new RNScreensPackage(),
            new ReanimatedPackage(),
            new ReactNativeConfigPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseFirestorePackage(),
            new RNDeviceInfo(),
            new RNI18nPackage(),
            new VectorIconsPackage(),
            new RNFirebaseStoragePackage(),
            new RNGestureHandlerPackage(),
            new ReactVideoPackage(),
            new RNCWebViewPackage(),
            new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
