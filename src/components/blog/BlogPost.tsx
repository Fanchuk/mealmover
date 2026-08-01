interface BlogPostProps {
  image: string;
  title: string;
}

export function BlogPost({ image, title }: BlogPostProps) {
  return (
    <article className="flex flex-col gap-5">
      <img src={image} alt={title} className="w-full h-[240px] sm:h-[400px] object-cover rounded-[20px]" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-[#EF5B5B]">January, 17 2024</span>
          <span className="text-neutral-300">|</span>
          <span className="font-heading font-normal text-[20px] tracking-[0.02em] text-neutral-500">Javier Bardem</span>
        </div>
        <div className="flex items-center gap-4">
          <img src="/WhatsApp (1).svg" alt="" className="w-5 h-5 object-contain" />
          <img src="/Facebook (1).svg" alt="" className="w-5 h-5 object-contain" />
          <img src="/Instagram (1).svg" alt="" className="w-5 h-5 object-contain" />
          <div className="flex items-center gap-1.5">
            <img src="/share.svg" alt="" className="w-5 h-5 object-contain" />
            <span className="font-heading font-normal text-[14px] tracking-[0.02em] text-[#EF5B5B]">14 Shares</span>
          </div>
        </div>
      </div>

      <h2 className="font-heading font-bold text-[32px] sm:text-[42px] lg:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800">
        {title}
      </h2>

      <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[720px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, tortor
        a hendrerit mattis, elit sapien volutpat nunc, ac vestibulum lorem est et felis.
        Suspendisse egestas fermentum elit, in semper odio vestibulum id. Donec placerat erat vitae fermentum rutrum.
      </p>

      <button className="self-start flex items-center gap-2 font-heading font-medium text-[16px] tracking-wider text-[#EF5B5B] uppercase">
        Read More <img src="/diagonal-arrow-right-up.svg" alt="" className="w-4 h-4 object-contain" />
      </button>
    </article>
  );
}