import React from 'react';

const ScrollContext = React.createContext({
    scrollToCategory: (categoryName: string) => {
    },
    registerRef: (categoryName: string, ref: React.RefObject<HTMLDivElement>) => {
    }
});

export default ScrollContext;
