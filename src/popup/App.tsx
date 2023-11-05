import { GearIcon, GlobeIcon } from '@primer/octicons-react'
import { useCallback, useEffect } from 'react'
import useSWR from 'swr'
import Browser from 'webextension-polyfill'
import '../base.css'

const isChrome = /chrome/i.test(navigator.userAgent)


function App() {  

  useEffect(() => {
      const popupPageUrl = './options.html';
      Browser.tabs.create({ url: popupPageUrl });
    }, [])

  return (
      <>
      </>
    )
 
}

export default App
