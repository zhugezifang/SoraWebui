import Image from "next/image";
import Link from "next/link";

const navigation = {
  product: [
    {name: 'Tap4 AI Tools Diresctory', href: 'https://tap4.ai/'},
    {name: 'iuu AI', href: 'https://iuu.ai'},
    {name: 'MagicBox.Tools - AI Tools Directory', href: 'https://magicbox.tools/'},
    {name: 'Woy AI Tools', href: 'https://woy.ai/'},
    {name: 'AI With Me', href: 'https://aiwith.me'},
    {name: 'AIEasy.life AI Tools', href: 'https://aieasy.life/'},
    {name: 'Bai.tools', href: 'https://bai.tools/'},
    {name: 'AIPURE AI', href: 'https://aipure.ai/'},
    {name: 'All in AI Tools', href: 'https://allinai.tools'},
    {name: 'RightAI Tools Diresctory', href: 'https://right-ai.com/'}
  ],
  legal: [
    {name: 'Privacy Policy', href: '/privacy-policy'},
    {name: 'Terms & Conditions', href: '/terms-of-service'},
  ]
}

export default function Footer({
                                 locale = '',
                                 description = ''
                               }) {
  return (
    <footer className="bg-[#020d24]" aria-labelledby="footer-heading">
      <div id="footer-heading" className="sr-only">
        Footer
      </div>
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <a href={`/${locale}`}>
              <Image
                className="h-10"
                src="/favicon.svg"
                width={32}
                height={32}
                alt="Virtual Try On"
              />
            </a>
            <p className="text-sm text-gray-300">
              {description}
            </p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <div className="text-sm font-semibold leading-6 text-white"></div>
                <ul role="list" className="mt-6 space-y-4">

                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <div className="text-sm font-semibold leading-6 text-white">Friends</div>
                <ul role="list" className="mt-6 space-y-4">
                        <li>
                          <Link href={`/${locale}/colour-virtual-try-on`}
                                target={"_blank"}
                                className="text-sm leading-6 text-gray-300 hover:text-[#2d6ae0]">
                            Colour Virtual Try On
                          </Link>
                        </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <div className="text-sm font-semibold leading-6 text-white">Product</div>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => {
                      return (
                        <li key={item.name}>
                          <Link href={`${item.href}`}
                                target={"_blank"}
                                className="text-sm leading-6 text-gray-300 hover:text-[#2d6ae0]">
                            {item.name}
                          </Link>
                        </li>
                      )
                    }
                  )}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <div className="text-sm font-semibold leading-6 text-white">Legal</div>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => {
                      let hrefTo = `${item.href}`;
                      if (locale == 'en') {
                        hrefTo = `${item.href}`;
                      }
                      return (
                        <li key={item.name}>
                          <Link href={`${hrefTo}`}
                                className="text-sm leading-6 text-gray-300 hover:text-[#2d6ae0]">
                            {item.name}
                          </Link>
                        </li>
                      )
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-6 w-full border border-gray-800 lg:my-6"></div>
      <div>
          <p className="font-inter lg: text-center text-sm text-gray-500 py-8">
            © Copyright 2024.{" "}
            <a
              href="/"
              target="_blank"
              className="text-white"
            >
              Virtual Try On
            </a>{" "}
            All rights reserved.
          </p>
        </div>
    </footer>
  )
}
