import PageComponent from "./PageComponent";
import {unstable_setRequestLocale} from 'next-intl/server';
import {getNavMenu,getIndexLanguageText, getColourPageLanguageText} from "~/configs/languageText";
export const runtime = 'edge';

export default async function IndexPage({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const playgroundText = await getColourPageLanguageText();
  const navMenuText = await getNavMenu();


  return (
    <PageComponent
      locale={locale}
      navMenuText={navMenuText}
      indexLanguageText={indexLanguageText}
      playgroundText={playgroundText}
    >

    </PageComponent>
  )
}
