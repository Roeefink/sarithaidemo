import { useState } from 'react';

export default function Body() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="w-full bg-gray-50 flex items-center justify-center p-6 text-gray-800 pt-25">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-center text-gray-900">Tranzila Payment Portal</h2>

                {success ? (
                    <div className="text-center p-4 bg-green-50 text-green-700 rounded border border-green-200">
                        <p className="font-semibold text-base">Payment Successful!</p>
                        <p className="text-xs mt-1 text-gray-600">Simulated transaction complete</p>
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
                            Reset Demo
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handlePay} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                Cardholder Name
                            </label>
                            <input
                                type="text"
                                required
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value)}
                                placeholder="Israel Israeli"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                Card Number
                            </label>
                            <input
                                type="text"
                                required
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="4580 1234 5678 9012"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                    Expiry (MM/YY)
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    placeholder="12/28"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    placeholder="123"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPaying}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded transition text-sm disabled:opacity-50 mt-6"
                        >
                            {isPaying ? 'Processing Mock Payment...' : 'Pay ₪1'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}