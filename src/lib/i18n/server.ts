import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
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
