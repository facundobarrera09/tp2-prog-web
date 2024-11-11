"use client"

import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Button from "../../components/shared/button/button"
import { Cell, HeadCell, Row, Table } from "../../components/shared/table/Table"
import studentsService from "../../services/students"
import SearchBar from "../../components/shared/table/SearchBar"
import Paginator from "../../components/shared/table/Paginator"
import Overlay from "../../components/shared/Overlay"
import notify from "../../services/notifications"

const Home: React.FC = () => {
    const [pageLoading, setPageLoading] = useState(false)

    const [count, setCount] = useState<number>(0)
    const [students, setStudents] = useState<Student[]>([])
    const [tableComponents, setTableComponents] = useState<React.ReactNode[]>([])

    const [searchCriteria, setSearchCriteria] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const fetchData = async (search: string, page: number, size: number, callback?: Function) => {
        // console.log('search', search, ', page', page, ', pageSize', size)

        const serviceResponse = await studentsService.getStudents(search, page, size)

        if (serviceResponse.success) {
            setCount(serviceResponse.data.count)
            setStudents(serviceResponse.data.students)
            
            if (callback) callback()
            return
        }
    }

    const handlePageSizeChange = (value: number) => {
        setPageLoading(true)
        fetchData(
            searchCriteria, 1, value,
            () => {
                setPageSize(value)
                setCurrentPage(1)
            }
        ).then(() => {
            setPageLoading(false)
        })
    }
    
    const handlePageChange = (page: number) => {
        setPageLoading(true)
        fetchData(
            searchCriteria, page, pageSize,
            () => {
                setCurrentPage(page)
            }
        ).then(() => {
            setPageLoading(false)
        })
    }

    const handleSearchChange = (value: string) => {
        setPageLoading(true)
        fetchData(
            value, 1, pageSize,
            () => {
                setCurrentPage(1)
                setSearchCriteria(value)
            }
        ).then(() => {
            setPageLoading(false)
        })
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

        if (newTableComponents.length === 1) {
            newTableComponents.push(
                <Row key={1}>
                    <Cell span={4}>No se encontraron alumnos</Cell>
                </Row>
            )
        }

        setTableComponents(newTableComponents)
    }, [students])

    useEffect(() => {
        fetchData(searchCriteria, currentPage, pageSize)
    }, [])
    
    return (
        <div className="flex-1 min-w-fit">
            <Header title="Alumnos" button={<Button color="darkturquoise" href="/students/add" name="Agregar"></Button>}/>

            <main className="relative p-5">
                <Overlay active={pageLoading} />

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