package com.learnreactnative;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import com.google.firebase.database.FirebaseDatabase;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;


// import android.app.Application;

// import com.facebook.react.ReactApplication;
// import com.facebook.react.ReactNativeHost;
// import com.facebook.react.ReactPackage;
// import com.facebook.react.shell.MainReactPackage;
// import com.facebook.soloader.SoLoader;

// import io.invertase.firebase.RNFirebasePackage;
// // optional packages - add/remove as appropriate
// import io.invertase.firebase.admob.RNFirebaseAdMobPackage; //Firebase AdMob
// import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // Firebase Analytics
// import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
// import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
// import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database
// import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // Firebase Firestore
// import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage; // Firebase Instance ID
// import io.invertase.firebase.links.RNFirebaseLinksPackage; // Firebase Dynamic Links
// import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
// import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; // Firebase Notifications
// import io.invertase.firebase.perf.RNFirebasePerformancePackage; // Firebase Performance
// import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage
// import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage; // Crashlytics

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
          new RNFirebasePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage(), {
          new RNFirebaseAuthPackage(),
          new RNFirebaseDatabasePackage()
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
