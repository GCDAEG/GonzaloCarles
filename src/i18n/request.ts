import { hasLocale } from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
 import { notFound } from 'next/navigation';
 const locales = ['en', 'es'];

 
export default getRequestConfig(async ({requestLocale}) => {
  // Static for now, we'll change this later
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested)
    ? requested
    : "en";
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});