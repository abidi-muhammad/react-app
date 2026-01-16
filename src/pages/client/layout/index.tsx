import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, Cloud } from 'lucide-react';
import { useState, useEffect } from 'react';
import MobileMenu from './mobile-menu';
import Footer from './footer';

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Modern Header */}
      <motion.header
        style={{ y: headerY }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg shadow-black/5' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Cloud className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                QiamConsulting
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="relative group"
                  >
                    <span className={`text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}>
                      {link.name}
                    </span>
                    {isActive ? (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                      />
                    ) : (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                aria-label="Toggle dark mode"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: darkMode ? 180 : 0, scale: darkMode ? 0.9 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  )}
                </motion.div>
              </button>

              {/* CTA Button - Desktop */}
              <Button className="hidden lg:inline-flex bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all">
                Get Started
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </motion.div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;