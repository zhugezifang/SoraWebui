'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState} from "react";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import {useInterval} from "ahooks";
import Image from "next/image";
import Link from "next/link";

const PageComponent = ({
                         locale = '',
                         navMenuText,
                         indexLanguageText,
                         playgroundText
                       }) => {
  const router = useRouter();

  const [textStr, setTextStr] = useState('');
  const {setShowGeneratingModal, setShowLoadingModal} = useCommonContext();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setChooseAPI('FakeSora');
    if (!textStr) {
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
      setVideo(video);
      localStorage.setItem('video', JSON.stringify(video));

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
            return;
          }
        }
        if (!exist) {
          videoHistoryList.unshift(video);
          // const newList = videoHistoryList.slice(0, 3);
          localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
        }
      }
    }
  }

  const [video, setVideo] = useState({revised_prompt: '', url: ''});

  const [intervalLocalStorage, setIntervalLocalStorage] = useState(500);

  useInterval(() => {
    const videoStr = localStorage.getItem('video');
    if (videoStr) {
      const video = JSON.parse(videoStr);
      setVideo(video)
    }
  }, intervalLocalStorage);

  const [chooseAPI, setChooseAPI] = useState('FakeSora');

  return (
    <>
      <HeadInfo
        title={playgroundText.title}
        description={playgroundText.description}
        locale={locale}
        page={"/colour-virtual-try-on"}
      />
      <Header locale={locale} navMenuText={navMenuText} page={"colour-virtual-try-on"} indexLanguageText={indexLanguageText}/>
      <div className={"mx-auto w-full max-w-7xl px-5 mb-5"}>
        <div className="block overflow-hidden bg-cover bg-center"
             style={{backgroundImage: 'https://assets.website-files.com/6502af467b2a8c4ee8159a5b/6502af467b2a8c4ee8159a77_Group%2047929.svg'}}>
          <div className="mx-auto w-full max-w-7xl px-5 mb-5">
            <div
              className="mx-auto flex max-w-4xl flex-col items-center text-center mt-10">
              <h1 className="mb-4 text-4xl font-bold md:text-4xl">{playgroundText.h1Text}</h1>
              <div className="mb-5 lg:mb-8">
                <p className="text-[#7c8aaa] text-xl">{playgroundText.pDescription}</p>
              </div>
            </div>
            <div>
              <div
                className={"w-[90%] mx-auto rounded-tl-[30px] rounded-tr-[30px] border-[12px] border-gray-200 object-fill"}>
                <iframe src="https://ahmedalmaghz-kolors-virtual-try-on.hf.space" style={{width: '100%',height:'1800px'}}></iframe>
              </div>
            </div>
          </div>

          <div className={"object-fill w-[90%] mx-auto mt-8 flex justify-center items-center"}>
                  <Image
                      src="/091801.jpg"
                      width={820}
                      height={320}
                      alt="Colour Virtual Try On Images"
                  />
          </div>

          <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{playgroundText.h2_1}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {playgroundText.h2_1_p1}
                  </p>
                </div>
              </div>
          </div>

          <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{playgroundText.h2_2}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {playgroundText.h2_2_p1}
                  </p>
                </div>
              </div>
          </div>

          <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{playgroundText.h2_3}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {playgroundText.h2_3_p1}
                  </p>
                </div>
              </div>
          </div>

          


          <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{playgroundText.h2_4}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {playgroundText.h2_4_p1}
                  </p>
                </div>
              </div>
          </div>


          <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{playgroundText.h2_5}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {playgroundText.h2_5_p1}
                  </p>
                </div>
              </div>
          </div>


          <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto py-8"} style={{ backgroundColor: 'rgb(245 241 241)' }}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{playgroundText.h2_6}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {playgroundText.h2_6_p1}
                  </p>
                </div>
              </div>
          </div>

          <div className="flex items-center justify-center space-x-7 py-10">
                <a href={`/${locale}/colour-virtual-try-on`} className="cursor-pointer flex flex-row items-center bg-[#276ef1] px-10 py-6 font-bold text-white transition [box-shadow:rgb(171,_196,_245)-12px_12px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
                  <p className="mr-8 font-bold text-2xl tracking-wider">{indexLanguageText.btn}</p>
                    <svg fill="currentColor" className="h-6 w-6 flex-none" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
                        <title>{indexLanguageText.btn}</title>
                        <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                    </svg>
                </a>
            </div>

        </div>
      </div>
      <Footer
        locale={locale}
        description=""
      />
    </>
  )


}
export default PageComponent
