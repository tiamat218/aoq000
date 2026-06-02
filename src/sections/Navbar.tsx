import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-500 backdrop-blur-[20px] border-b ${
        scrolled
          ? 'bg-[var(--nav-bg)] border-[var(--border-color)]'
          : 'bg-[var(--nav-bg)] border-transparent'
      }`}
    >
      <a
        href="#"
        className="text-sm font-semibold tracking-widest no-underline"
      >
        
      </a>
      <ul className="flex gap-8 md:gap-10 list-none">
        <li>
          <a
            href="#work"
            className="relative text-[13px] font-medium tracking-wide text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)] group"
          >
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text)] transition-all duration-500 group-hover:w-full" />
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="relative text-[13px] font-medium tracking-wide text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)] group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text)] transition-all duration-500 group-hover:w-full" />
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="relative text-[13px] font-medium tracking-wide text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)] group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text)] transition-all duration-500 group-hover:w-full" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
