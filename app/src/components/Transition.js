import React from 'react';
import { useSpring, animated } from '@react-spring/web'; // Use a versão modular do react-spring

const Transition = ({ children, show }) => {
    const styles = useSpring({
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0px)' : 'translateY(20px)',
        config: { duration: 300 }, // Ajuste o tempo de transição conforme necessário
    });

    return <animated.div style={styles}>{children}</animated.div>;
};

export default Transition;
