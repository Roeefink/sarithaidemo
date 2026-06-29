import { useState, useEffect } from 'react';

interface BodyProps {
    lang: 'en' | 'he';
}

export default function Body({ lang }: BodyProps) {
    const [isPaying, setIsPaying] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const t = {
        title: lang === 'en' ? 'Checkout' : 'קופה',
        summary: lang === 'en' ? 'Order Summary' : 'סיכום הזמנה',
        description: lang === 'en' ? 'Demo Transaction' : 'עסקת דמו לתצוגה בלבד',
        amount: lang === 'en' ? 'Amount to Pay' : 'סכום לתשלום',
        payBtn: lang === 'en' ? 'Proceed to Payment' : 'המשך לתשלום',
        successTitle: lang === 'en' ? 'Payment Successful!' : 'התשלום בוצע בהצלחה!',
        successSubtitle: lang === 'en' ? 'Transaction processed securely by Tranzila' : 'העסקה בוצעה בהצלחה באמצעות טרנזילה',
        resetBtn: lang === 'en' ? 'Reset Demo' : 'איפוס דמו',
        cancelBtn: lang === 'en' ? 'Cancel' : 'ביטול',
        secureNotice: lang === 'en' 
            ? 'Payments are secure and encrypted via Tranzila' 
            : 'התשלום מאובטח ומוצפן באמצעות Tranzila',
        loadingIframe: lang === 'en' ? 'Loading secure checkout...' : 'טוען קופה מאובטחת...'
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Verify message is from the same origin (due to iframe redirect)
            if (event.origin !== window.location.origin) return;

            if (event.data?.type === 'TRANZILA_SUCCESS') {
                setSuccess(true);
                setIsPaying(false);
                setPaymentError(null);
            } else if (event.data?.type === 'TRANZILA_FAIL') {
                setIsPaying(false);
                setPaymentError(lang === 'en' ? 'Payment was rejected or cancelled.' : 'התשלום נדחה או בוטל.');
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [lang]);

    const terminal = import.meta.env.VITE_TRANZILA_TERMINAL || 'testtranzila';
    const currency = import.meta.env.VITE_TRANZILA_CURRENCY || '1';
    const sum = '1';
    const tranzilaLang = lang === 'he' ? 'il' : 'us';
    
    const okUrl = encodeURIComponent(`${window.location.origin}/success.html`);
    const failUrl = encodeURIComponent(`${window.location.origin}/fail.html`);

    // Tranzila direct iframe integration URL
    const iframeUrl = `https://direct.tranzila.com/${terminal}/iframenew.php?sum=${sum}&currency=${currency}&lang=${tranzilaLang}&ok_url=${okUrl}&fail_url=${failUrl}&nologo=1`;

    return (
        <div className="w-full bg-gray-50 flex items-center justify-center p-6 text-gray-800 pt-25" dir={lang === 'he' ? 'rtl' : 'ltr'}>
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-center text-gray-900">{t.title}</h2>

                {paymentError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200 text-center">
                        {paymentError}
                    </div>
                )}

                {success ? (
                    <div className="text-center p-4 bg-green-50 text-green-700 rounded border border-green-200">
                        <p className="font-semibold text-base">{t.successTitle}</p>
                        <p className="text-xs mt-1 text-gray-600">{t.successSubtitle}</p>
                        <button
                            onClick={() => {
                                setSuccess(false);
                                setPaymentError(null);
                            }}
                            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded border border-gray-300 transition cursor-pointer"
                        >
                            {t.resetBtn}
                        </button>
                    </div>
                ) : isPaying ? (
                    <div className="flex flex-col space-y-4">
                        <div className="w-full bg-gray-100 rounded-md overflow-hidden relative" style={{ height: '480px' }}>
                            <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 z-0">
                                {t.loadingIframe}
                            </div>
                            <iframe
                                src={iframeUrl}
                                title="Tranzila Secure Checkout"
                                className="w-full h-full border-0 relative z-10"
                            />
                        </div>
                        <button
                            onClick={() => {
                                setIsPaying(false);
                                setPaymentError(null);
                            }}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition text-sm cursor-pointer text-center"
                        >
                            {t.cancelBtn}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="border border-gray-200 rounded p-4 bg-gray-50/50 space-y-3">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.summary}</div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">{t.description}</span>
                                <span className="text-sm font-bold text-gray-900">₪1.00</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-bold">
                                <span className="text-sm text-gray-800">{t.amount}</span>
                                <span className="text-base text-blue-600">₪1.00</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsPaying(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded transition text-sm cursor-pointer text-center block"
                        >
                            {t.payBtn}
                        </button>

                        <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                            <span>🔒</span>
                            <span>{t.secureNotice}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}