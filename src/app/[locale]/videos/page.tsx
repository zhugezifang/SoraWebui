import PageComponent from "./PageComponent";
import {unstable_setRequestLocale} from 'next-intl/server';
import {getNavMenu, getIndexLanguageText, getVideosPageLanguageText} from "~/configs/languageText";
export const runtime = 'edge';
export default async function Videos({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const videosLanguageText = getVideosPageLanguageText();
  const navMenuText = await getNavMenu();

  return (
    <PageComponent
      locale={locale}
      navMenuText={navMenuText}
      videosLanguageText={videosLanguageText}
      indexLanguageText={indexLanguageText}
    />
  )
}
