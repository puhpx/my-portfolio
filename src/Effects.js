import React from 'react';
import { Fireworks } from '@fireworks-js/react';
import Confetti from 'react-dom-confetti';
import MyCanvas from './three/MyCanvas';
import { Button } from 'react-bootstrap';

export const handleFireworksClick = (setShowFireworks) => {
  setShowFireworks(true);
  setTimeout(() => setShowFireworks(false), 4000);
};

export const handleConfettiClick = (setShowConfetti) => {
  setShowConfetti(true);
  setTimeout(() => setShowConfetti(false), 3000);
};

export const handleGiftClick = (setShowGift) => {
  setShowGift(true);
};

export const handleCloseGiftClick = (setShowGift) => {
  setShowGift(false);
};

export const confetti_config = {
  angle: 120,
  spread: 360,
  startVelocity: 30,
  elementCount: 500,
  dragFriction: 0.1,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

export const FireworksComponent = () => {
  return (
    <Fireworks
      options={{
        rocketsPoint: {
          min: 0,
          max: 100,
        },
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
      }}
    />
  );
};

export const ConfettiComponent = ({ confetti_config, active }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <Confetti active={active} config={confetti_config} />
    </div>
  );
};


export const GiftComponent = ({ handleCloseGiftClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        width: '300px',
        height: '300px',
        overflow: 'auto',
        borderRadius: '10px',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <MyCanvas />
      <Button
        onClick={handleCloseGiftClick}
        variant="outline-danger"
        size="sm"
        style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          zIndex: 100000,
        }}
      >
        X
      </Button>
    </div>
  );
};
