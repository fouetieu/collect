import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'her.tech.CCMCollect',
  appName: 'CCMCollect',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  cordova: {
    preferences:{
      LottieFullScreen: "true",
      LottieHideAfterAnimationEnd:"true",
      LottieScaleType:"CENTER_CROP",
      LottieAnimationLocation:"public/assets/splash.json"
    }
  }
};

export default config;
