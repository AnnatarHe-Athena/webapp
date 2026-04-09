import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { fallbackLng, defaultNS, languages } from './settings'

const initI18next = async (lng: string = fallbackLng, ns: string = defaultNS) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) =>
      import(`../../locales/${language}/${namespace}.json`)))
    .init({
      supportedLngs: languages,
      fallbackLng,
      lng,
      fallbackNS: defaultNS,
      defaultNS,
      ns,
    })
  return i18nInstance
}

export async function getTranslation(lng?: string, ns?: string) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng || fallbackLng, ns || defaultNS),
    i18n: i18nextInstance,
  }
}
