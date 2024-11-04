import React from 'react';

interface ButtonProps {
    color: string;
    name: string;
    href: string;
}

const Button: React.FC<ButtonProps> = ({ color, name, href }) => {
    const buttonClasses = `bg-${color} p-[7px] shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.75)] text-white text-center no-underline inline-block cursor-pointer rounded`;

    return (
        <a href={href}>
            <button className={buttonClasses}>
                {name}
            </button>
        </a>
    );
};

export default Button;