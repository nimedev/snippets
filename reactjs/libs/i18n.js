/**
 * @module i18n
 */

import i18n from 'i18next'
import {
  ENV
} from '../constants'

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
        es: {
          translation: defaultLanguage
        }
      }
    })
}

/**
 * Create and object with keys and it i18n namespace.
 * Useful to group error descriptions according to a field.
 * @param {Array} keys - array with the object keys to create de namespace
 * @param {String} namespace - the namespace of the keys
 * @returns {Object} {
     keys0: i18n.t(`${namespace}.${keys0}`),
     keys1: i18n.t(`${namespace}.${keys1}`),
     ....
     keysn: i18n.t(`${namespace}.${keysn}`)
 * }
 */
export const createNamespace = (keys, namespace) => {
  const group = {}
  keys.map(key => (group[key] = i18n.t(`${namespace}.${key}`)))
  return group
}

/**
 * Translate a key value with a given namespace
 * @param {String} namespace - the namespace of the key
 * @param {String} key - key join with the namespace and translate.
 * @returns {String/null} the translation of the key with the namespace or null if key no exists.
 */
export const safeTranslate = (namespace, key) => (key ? i18n.t(`${namespace}.${key}`) : null)

export default defaultLanguage
