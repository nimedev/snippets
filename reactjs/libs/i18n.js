/**
 * @module i18n
 */

import i18n from 'i18next'
import { ENV } from '../constants'

// Import languages
const defaultLanguage = require('../locales/es/translation.json')

/**
 * Configure i18next
 */
export const initI18n = () => {
  i18n
    .init({
      debug: (ENV === 'development'),
      lng: 'es',
      fallbackLng: 'es',
      preload: ['es'],
      resources: {
        es: { translation: defaultLanguage }
      }
    })
}