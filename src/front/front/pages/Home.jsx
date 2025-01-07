import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import SearchSection from '../components/recipes/SearchSection';
import RecipeCards from '../components/recipes/RecipeCards';
import Footer from '../components/layout/Footer';
import RegistrationModal from '../components/modals/RegistrationModal';
import RandomIcon from '../components/RandomIcon';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Navbar onRegisterClick={handleOpenModal} />
      <div className="text-center my-4">
        <RandomIcon />
      </div>
      <SearchSection onSearchClick={handleOpenModal} />
      <RecipeCards />
      <Footer />
      <RegistrationModal show={showModal} onClose={handleCloseModal} />
    </div>
  );
}

export default Home;
