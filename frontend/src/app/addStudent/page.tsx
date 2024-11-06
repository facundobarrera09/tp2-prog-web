import Header from "../../components/Header";
import Button from "../../components/shared/button/button";

const Home: React.FC = () => {
    return (
        <div className="flex-1 min-w-fit">
            <Header title="Agregar alumnos" button={<Button color="customred" href="/students" name="Atras"></Button>}/>
        </div>
    )
}

export default Home