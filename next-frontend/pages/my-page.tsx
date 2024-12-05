import { useState } from "react";
import MyPage from "../components/MyPage";
import Modal from "../components/modal";
import Layout from "../components/Layout";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout noLayout={true}>
    <div>
      <MyPage />
      {/* <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
      >
        Open Modal
      </button> */}
      
      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
    </Layout>
  );
  
}

// Static property to hide Header and Footer
Home.noLayout = true