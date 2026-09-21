// component.tsx
'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  alt?: string;
  href?: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  alt?: string;
  href?: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  alt,
  href,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      // sits below the site's sticky header when one exists (--hh), full screen otherwise
      style={{ top: 'var(--hh, 0px)', height: 'calc(100dvh - var(--hh, 0px))' }}
      className={cn('flex items-center justify-center sticky', i === 0 && '-mt-10 md:-mt-12')}
    >
      <motion.div
        style={{
          background: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] w-[92%] md:w-[70%] md:h-[450px] rounded-md p-5 md:p-10 origin-top border border-[#E4D9BC] shadow-[0_-12px_30px_-14px_rgba(74,59,51,0.35)]`}
      >
        <div className={`flex flex-col md:flex-row h-full gap-4 md:gap-10`}>
          <div className={`order-2 md:order-1 md:w-[40%] relative md:top-[10%]`}>
            <h2 className='text-xl md:text-2xl font-semibold mb-2 md:mb-3'>{title}</h2>
            <p className='text-sm'>{description}</p>
            {href && (
              <span className='flex items-center gap-2 pt-2'>
                <a
                  href={href}
                  target='_blank'
                  className='underline cursor-pointer'
                >
                  See more
                </a>
                <svg
                  width='22'
                  height='12'
                  viewBox='0 0 22 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                    fill='currentColor'
                  />
                </svg>
              </span>
            )}
          </div>

          <div
            className={`order-1 md:order-2 relative w-full md:w-[60%] aspect-[16/10] md:aspect-auto md:h-full rounded-lg overflow-hidden `}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img src={url} alt={alt ?? title} className='absolute inset-0 w-full h-full object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
  title: string;
  intro?: string;
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(({ projects, title, intro }, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='bg-[#FDFBF7] text-[#3B2A20]' ref={container}>
        <>
          <section
            className='w-full bg-[#FFFDF9] grid place-content-center relative overflow-hidden pt-[calc(var(--hdr-h,72px)+2.5rem)] pb-4 md:pt-[calc(var(--hdr-h,72px)+3.5rem)] md:pb-6 -mt-[var(--hdr-h,72px)]'
            // the same copper glows as the other pages' header bands, running up behind the site header
            style={{ backgroundImage: 'radial-gradient(60% 110% at 22% -10%,rgba(217,119,6,.20),rgba(217,119,6,.07) 45%,transparent 72%),radial-gradient(55% 100% at 88% 110%,rgba(180,83,9,.18),rgba(180,83,9,.06) 48%,transparent 74%),linear-gradient(180deg,#FFFFFF,#F6EEDF)' }}
          >
            <h1 className='relative 2xl:text-7xl text-4xl sm:text-5xl px-6 sm:px-8 font-semibold text-center tracking-tight leading-[120%]'>
              {title}
            </h1>
            {intro && (
              <p className='relative mx-auto mt-5 max-w-xl px-6 text-center text-sm sm:text-base text-[#6F6862] leading-relaxed'>
                {intro}
              </p>
            )}
          </section>
        </>

        <section className='w-full bg-[#FDFBF7]'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                alt={project.alt}
                href={project.href}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

      </main>
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;
