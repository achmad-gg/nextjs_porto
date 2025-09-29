import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bottom-0 z-50 flex items-end justify-center pb-20 bg-black/20 backdrop-blur-xs"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-[90%] max-w-md rounded-xl bg-gradient-to-br from-blue-800/80 to-blue-500/80 p-6 text-white shadow-lg"
          >
            <h2 id="modal-title" className="text-xl font-semibold sm:text-2xl">
              Desktop Experience Recommended
            </h2>
            <p className="mt-3 text-sm sm:text-base">
              For the best experience, we recommend viewing this portfolio on a
              desktop device. Some features, like orbiting skills and stacking
              cards, are optimized for larger screens.
            </p>
            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-500/80 sm:text-base hover:bg-blue-500"
                aria-label="Close modal"
              >
                Got it
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;