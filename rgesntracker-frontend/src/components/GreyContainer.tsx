import React from 'react';

interface GreyContainerProps {
    flexDirection: string;
    children: React.ReactNode;
}

const GreyContainer: React.FC<GreyContainerProps> = ({ flexDirection, children}) => {
    return (
        <div className={`flex ${flexDirection} bg-greyLight rounded-xl w-full p-8 my-8`}>{children}</div>
    );
}

export default GreyContainer;
