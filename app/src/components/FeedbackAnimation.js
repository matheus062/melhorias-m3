import React from 'react';
import { useSpring, animated } from 'react-spring';

const FeedbackAnimation = ({ feedback }) => {
    const props = useSpring({
        opacity: feedback === 'correct' ? 1 : 0,
        transform: feedback === 'correct' ? 'scale(1)' : 'scale(0.8)',
        config: { tension: 200, friction: 15 }, // Opcional: ajustando a suavidade da animação
    });

    return (
        <animated.div
            style={{
                ...props, // Aplica a animação para opacity e transform
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%)`, // Ajusta para manter no centro
                fontSize: '2rem',
                color: feedback === 'correct' ? 'green' : 'red',
            }}
        >
            {feedback === 'correct' ? 'Correct!' : 'Wrong!'}
        </animated.div>
    );
};

export default FeedbackAnimation;
