import PageComponent from "./PageComponent";
import {unstable_setRequestLocale} from 'next-intl/server';
import {getIndexLanguageText, getVideosPageLanguageText} from "~/configs/languageText";
export const runtime = 'edge';
export default async function Videos({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const videosLanguageText = getVideosPageLanguageText();

  return (
    <PageComponent
      locale={locale}
      videosLanguageText={videosLanguageText}
      indexLanguageText={indexLanguageText}
    />
  )
}
