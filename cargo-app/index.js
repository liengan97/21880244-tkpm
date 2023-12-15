import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Poly fill workaround and use for debug mode only
import { encode, decode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

AppRegistry.registerComponent(appName, () => App);
