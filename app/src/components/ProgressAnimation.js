import React from 'react';
import { useSpring, animated } from 'react-spring';

const ProgressAnimation = ({ progress }) => {
    const props = useSpring({ width: progress + '%' });

    return (
        <div className="progress" style={{ height: '20px', backgroundColor: '#e0e0e0' }}>
            <animated.div
                className="progress-bar"
                style={{
                    ...props,
                    backgroundColor: '#007bff',
                    height: '100%',
                    borderRadius: '5px',
                }}
            ></animated.div>
        </div>
    );
};

export default ProgressAnimation;
