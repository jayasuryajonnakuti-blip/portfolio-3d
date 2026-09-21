import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, isLoaded }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="loading-screen"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#030303',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="loading-content" style={{ textAlign: 'center' }}>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: '0.85rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#ededed',
                marginBottom: '2rem',
              }}
            >
              Initializing Neural Matrix
            </motion.h2>

            <div
              className="loading-bar-wrapper"
              style={{
                width: '260px',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: '#FF1A1A',
                  boxShadow: '0 0 15px #FF1A1A',
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                marginTop: '1.5rem',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.75rem',
                color: '#8a8a8a',
              }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          <div
            className="loading-decoration"
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              fontFamily: 'JetBrains Mono',
              fontSize: '0.65rem',
              color: 'rgba(255, 255, 255, 0.15)',
              textAlign: 'left',
            }}
          >
            SYS_BOOT // VER 4.0.0<br />
            CORE_LOAD // SUCCESSFUL<br />
            MEM_ALLOC // OPTIMIZED
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
