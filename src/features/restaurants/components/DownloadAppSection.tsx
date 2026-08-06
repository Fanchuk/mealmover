'use client'

import { useState, useEffect } from "react";
import Image from "next/image";

export function DownloadAppSection() {
    const [installEvent, setInstallEvent] = useState<any>(null)

    useEffect(() => {
        function handler(e: Event) {
            e.preventDefault()
            setInstallEvent(e)
        }
        window.addEventListener('beforeinstallprompt', handler)
        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    async function handleInstall() {
        if (!installEvent) return
        installEvent.prompt()
        await installEvent.userChoice
        setInstallEvent(null)
    }

  return (
    <section className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center gap-6">
        <Image
          src="/dawndoalMobile.png"
          alt="Download Our Mobile App"
          width={1280}
          height={450}
          className="w-full h-auto drop-shadow-xl"
          priority
        />

        {installEvent && (
          <button
            onClick={handleInstall}
            className="inline-flex items-center justify-center h-[56px] px-8 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[18px] hover:bg-[#CD424E] transition-colors"
          >
            Install App
          </button>
        )}
      </div>
    </section>
  );
}