'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState} from "react";
import {randomVideo} from "~/data/openaiVideo";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";

const PageComponent = ({
                         locale = '',
                         navMenuText,
                         indexLanguageText,
                         initVideoList = [],
                         questionText
                       }) => {
  const router = useRouter();

  const [textStr, setTextStr] = useState('');
  const {setShowGeneratingModal, setShowLoadingModal} = useCommonContext();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setChooseAPI('FakeSora');
    if (!textStr) {
      setVideoList(randomVideo(2));
      return;
    }
    setShowGeneratingModal(true);
    const body = {
      prompt: textStr
    };
    const response = await fetch(`/${locale}/api/generate`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    const result = await response.json();
    setShowGeneratingModal(false);
    if (result.data) {
      if (!result.data[0].revised_prompt) {
        return
      }
      const video = {
        revised_prompt: result.data[0].revised_prompt,
        url: result.data[0].url
      }

      // add storage
      const videoHistoryListStr = localStorage.getItem('videoHistoryList');
      if (!videoHistoryListStr) {
        const videoHistoryList = [];
        videoHistoryList.unshift(video);
        localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
      } else {
        const videoHistoryList = JSON.parse(videoHistoryListStr);
        // check exist
        let exist = false;
        for (let i = 0; i < videoHistoryList.length; i++) {
          const videoHistory = videoHistoryList[i];
          if (videoHistory.revised_prompt == video.revised_prompt) {
            exist = true;
            localStorage.setItem('video', JSON.stringify(video));
            router.push(`/${locale}/playground`)
            return;
          }
        }
        if (!exist) {
          videoHistoryList.unshift(video);
          // const newList = videoHistoryList.slice(0, 3);
          localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
        }
      }
      localStorage.setItem('video', JSON.stringify(video));
      router.push(`/${locale}/playground`)
    }
  }

  const [videoList, setVideoList] = useState(initVideoList);

  const handleMouseEnter = (event) => {
    event.target.play();
  };

  const handleMouseLeave = (event) => {
    event.target.pause();
  };

  const [chooseAPI, setChooseAPI] = useState('FakeSora');

  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={""}
      />
      <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-0SZ9VELZLD`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0SZ9VELZLD');
            `,
          }}
        />
      <Header locale={locale} navMenuText={navMenuText} indexLanguageText={indexLanguageText}/>
      <div>
        <div className="block overflow-hidden bg-cover bg-center text-black"
             style={{backgroundImage: 'https://assets.website-files.com/6502af467b2a8c4ee8159a5b/6502af467b2a8c4ee8159a77_Group%2047929.svg'}}>
          <div className="mx-auto w-full max-w-7xl px-5 mb-5">
            <div
              className="mx-auto flex max-w-4xl flex-col items-center text-center py-10">
              <h1 className="mb-4 text-4xl font-bold md:text-4xl">{indexLanguageText.h1Text}</h1>
              <div className="mb-5 lg:mb-8">
                <p className="text-[#7c8aaa] text-xl">{indexLanguageText.pDescription}</p>
              </div>

              <div className="flex items-center justify-center space-x-7">
                <a href={`/${locale}/playground`} className="cursor-pointer flex flex-row items-center bg-[#276ef1] px-10 py-6 font-bold text-white transition [box-shadow:rgb(171,_196,_245)-12px_12px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
                  <p className="mr-8 font-bold text-2xl tracking-wider">{indexLanguageText.btn}</p>
                    <svg fill="currentColor" className="h-6 w-6 flex-none" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
                        <title>{indexLanguageText.btn}</title>
                        <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                    </svg>
                </a>
              </div>

            </div>
            <div>
              <div
                className={"w-[90%] mx-auto rounded-tl-[30px] rounded-tr-[30px] border-[12px] border-gray-200 object-fill"}>
                    <iframe src="https://ahmedalmaghz-kolors-virtual-try-on.hf.space" style={{width: '100%',height:'1800px'}}></iframe>
              </div>
            </div>

            <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{indexLanguageText.soraVideoExample}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 px-6 py-4">
                  <div>
                      <div
                        className="rounded-xl flex justify-center items-start">
                        <iframe width="1228" height="691" src="https://www.youtube.com/embed/9uS9Vfk8-N8" title="Try On Clothes Virtually with AI using Kolors Virtual Try-On in the Wild" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                      </div>
                    </div>
                </div>
                
              </div>
            </div>

            <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_1}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {questionText.h2_1_p1}
                  </p>
                  <p>
                    {questionText.h2_1_p2}
                  </p>
                </div>
              </div>
            </div>

            <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_2}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {questionText.h2_2_p1}
                  </p>
                  <p>
                    {questionText.h2_2_p2}
                  </p>
                  <p>
                    {questionText.h2_2_p3}
                  </p>
                  <p>
                    {questionText.h2_2_p4}
                  </p>
                </div>
              </div>
            </div>

            <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_3}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {questionText.h2_3_p1}
                  </p>
                  <p>
                    {questionText.h2_3_p2}
                  </p>
                </div>
              </div>
            </div>

            <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_4}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {questionText.h2_4_p1}
                  </p>
                  <p>
                    {questionText.h2_4_p2}
                  </p>
                </div>
              </div>
            </div>

            <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_5}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {questionText.h2_5_p1}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-7 py-10">
                <a href={`/${locale}/playground`} className="cursor-pointer flex flex-row items-center bg-[#276ef1] px-10 py-6 font-bold text-white transition [box-shadow:rgb(171,_196,_245)-12px_12px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
                  <p className="mr-8 font-bold text-2xl tracking-wider">{indexLanguageText.btn}</p>
                    <svg fill="currentColor" className="h-6 w-6 flex-none" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
                        <title>{indexLanguageText.btn}</title>
                        <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                    </svg>
                </a>
            </div>

          </div>
        </div>
      </div>
            <Footer
              locale={locale}
              description={indexLanguageText.description}
            />
    </>
  )


}
export default PageComponent
