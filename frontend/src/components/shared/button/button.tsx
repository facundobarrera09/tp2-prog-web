import React, { HTMLAttributes } from 'react';

interface ButtonProps {
    name: string;
    href: string;
    color?: 'darkturquoise' | 'red' | 'customred'
}

const Button: React.FC<ButtonProps> = ({ name, href, color }) => {
    return (
        <a href={href}>
            {/* Los nombres de las clases deben estar completos para ser interpretados por tailwind
            No se puede hacer `bg-{color}` */}
            <button className={`${color === 'darkturquoise' ? 'bg-darkturquoise' : 'bg-customred'} px-[7px] py-1 text-white text-center no-underline inline-block cursor-pointer rounded shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.75)]`}>
                {name}
            </button>
        </a>
    );
};

export default Button;