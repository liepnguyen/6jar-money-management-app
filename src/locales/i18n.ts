import I18n from 'react-native-i18n';
import moment from 'moment';

// Import all locales
import en from './en';
import vi from './vi';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  vi
};

const currentLocale = I18n.currentLocale();

// Localizing momentjs to VN or English
if (currentLocale.indexOf('vi') === 0) {
  require('moment/locale/vi.js');
  moment.locale('vi');
} else {
  moment.locale('en');
}

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;