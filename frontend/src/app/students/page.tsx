"use client"

import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Button from "../../components/shared/button/button"
import { Cell, HeadCell, Row, Table } from "../../components/shared/table/Table"
import studentsService from "../../services/students"
import SearchBar from "../../components/shared/table/SearchBar"
import Paginator from "../../components/shared/table/Paginator"

const Home: React.FC = () => {
    const [count, setCount] = useState<number>(0)
    const [students, setStudents] = useState<Student[]>([])
    const [tableComponents, setTableComponents] = useState<React.ReactNode[]>([])

    const [searchCriteria, setSearchCriteria] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const fetchData = async () => {
        // console.log('search', searchCriteria, ', page', currentPage, ', pageSize', pageSize)

        const serviceResponse = await studentsService.getStudents(searchCriteria, currentPage, pageSize)

        if (serviceResponse.success) {
            setCount(serviceResponse.data.count)
            setStudents(serviceResponse.data.students)
        }
        // else {
        //     En este caso, el único insalvable que puede haber es el Network error, que es manejado en otro lugar
        // }
    }

    useEffect(() => {
        fetchData()
    }, [searchCriteria, pageSize, currentPage])

    const handlePageSizeChange = (value: number) => {
        setPageSize(value)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleSearchChange = (value: string) => {
        setCurrentPage(1)
        setSearchCriteria(value)
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

            <main className="px-5 my-5">
                <SearchBar setSearchCriteria={handleSearchChange} />
                <Table>
                    {tableComponents}
                </Table>
                <Paginator 
                    page={currentPage} pageSize={pageSize} count={count}
                    setPage={handlePageChange} setPageSize={handlePageSizeChange} 
                />
            </main>
        </div>
    )
}

export default Home