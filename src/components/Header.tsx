'use client'
import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {GlobeAltIcon} from '@heroicons/react/24/outline'
import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import Link from "next/link";
import {languages} from "~/config";
import {useCommonContext} from '~/context/common-context'
import LoadingModal from "./LoadingModal";
import Image from "next/image";
import GeneratingModal from "~/components/GeneratingModal";

const navigation = {
  topMenu: [
    {name: 'Playground', href: '/playground'},
    {name: 'Works', href: '/works'},
    {name: 'Videos', href: '/videos'},
  ],
  social: [
    {
      name: 'Buy me a coffee',
      href: 'https://ko-fi.com/zhugezifang?utm_source=hotel_code',
      target: '_blank',
      icon: (props) => (
        <svg fill="#fff" viewBox="0 0 24 24" {...props}>
          <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"></path>
        </svg>
      ),
    }
  ]
}

export default function Header({
                                 locale = '',
                                 navMenuText,
                                 page = '',
                                 indexLanguageText
                               }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {setShowGeneratingModal} = useCommonContext();
  const {setShowLoadingModal} = useCommonContext();

  const checkLocalAndLoading = (lang) => {
    if (locale != lang) {
      setShowLoadingModal(true);
    }
  }

  return (
    <header className="sticky top-0 bg-[#020d24] z-20 w-full">
      <LoadingModal loadingText={indexLanguageText.loadingText}/>
      <GeneratingModal generatingText={indexLanguageText.generateText}/>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href={`/${locale}`} className="-m-1.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
            <Image className="h-8 w-auto" src="/favicon.svg" alt="Virtual Try On" width={32} height={32}/>
          </a>
          <a href={`/${locale}`} className="-m-1.5 ml-0.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
            <span className="font-bold text-white text-2xl">Virtual Try On</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
            <a
              key={navMenuText.name1}
              href={`/${locale}${navMenuText.href1}`}
              onClick={() => setShowLoadingModal(true)}
              className="text-sm font-semibold leading-6 text-white hover:text-blue-500">
              {navMenuText.name1}
            </a>
            <a
              key={navMenuText.name2}
              href="/"
              onClick={() => setShowLoadingModal(true)}
              className="text-sm font-semibold leading-6 text-white hover:text-blue-500">
              {navMenuText.name2}
            </a>
        </div>
        <div className="flex flex-1 justify-end mr-2">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} target='_blank' className="text-gray-500 hover:text-gray-400">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true"/>
            </a>
          ))}
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex w-full justify-center gap-x-1.5 border border-[rgba(255,255,255,0.5)] rounded-md px-3 py-2 text-sm font-semibold text-white hover:border-[rgba(255,255,255,0.9)]">
              <GlobeAltIcon className="w-5 h-5 text-white"/>{locale == 'default' ? 'EN' : locale.toUpperCase()}
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true"/>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-26 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {
                  languages.map((item) => {
                    let hrefValue = `/${item.lang}`;
                    if (page) {
                      hrefValue = `/${item.lang}/${page}`;
                    }
                    return (
                      <Menu.Item key={item.lang}>
                        <Link href={hrefValue} onClick={() => checkLocalAndLoading(item.lang)}>
                              <span
                                className={'text-gray-700 block px-4 py-2 text-sm hover:text-[#2d6ae0]'}
                              >
                                {item.language}
                              </span>
                        </Link>
                      </Menu.Item>
                    )
                  })
                }
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10"/>
        <Dialog.Panel
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href={`/${locale}`} className="-m-1.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
              <Image className="h-8 w-auto" src="/appicon.svg" alt="sorawebui.com" width={32} height={32}/>
            </a>
            <a href={`/${locale}`} className="-m-1.5 ml-0.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
              <Image
                className="h-8 w-auto"
                src="/sorawebui.svg"
                width={32}
                height={24}
                alt="sorawebui.com"/>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.topMenu.map((item) => (
                  <a
                    key={item.name}
                    href={`/${locale}${item.href}`}
                    onClick={() => setShowLoadingModal(true)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-blue-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
