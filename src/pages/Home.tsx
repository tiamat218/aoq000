import { useState } from 'react';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import Portfolio from '../sections/Portfolio';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import Modal from '../sections/Modal';

export default function Home() {
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const [modalProjectIds, setModalProjectIds] = useState<string[]>([]);

  const openModal = (id: string, visibleIds: string[]) => {
    setModalProjectIds(visibleIds);
    setModalProjectId(id);
  };
  const closeModal = () => {
    setModalProjectId(null);
    setModalProjectIds([]);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio onOpenModal={openModal} />
      <About />
      <Contact />
      <Footer />
      <Modal
        projectId={modalProjectId}
        projectIds={modalProjectIds}
        onClose={closeModal}
        onNavigate={setModalProjectId}
      />
    </>
  );
}
