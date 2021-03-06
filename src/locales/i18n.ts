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

export const formatNumber = (n) => {
  return I18n.toNumber(+n, { strip_insignificant_zeros: true });
}

export const formatCurrency = (v) => {
  return I18n.toCurrency(v);
}

export const translate = (key, option: { case?: string, defaultValue?: string } = {}) => {
  const value = I18n.t(key, { defaultValue: option.defaultValue }) || '';
  if (option.case === 'upperCase') {
    return value.toUpperCase();
  }
  if (option.case === 'lowerCase') {
    return value.toLowerCase();
  }
  return value;
}

export default I18n;