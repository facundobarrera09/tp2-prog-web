interface HTTPResponse<D> {
    success: true,
    data: D
}

interface HTTPError {
    success: false,
    status: number,
    message: string,
    error: AxiosError
}

interface ServiceResponse<D> {
    success: true,
    data: D
}

interface ServiceError {
    success: false,
    message: string,
    error: Error
}

interface GetStudentsQuery {
    search: string,
    currentPage: number,
    pageSize: number
}

interface GetStudentsResponse {
    count: number,
    students: Student[]
}

interface Student {
    id: number,
    sid: bigint,
    firstname: string,
    lastname: string,
    email: string,
    dni: bigint
}