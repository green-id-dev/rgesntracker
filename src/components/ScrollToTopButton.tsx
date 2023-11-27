import React from 'react';
import {ChevronUpIcon} from '@heroicons/react/24/outline';

const ScrollToTopButton: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-black p-2 rounded-full cursor-pointer z-50"
            aria-label="Retour en haut"
        >
            <ChevronUpIcon className="h-5 w-5"/>
        </button>
    );
};

export default ScrollToTopButton;
