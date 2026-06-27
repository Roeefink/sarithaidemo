import { useState } from 'react'
import Header from './components/Header.tsx'
import Body from './components/Body.tsx'

function App() {
  const [lang, setLang] = useState<'en' | 'he'>('en')

  return (
    <div>
      <Header lang={lang} setLang={setLang} />
      <Body lang={lang} />
    </div>
  )
}

export default App


