import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white min-h-[calc(100vh-72px)] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 lg:py-20 relative">
        <img src="/Ellipse 19.svg" alt="" className="absolute top-8 left-4 w-[120px] sm:w-[180px] lg:w-[220px] opacity-60 pointer-events-none" />
        <img src="/013-broccoli.svg" alt="" className="absolute top-12 left-1/3 w-10 sm:w-12 pointer-events-none" />
        <img src="/Sandwich.svg" alt="" className="absolute top-24 left-8 w-12 sm:w-16 pointer-events-none" />
        <img src="/Group (2).svg" alt="" className="absolute top-16 left-20 w-10 sm:w-14 pointer-events-none" />
        <img src="/Subtract (1).svg" alt="" className="absolute top-10 right-4 w-16 sm:w-20 lg:w-24 pointer-events-none" />
        <div className="absolute top-[30%] right-[8%] w-2.5 h-2.5 rounded-sm bg-[#FFCF27] rotate-45 pointer-events-none" />
        <div className="absolute top-[20%] left-[40%] w-2.5 h-2.5 rounded-sm bg-[#EF5B5B] rotate-45 pointer-events-none" />
        <div className="absolute bottom-[20%] left-1/2 w-3 h-3 rounded-sm bg-[#FFCF27] rotate-45 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center min-h-[500px] lg:min-h-[580px]">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <h1 className="font-heading font-bold text-[42px] sm:text-[55px] lg:text-[76px] leading-[115%] tracking-[0.01em] text-neutral-800">
              Page Not Found
            </h1>
            <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-600 max-w-[420px]">
              The page you are looking for was moved, removed, renamed, or might never existed!
            </p>
            <Link
              href="/"
              className="self-start flex items-center gap-3 bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[56px] pl-8 pr-3 font-heading font-medium text-[16px] sm:text-[18px] text-white"
            >
              Back to Homepage
              <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <img src="/home2.svg" alt="" className="w-5 h-5 object-contain" />
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-center order-1 lg:order-2">
            <img
              src="/Group.png"
              alt="404"
              className="w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[592px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}