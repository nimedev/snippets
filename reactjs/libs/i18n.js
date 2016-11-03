/**
 * @module i18n
 */

// Dependencies
import i18n from 'i18next'
import { constants } from '../constants'

// Import languages
const defaultLanguage = require('../locales/es/translation.json')

// Configure i18next
i18n
  .init({
    debug: (constants.env === 'development'),
    lng: 'es',
    fallbackLng: 'es',
    preload: ['es'],
    resources: {
      es: { translation: defaultLanguage }
    }
  })

export default i18n