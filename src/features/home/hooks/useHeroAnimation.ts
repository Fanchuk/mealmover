import { useEffect, RefObject } from "react";
import gsap from "gsap";

export function useHeroAnimation(sectionRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".hero-fade", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".hero-phone", {
        opacity: 0,
        x: 60,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.to(".hero-float", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}