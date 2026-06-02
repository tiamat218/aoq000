export default function Hero() {
  return (
    <section className="px-6 pt-24 pb-10 md:px-12 md:pt-28">
      <div className="max-w-[1200px] mx-auto w-full">
        <p className="fade-up fade-up-delay-1 text-xs font-medium tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6">
          Graphic Designer — Vilnius, Lithuania
        </p>
        <h1 className="fade-up fade-up-delay-2 text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-4 text-[var(--text)]">
          Anastasia
          <br />
          Morozevič
        </h1>
        <p className="fade-up fade-up-delay-3 text-[1.0625rem] font-light text-[var(--text-secondary)] max-w-[480px] leading-[1.7]">
          Crafting bold, thoughtful design that helps brands and artists stand out. Based in Europe, working worldwide.
        </p>
      </div>
    </section>
  );
}
