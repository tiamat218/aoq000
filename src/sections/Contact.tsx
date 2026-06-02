import React from "react";

export default function Contact() {
  const handleSocialsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="bg-[var(--bg-secondary)] px-6 py-24 md:px-12 text-center">
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] mb-6 text-[var(--text)]">
          Let&apos;s work together
        </h2>
        <p className="text-[1.125rem] font-light text-[var(--text-secondary)] mb-12">
          Have a project in mind? I&apos;m currently available for freelance work and open to collaborations.
          Reach me via email or through my{" "}
          <a href="#" onClick={handleSocialsClick} className="text-[var(--text)] font-medium underline underline-offset-4 decoration-[1.5px] hover:opacity-70 transition-opacity duration-300 cursor-pointer">
            socials
          </a>.
        </p>
        <a href="mailto:kkefldq000@gmail.com" className="inline-block text-2xl font-semibold text-[var(--text)] no-underline tracking-[-0.01em] mb-12 relative group">
          kkefldq000@gmail.com
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--text)] transition-transform duration-500 origin-right group-hover:scale-x-0 group-hover:origin-left" />
        </a>



      </div>
    </section>
  );
}