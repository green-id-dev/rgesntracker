import React from 'react';

interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button: React.FC<ButtonProps> = ({onClick, text}) => {
    return (
        <div className="mx-auto w-full flex justify-center ">


            <button
                onClick={onClick}
                className="bg-[#90D8B2] flex hover:bg-[#00BF7D] text-black font-bold p-4 px-8 rounded-xl "
                type="button"
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
