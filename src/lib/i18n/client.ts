'use client';

import { createI18nClient } from 'next-international/client';

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient({
  en: () => import('@/locales/en'),
  hi: () => import('@/locales/hi'),
  ks: () => import('@/locales/ks'),
  dg: () => import('@/locales/dg'),
  ur: () => import('@/locales/ur'),
  la: () => import('@/locales/la'),
  ba: () => import('@/locales/ba'),
  pa: () => import('@/locales/pa'),
  sh: () => import('@/locales/sh'),
  go: () => import('@/locales/go'),
  pu: () => import('@/locales/pu'),
});
