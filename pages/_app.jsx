import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderLayout from '@/components/LayOuts/Header/HeaderLayout'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <HeaderLayout>
      <Component {...pageProps} />
    </HeaderLayout>

    </>
  )
}
