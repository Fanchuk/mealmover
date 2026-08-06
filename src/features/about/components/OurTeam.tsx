const TEAM = [
  { name: "Nala Gilbert",   image: "/Mask group (21).png" },
  { name: "Emily James",    image: "/Mask group (22).png" },
  { name: "David Anderson", image: "/Mask group (23).png" },
];

export function OurTeam() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center">Our Team</span>
        <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[123%] tracking-[0.01em] text-neutral-800 text-center mt-2 mb-12 lg:mb-16">
          Our Team Plays a Big Role
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 w-full max-w-[1050px]">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="w-full aspect-[4/5] rounded-[30px] bg-neutral-100 overflow-hidden mb-5">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading font-bold text-[24px] sm:text-[31px] leading-[132%] text-neutral-800">{member.name}</h3>
              <p className="font-heading font-normal text-[16px] leading-[150%] text-neutral-500 mt-2 max-w-[220px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex gap-3 mt-4">
                <span className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center">
                  <img src="/Facebook.svg" alt="Facebook" className="w-5 h-5 object-contain" />
                </span>
                <span className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center">
                  <img src="/Instagram.svg" alt="Instagram" className="w-5 h-5 object-contain" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}