"use client"

import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Button from "../../components/shared/button/button"
import { Cell, HeadCell, Row, Table } from "../../components/table/Table"
import studentsService from "../../services/students"

const Home: React.FC = () => {
    const [count, setCount] = useState<number>(0)
    const [students, setStudents] = useState<Student[]>([])
    const [tableComponents, setTableComponents] = useState<React.ReactNode[]>([])

    const fetchData = async () => {
        const serviceResponse = await studentsService.getStudents()

        if (serviceResponse.success) {
            setCount(serviceResponse.data.count)
            setStudents(serviceResponse.data.students)
        }
        // else {
        //     En este caso, el único insalvable que puede haber es el Network error, que es manejado en otro lugar
        // }
    }

    useEffect(() => {
        const newTableComponents = [
            <Row key={-1}>
                <HeadCell>Legajo</HeadCell>
                <HeadCell>Nombre</HeadCell>
                <HeadCell>Apellido</HeadCell>
                <HeadCell>Acciones</HeadCell>
            </Row>
        ]
        
        newTableComponents.push(...students.map((student, key) => {
            return (
                <Row key={key}>
                    <Cell>{student.sid}</Cell>
                    <Cell>{student.firstname}</Cell>
                    <Cell>{student.lastname}</Cell>
                    <Cell>
                        <Button color="customred" href="#" name="Borrar" />
                    </Cell>
                </Row>
            )
        }))

        setTableComponents(newTableComponents)
    }, [students])

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div className="flex-1 min-w-fit">
            <Header title="Alumnos" button={<Button color="darkturquoise" href="/addStudent" name="Agregar"></Button>}/>

            <main className="px-5 mt-5">
                <Table>
                    {tableComponents}
                </Table>
            </main>
        </div>
    )
}

export default Home