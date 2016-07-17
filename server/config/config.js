import * as prodConfig from './prod';
import * as devConfig from './dev';

let config = {};
if(process.env.NODE_ENV === 'production') {
  config = prodConfig;
} else {
  config = devConfig;
}

export default config;
