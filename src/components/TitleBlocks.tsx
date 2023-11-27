import React from 'react';

interface TitleBlocksProps {
    text?: string;
}

const TitleBlocks: React.FC<TitleBlocksProps> = ({text}) => {
    return (
        <h2 className="text-3xl font-semibold">{text}</h2>
    );
}

export default TitleBlocks;
