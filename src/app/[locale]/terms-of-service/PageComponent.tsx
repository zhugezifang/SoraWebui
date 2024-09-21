'use client';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import HeadInfo from "~/components/HeadInfo";
export const runtime = 'edge';
const PageComponent = ({
                         locale = '',
                         navMenuText,
                         termsOfServiceLanguageText,
                         indexLanguageText,
                       }) => {

  return (
    <>
      <HeadInfo
        title={termsOfServiceLanguageText.title}
        description={termsOfServiceLanguageText.description}
        locale={locale}
        page={"/terms-of-service"}
      />
      <Header
        locale={locale}
        navMenuText={navMenuText}
        page={'terms-of-service'}
        indexLanguageText={indexLanguageText}
      />
      <main className="mx-auto w-full max-w-7xl px-5 mb-5">
        <div className="p-6 prose mx-auto my-auto">
          <h1 className="text-3xl font-extrabold pb-6">
            {termsOfServiceLanguageText.h1}
          </h1>
          <p>{termsOfServiceLanguageText.date}</p>
          <p>{termsOfServiceLanguageText.desc}</p>
          <h4 className={"font-bold"}>{termsOfServiceLanguageText.h4_1}</h4>
          <p>{termsOfServiceLanguageText.h4_1_p}</p>
          <h4 className={"font-bold"}>{termsOfServiceLanguageText.h4_2}</h4>
          <p>{termsOfServiceLanguageText.h4_2_p}</p>
          <h4 className={"font-bold"}>{termsOfServiceLanguageText.h4_3}</h4>
          <p>{termsOfServiceLanguageText.h4_3_p}</p>
          <h4 className={"font-bold"}>{termsOfServiceLanguageText.h4_4}</h4>
          <p>{termsOfServiceLanguageText.h4_4_p}</p>
          <h4 className={"font-bold"}>{termsOfServiceLanguageText.h4_5}</h4>
          <p>
            {termsOfServiceLanguageText.h4_5_p}<a
            href={`https://virtual-try-on.online/privacy-policy`}
            className={"text-white"}>https://virtual-try-on.online/privacy-policy</a>
          </p>
          <h4 className={"font-bold"}>{termsOfServiceLanguageText.h4_6}</h4>
          <p>{termsOfServiceLanguageText.h4_6_p}</p>
          <h4 className={"font-bold"}>{termsOfServiceLanguageText.h4_7}</h4>
          <p>{termsOfServiceLanguageText.h4_7_p}</p>
          <h4 className={"font-bold"}>{termsOfServiceLanguageText.h4_8}</h4>
          <p>
            {termsOfServiceLanguageText.h4_8_p}<a href="mailto:xiaoqiu2017wy@gmail.com">xiaoqiu2017wy@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer
        locale={locale}
        description={indexLanguageText.description}
      />
    </>
  )

}

export default PageComponent
