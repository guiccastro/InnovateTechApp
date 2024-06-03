import { FlatList, View } from "native-base";
import { memo, useContext, useEffect, useRef, useState } from "react";
import LoadingMore from "./LoadingMore";
import StudentCard from "./StudentCard";
import axios from "axios";
import IStudent, { filterByName } from "../interfaces/IStudent";
import IResults from "../interfaces/IResults";
import React from "react";
import GenderFilterContext from "../contexts/GenderFilterContext";
import { useSQLiteContext } from "expo-sqlite";
import { IStudentDatabase } from "@/src/database/StudentsDatabase";

type StudentsListProps = {
    textFilter: string
}

let isLoading = false
let firstPageReady = false

const StudentsList = (props: StudentsListProps) => {
    const [readingFromDB, setReadingFromDB] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [baseStudentsList, setBaseStudentsList] = useState<IStudent[]>([]);
    const [filteredList, setFilteredList] = useState<IStudent[]>([]);
    const flatListRef = useRef<any>()
    const context = useContext(GenderFilterContext)
    const db = useSQLiteContext()

    // Criação e leitura do banco de dados
    useEffect(() => {
        // Criação do banco de dados
        async function setupDB() {
            console.log(`Criando banco de dados...`)
            const result = await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS StudentsList (
                    uid INTEGER PRIMARY KEY NOT NULL, 
                    gender TEXT NOT NULL, 
                    firstName TEXT NOT NULL, lastName TEXT NOT NULL,
                    streetName TEXT NOT NULL, streetNumber TEXT NOT NULL,
                    city TEXT NOT NULL, state TEXT NOT NULL, country TEXT NOT NULL,
                    email TEXT NOT NULL,
                    dobDate TEXT NOT NULL, dobAge TEXT NOT NULL, 
                    phone TEXT NOT NULL,
                    uuid TEXT NOT NULL, 
                    pictureLarge TEXT NOT NULL, pictureMedium TEXT NOT NULL, pictureThumbnail TEXT NOT NULL,
                    nat TEXT NOT NULL
                );
            `)
            console.log(`Banco de dados criado.`)
        }

        // Leitura do banco de dados
        async function getStudentsListFromDB() {
            isLoading = true
            try {
                console.log(`Lendo lista de estudantes do banco de dados...`)
                const studentsListDB = await db.getAllAsync<IStudentDatabase>('SELECT * FROM StudentsList')
                setBaseStudentsList(studentsListDB.map(it => studentDBtoStudent(it)))
                console.log(`Banco de dados lido com ${studentsListDB.length} itens.`)
                firstPageReady = true
            } catch (error) {
                console.log(`Erro ao ler do database: ${error}`)
                setupDB()
            }
            setReadingFromDB(false)
            isLoading = false
        }

        getStudentsListFromDB()
    }, [])

    // Requisição e salvamento da primeira página
    useEffect(() => {
        async function insertStudentsToDatabase(studentsList: IStudent[]) {
            console.log("Salvando lista de estudantes no banco de dados...")
            for (let i = 0; i < studentsList.length; i++) {
                let student = studentsList[i]
                await db.runAsync('INSERT INTO StudentsList (uid, gender, firstName, lastName, streetName, streetNumber, city, state, country, email, dobDate, dobAge, phone, uuid, pictureLarge, pictureMedium, pictureThumbnail, nat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    student.uid, student.gender, student.name.first, student.name.last, student.location.street.name, student.location.street.number,
                    student.location.city, student.location.state, student.location.country, student.email, student.dob.date, student.dob.age,
                    student.phone, student.login.uuid, student.picture.large, student.picture.medium, student.picture.thumbnail, student.nat)
            }
            console.log("Lista de estudantes salvo banco de dados.")
        }

        async function requestFirstPage() {
            isLoading = true
            console.log(`Fazendo requisição da página: ${currentPage}`)
            try {
                const response = await axios.get<IResults<IStudent>>(`https://randomuser.me/api/?page=${currentPage}&results=20&seed=abc`)
                let newStudentsList = response.data.results
                for (let i = 0; i < newStudentsList.length; i++) {
                    newStudentsList[i].uid = i
                }
                setBaseStudentsList(newStudentsList)
                console.log(`Info baixada da página: ${currentPage}`)
                isLoading = false
                firstPageReady = true

                await insertStudentsToDatabase(newStudentsList)
            } catch (error) {
                console.log(`Erro ao requisitar ou salvar página ${currentPage}: ` + error)
            }
        }

        if (!readingFromDB && baseStudentsList.length == 0) {
            requestFirstPage()
        }
    }, [readingFromDB])

    // Filtragem
    useEffect(() => {
        console.log(`Filtrando lista - Text: "${props.textFilter}" - Gênero: "${context?.genderFilter}"`)

        // Filtro de gênero
        let genderFilteredList
        if (context?.genderFilter != "") {
            genderFilteredList = baseStudentsList.filter(it => it.gender == context?.genderFilter)
        } else {
            genderFilteredList = baseStudentsList
        }

        // Filtro de texto
        if (props.textFilter != "") {
            const oldListSize = filteredList.length
            const newFilteredList = genderFilteredList.filter(it => filterByName(it, props.textFilter))
            const newListSize = newFilteredList.length
            setFilteredList(newFilteredList)
            if (oldListSize == newListSize) {
                loadMore()
            }
        } else {
            setFilteredList(genderFilteredList)
        }
    }, [props.textFilter, baseStudentsList, context?.genderFilter])

    // Mudança de filtragem
    useEffect(() => {
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
    }, [props.textFilter, context?.genderFilter])

    const loadMore = () => {
        if (isLoading || !firstPageReady) return
        isLoading = true

        let nextPage = currentPage + 1
        setCurrentPage(nextPage)
        console.log(`Fazendo requisição da página: ${nextPage}`)

        axios.get<IResults<IStudent>>(`https://randomuser.me/api/?page=${nextPage}&results=20&seed=abc`)
            .then(response => {
                let newStudentsList = response.data.results
                for (let i = 0; i < newStudentsList.length; i++) {
                    newStudentsList[i].uid = ((nextPage - 1) * 20) + i
                }
                setBaseStudentsList([...baseStudentsList, ...newStudentsList])
                console.log(`Info baixada da página: ${nextPage}`)
                isLoading = false
            })
            .catch(error => {
                console.log(`Erro ao requisitar página ${currentPage}: ` + error)
            })
    }

    return (
        <View w={"100%"} flex={1}>
            <FlatList
                w={"100%"}
                flex={1}
                ref={flatListRef}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
                data={filteredList}
                renderItem={({ item }) => <StudentCard {...item} />}
                keyExtractor={item => `${item.uid}`}
                onEndReached={loadMore}
                onEndReachedThreshold={0}
                ListFooterComponent={<LoadingMore />}
            />
        </View>
    );
}

export default memo(StudentsList)

function studentDBtoStudent(studentDB: IStudentDatabase) {
    let student: IStudent = {
        gender: studentDB.gender,
        name: {
            first: studentDB.firstName,
            last: studentDB.lastName
        },
        location: {
            street: {
                number: studentDB.streetNumber,
                name: studentDB.streetName
            },
            city: studentDB.city,
            state: studentDB.state,
            country: studentDB.country
        },
        email: studentDB.email,
        dob: {
            date: studentDB.dobDate,
            age: Number(studentDB.dobAge)
        },
        phone: studentDB.phone,
        login: {
            uuid: studentDB.uuid
        },
        picture: {
            large: studentDB.pictureLarge,
            medium: studentDB.pictureMedium,
            thumbnail: studentDB.pictureThumbnail
        },
        nat: studentDB.nat,
        uid: Number(studentDB.uid)
    }
    return student
}