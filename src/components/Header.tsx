interface HeaderProps {
    lang: 'en' | 'he';
    setLang: (l: 'en' | 'he') => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
    return (
        <div className='w-full h-32 flex items-center justify-center relative bg-blue-400 px-6'>
            <button
                onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
                className='absolute left-6 text-xl hover:scale-105 transition duration-150 cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/50 hover:bg-blue-500/30 text-gray-800 font-semibold rounded-lg border border-blue-500/30'
            >
                <span>🌐</span>
                <span className="text-xs font-semibold">{lang === 'en' ? 'עברית' : 'English'}</span>
            </button>
            <p className="text-gray-700 font-semibold text-4xl">
                {lang === 'en' ? 'Demo' : 'דמו'}
            </p>
        </div>
    )
}
