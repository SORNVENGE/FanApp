'use strict';
import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.translations = {
    'kh': require('./../Translations/kh'),
    'en': require('./../Translations/en'),
};

export default I18n;