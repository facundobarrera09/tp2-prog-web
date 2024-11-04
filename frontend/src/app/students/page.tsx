import Header from "../../components/Header"
import Button from "../../components/shared/button/button"

const Home: React.FC = () => {
    return (
        <div className="flex-1 min-w-fit">
            <Header title="Alumnos" button={<Button color="darkturquoise" href="/addStudent" name="Agregar"></Button>}/>
        </div>
    )
}

export default Home