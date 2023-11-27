import React from 'react';

interface ButtonProps {
    backgroundColor: string;
    borderColor: string;
    text: string;
}

const CustomButton: React.FC<ButtonProps> = ({backgroundColor, borderColor, text}) => {

    const buttonStyle = `${backgroundColor} ${borderColor} border-2 py-3 px-6 rounded-xl`;

    return (
        <span className={buttonStyle}>
      {text}
    </span>
    );
};

export default CustomButton;
