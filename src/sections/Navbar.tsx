import { useEffect, useState } from 'react';
import { FiInstagram } from 'react-icons/fi';
import { FaTiktok, FaLinkedinIn, FaBehance } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socials = [
    { icon: <FiInstagram size={18} />, href: 'https://www.instagram.com/aoq.000', label: 'Instagram' },
    { icon: <FaTiktok size={16} />, href: 'https://www.tiktok.com/@aoq.000', label: 'TikTok' },
    { icon: <FaLinkedinIn size={16} />, href: 'https://www.linkedin.com/in/anastasia-morozevic-5282442a5', label: 'LinkedIn' },
    { icon: <FaBehance size={20} />, href: 'https://www.behance.net/anastasiamorozevich', label: 'Behance' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-6 transition-all duration-500 backdrop-blur-[20px] border-b ${scrolled ? 'bg-[var(--nav-bg)] border-[var(--border-color)]' : 'bg-[var(--nav-bg)] border-transparent'}`}>
      <div className="flex items-center gap-3 md:gap-5">
        {socials.map(({ icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text)]">{icon}</a>
        ))}
      </div>
      <ul className="flex gap-5 md:gap-12 list-none">
        <li>
          <a href="#work" className="relative text-[13px] md:text-[15px] font-medium tracking-wide text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)] group">
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text)] transition-all duration-500 group-hover:w-full" />
          </a>
        </li>
        <li>
          <a href="#about" className="relative text-[13px] md:text-[15px] font-medium tracking-wide text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)] group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text)] transition-all duration-500 group-hover:w-full" />
          </a>
        </li>
        <li>
          <a href="#contact" className="relative text-[13px] md:text-[15px] font-medium tracking-wide text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)] group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text)] transition-all duration-500 group-hover:w-full" />
          </a>
        </li>
      </ul>
    </nav>
  );
}