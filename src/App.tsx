import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/client/home';
import Services from '@/pages/client/services';
import About from '@/pages/client/about';
import Contact from '@/pages/client/contact';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;