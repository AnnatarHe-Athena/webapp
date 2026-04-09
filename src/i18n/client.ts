'use client'

import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { fallbackLng, languages, defaultNS, cookieName } from './settings'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) =>
    import(`../../locales/${language}/${namespace}.json`)))
  .init({
    supportedLngs: languages,
    fallbackLng,
    lng: undefined,
    fallbackNS: defaultNS,
    defaultNS,
    detection: {
      order: ['cookie', 'navigator'],
      lookupCookie: cookieName,
      caches: ['cookie'],
    },
  })

export function useTranslation(lng?: string, ns?: string) {
  return useTranslationOrg(ns || defaultNS, { lng: lng || undefined })
}
