import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHomeAnimations(containerRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Revelação dos Cards/Divs Containers (Subida suave sem blur)
      const revealContainers = gsap.utils.toArray<HTMLElement>('.card-reveal')
      revealContainers.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      // 2. Animação de Texto/Títulos (Entra um pouco depois da Div container)
      const textElements = gsap.utils.toArray<HTMLElement>('.text-reveal')
      textElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15, // Surgimento ligeiramente atrasado em relação à div
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      // 3. Estrelas de Avaliação (Entrada sequencial limpa)
      const starContainers = gsap.utils.toArray<HTMLElement>('.stars-reveal')
      starContainers.forEach((container) => {
        const stars = container.querySelectorAll('.star')
        gsap.fromTo(
          stars,
          {
            opacity: 0,
            scale: 0.3,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: container,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      // 4. Parallax Estável (Apenas move o transform da imagem, sem afetar o container)
      const parallaxImages = gsap.utils.toArray<HTMLElement>('.parallax-img')
      parallaxImages.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement || img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, containerRef.current)

    return () => ctx.revert()
  }, [containerRef])
}
