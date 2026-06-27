import { useState } from 'react';

interface BodyProps {
    lang: 'en' | 'he';
}

export default function Body({ lang }: BodyProps) {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [success, setSuccess] = useState(false);

    const t = {
        title: lang === 'en' ? 'Payment' : 'תשלום',
        cardholder: lang === 'en' ? 'Cardholder Name' : 'שם בעל הכרטיס',
        cardholderPlaceholder: lang === 'en' ? 'Israel Israeli' : 'ישראל ישראלי',
        cardNumber: lang === 'en' ? 'Card Number' : 'מספר כרטיס',
        expiry: lang === 'en' ? 'Expiry (MM/YY)' : 'תוקף (MM/YY)',
        cvv: lang === 'en' ? 'CVV' : 'קוד אבטחה (CVV)',
        payBtn: lang === 'en' ? 'Pay ₪1' : 'שלם ₪1',
        processing: lang === 'en' ? 'Processing Mock Payment...' : 'מעבד תשלום סימולטיבי...',
        successTitle: lang === 'en' ? 'Payment Successful!' : 'התשלום בוצע בהצלחה!',
        successSubtitle: lang === 'en' ? 'Simulated transaction complete' : 'העסקה הסתיימה בהצלחה',
        resetBtn: lang === 'en' ? 'Reset Demo' : 'איפוס דמו'
    };

    const handleCardNumberChange = (value: string) => {
        const cleanValue = value.replace(/\D/g, '').substring(0, 16);
        const formatted = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(formatted);
    };

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            setSuccess(true);
        }, 1500);
    };
    const handleDateAdjustment = (value: string) => {
        let cleaned = value.replace(/\D/g, '');

        // If the first digit is 2-9, prepend a 0 to make it a valid 2-digit month (02-09)
        if (cleaned.length > 0) {
            const firstDigit = cleaned.charAt(0);
            if (firstDigit !== '0' && firstDigit !== '1') {
                cleaned = '0' + cleaned;
            }
        }

        cleaned = cleaned.substring(0, 4);

        // Validate month if we have at least 2 digits
        if (cleaned.length >= 2) {
            const month = parseInt(cleaned.substring(0, 2), 10);
            if (month < 1 || month > 12) {
                return; // Invalid month, reject change
            }
        }

        // Validate year ONLY if we have all 4 digits (so we don't block typing the first digit like "2")
        if (cleaned.length === 4) {
            const year = parseInt(cleaned.substring(2, 4), 10);
            if (year < 24 || year > 99) {
                return; // Invalid year, reject change
            }
        }

        // Format as MM/YY
        let formatted = cleaned;
        if (cleaned.length > 2) {
            formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
        }

        setExpiry(formatted);
    };

    return (
        <div className="w-full bg-gray-50 flex items-center justify-center p-6 text-gray-800 pt-25" dir={lang === 'he' ? 'rtl' : 'ltr'}>
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-center text-gray-900">{t.title}</h2>

                {success ? (
                    <div className="text-center p-4 bg-green-50 text-green-700 rounded border border-green-200">
                        <p className="font-semibold text-base">{t.successTitle}</p>
                        <p className="text-xs mt-1 text-gray-600">{t.successSubtitle}</p>
                        <button
                            onClick={() => {
                                setCardNumber('');
                                setCardHolder('');
                                setExpiry('');
                                setCvv('');
                                setSuccess(false);
                            }}
                            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded border border-gray-300 transition"
                        >
                            {t.resetBtn}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handlePay} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                {t.cardholder}
                            </label>
                            <input
                                type="text"
                                required
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value)}
                                placeholder={t.cardholderPlaceholder}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                {t.cardNumber}
                            </label>
                            <input
                                type="text"
                                required
                                value={cardNumber}
                                onChange={(e) => handleCardNumberChange(e.target.value)}
                                placeholder="4580 1234 5678 9012"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                    {t.expiry}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={expiry}
                                    maxLength={5}
                                    onChange={(e) => handleDateAdjustment(e.target.value)}
                                    placeholder="12/28"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                    {t.cvv}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                                    placeholder="123"
                                    maxLength={4}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPaying}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded transition text-sm disabled:opacity-50 mt-6"
                        >
                            {isPaying ? t.processing : t.payBtn}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}