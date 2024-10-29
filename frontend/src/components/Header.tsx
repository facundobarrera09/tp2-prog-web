const Header: React.FC<{ title: string }> = ({ title }) => {
    return (
        <header className="w-full flex justify-between items-center px-5 shadow-border-bottom">
            <h2 className="py-5 text-3xl font-bold">{title}</h2>
        </header>
    )
}

export default Header