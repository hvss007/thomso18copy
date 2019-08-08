import Transition from 'react-transition-group/Transition';
import React from 'react';

const duration = 200;

const defaultStyle = {
    transition: `opacity ${duration}ms `,
    opacity:0,
    height:100
}

const transitionStyles = {
    entering: { opacity: 0},
    entered:  { opacity: 1, zIndex:10 },
    exiting:  { opacity: 1 },
    exited:   {opacity :0, zIndex: 0 },
};
const Fade = ({in: inProp, children }) => (
    <Transition in={inProp} timeout={{
     enter:200,
     exit:0,
    }}>
        {(state) => (
            <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}>
            {children}
        </div>
        )}
    </Transition>
);

export default Fade;
