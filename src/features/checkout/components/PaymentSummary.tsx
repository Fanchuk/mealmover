'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { motion } from 'motion/react'
import { estimateEta } from '../lib/delivery'

interface Props {
    subtotal: number
    shipping: number
    discount: number
    total: number
    distanceKm: number
    lat: number | null
    lng: number | null
    pending: boolean
}

export function PaymentSummary({ subtotal, shipping, discount, total, distanceKm, lat, lng, pending }: Props) {
    const [eta, setEta] = useState<number | null>(null)

    useEffect(() => {
        if (lat == null || lng == null) {
            setEta(estimateEta(distanceKm, 0))
            return
        }
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=weather_code`)
            .then((r) => r.json())
            .then((d) => setEta(estimateEta(distanceKm, d?.current?.weather_code ?? 0)))
            .catch(() => setEta(estimateEta(distanceKm, 0)))
    }, [lat, lng, distanceKm])

    const rows = [
        { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
        { label: `Delivery (${distanceKm} km)`, value: `$${shipping.toFixed(2)}` },
        ...(discount > 0 ? [{ label: 'Discount', value: `-$${discount.toFixed(2)}`, green: true }] : []),
    ]

    return (
        <div className="rounded-[24px] border border-neutral-200 p-6 bg-neutral-50">
            <h3 className="font-heading font-bold text-[20px] text-neutral-800 mb-4">Payment Summary</h3>

            {eta != null && (
                <div className="flex items-center gap-2 mb-4 text-[#1A9E82]">
                    <Clock size={18} />
                    <span className="font-heading font-medium text-[15px]">Estimated delivery: ~{eta} min</span>
                </div>
            )}

            <div className="flex flex-col gap-2.5">
                {rows.map((r) => (
                    <div key={r.label} className="flex justify-between font-heading text-[15px]">
                        <span className="text-neutral-500">{r.label}</span>
                        <span className={r.green ? 'text-[#1A9E82] font-medium' : 'text-neutral-800 font-medium'}>{r.value}</span>
                    </div>
                ))}
            </div>

            <div className="w-full border-t border-dashed border-neutral-300 my-4" />

            <div className="flex justify-between items-center mb-6">
                <span className="font-heading font-semibold text-[18px] text-neutral-800">Total</span>
                <span className="font-heading font-bold text-[26px] text-[#EF5B5B]">${total.toFixed(2)}</span>
            </div>

            <motion.button
                type="submit"
                disabled={pending}
                whileHover={{ scale: pending ? 1 : 1.02 }}
                whileTap={{ scale: pending ? 1 : 0.98 }}
                className="w-full h-[56px] rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[17px] hover:bg-[#CD424E] transition-colors disabled:opacity-80 flex items-center justify-center gap-2">
                {pending ? (
                    <>
                        <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Placing order...
                    </>
                ) : (
                    'Order Now'
                )}
            </motion.button>
        </div>
    )
}
