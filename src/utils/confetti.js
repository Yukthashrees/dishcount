import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#E76F51', '#F4A261', '#2A9D8F']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#E76F51', '#FFF8F3', '#2A9D8F']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#F4A261', '#E76F51']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
