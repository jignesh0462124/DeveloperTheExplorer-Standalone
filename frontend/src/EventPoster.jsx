import React from 'react';
import { motion } from 'framer-motion';

// --- CSS Styles ---
// (Your existing styles go here. I'm omitting them for brevity.)
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  /* ...all your other styles from the second component... */
  
  .poster-wrapper-v2 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    background: #f0f2f5;
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
  }

  .poster-container-v2 {
    width: 900px; /* Wider container for the layout */
    background: #ffffff;
    border-radius: 18px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #e0e0e0;
    padding: 50px;
    position: relative;
  }
  
  /* ...all your other styles... */

  .poster-image-item-v2 {
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .poster-image-item-v2 img {
    width: 100%;
    height: 220px; /* Fixed height for consistency */
    object-fit: cover;
    display: block;
  }
`;

// Animation variants for staggering children
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3
    }
  }
};

const itemVariantsY = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const sloganVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, delay: 1.5 } }
};


function EventPoster() {
  return (
    <>
      <style>{styles}</style>
      
      <div className="poster-wrapper-v2">
        <motion.div 
          className="poster-container-v2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* GDGoC Logo */}
          {/* TODO: Replace placeholder with your actual GDGoC logo image path */}
          <motion.img 
            src="https://via.placeholder.com/100x40/E8F5E9/000000?text=GDGoC" 
            alt="GDGoC Logo" 
            className="gdg-logo-v2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          <div className="poster-content-v2">
            <div className="poster-header-v2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A Journey to<br />Beyond Screens
              </motion.h1>
              <motion.p 
                className="poster-description-v2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                "Developer to Explorer" is not just another campus event – it’s experience. A 3-day, 2-night outdoor learning retreat...
              </motion.p>
            </div>

            <motion.div 
              className="poster-images-v2"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* TODO: Replace placeholders with your actual image paths */}
              <motion.div className="poster-image-item-v2" variants={itemVariantsY} whileHover={{ scale: 1.05, y: -5 }}>
                <img src="https://via.placeholder.com/300x220/87CEEB/FFFFFF?text=Coding+Outdoors" alt="Group coding outdoors" />
              </motion.div>
              <motion.div className="poster-image-item-v2" variants={itemVariantsY} whileHover={{ scale: 1.05, y: -5 }}>
                <img src="https://via.placeholder.com/300x220/FFD700/FFFFFF?text=Campfire+Brainstorm" alt="Group by campfire" />
              </motion.div>
              <motion.div className="poster-image-item-v2" variants={itemVariantsY} whileHover={{ scale: 1.05, y: -5 }}>
                <img src="https://via.placeholder.com/300x220/90EE90/FFFFFF?text=Adventure+Activity" alt="Group on adventure course" />
              </motion.div>
            </motion.div>

            <motion.div 
              className="poster-pillars-v2"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="pillar-item-v2" variants={itemVariantsY}>
                <div className="pillar-icon-v2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93h2c0 2.86 1.15 5.48 3 7.42V19zm-3.8-2.61c.4-.73.7-1.48.9-2.27H4.07c.48 1.48 1.46 2.76 2.72 3.52l.2-.18zm-.9-3.32c-.15-.74-.25-1.5-.27-2.28H2.07c.05 1.59.57 3.1 1.5 4.38L6.4 13zm12.63.75c.93-1.28 1.45-2.79 1.5-4.38h-3.86c-.02.78-.12 1.54-.27 2.28l.1.18zm-.9 3.32c1.26-.76 2.24-2.04 2.72-3.52h-3.05c.2.79.5 1.54.9 2.27l.2-.18zM13 19v-2.08c1.85-1.94 3-4.56 3-7.42h2c0 4.08-3.05 7.44-7 7.93zM8 8v1h8V8H8zm2 3v1h4v-1h-4zm-2 3v1h8v-1H8zm2-8h4v1h-4V6z"/>
                  </svg>
                </div>
                <h3 className="pillar-title-v2">Learn</h3>
                <p className="pillar-description-v2">Hands-on sessions on AI, coding, and tech tools.</p>
              </motion.div>

              <motion.div className="pillar-item-v2" variants={itemVariantsY}>
                <div className="pillar-icon-v2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21h22L12 2zm0 3.71L19.24 19H4.76L12 5.71zM11 10h2v4h-2zm-4 0h2v4H7zm8 0h2v4h-2zM12 1L2 22h20L12 1z"/>
                  </svg>
                </div>
                <h3 className="pillar-title-v2">Explore</h3>
                <p className="pillar-description-v2">Outdoor challenges and problem-solving in nature.</p>
              </motion.div>

              <motion.div className="pillar-item-v2" variants={itemVariantsY}>
                <div className="pillar-icon-v2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 14H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM7 2a2 2 0 00-2 2v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V4a2 2 0 00-2-2H7zm11 0c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V4a2 2 0 00-2-2h-2zM17 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-2z"/>
                  </svg>
                </div>
                <h3 className="pillar-title-v2">Connect</h3>
                <p className="pillar-description-v2">Collaborate with peers, mentors, and industry speakers.</p>
              </motion.div>
            </motion.div>

            <motion.p 
              className="poster-slogan-v2"
              variants={sloganVariants}
              initial="hidden"
              animate="visible"
            >
              "A perfect balance between code and calm, between data and discovery."
            </motion.p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default EventPoster;