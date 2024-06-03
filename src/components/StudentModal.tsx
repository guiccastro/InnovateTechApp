import { Avatar, Divider, HStack, Modal, Text, VStack } from "native-base";
import StudentInfo from "./StudentInfo";
import IStudent, { getFormattedStudentAddress, getFormattedStudentDOB, getFormattedStudentGender, getFormattedStudentName } from "../interfaces/IStudent";


type StudentModalProps = {
    student: IStudent,
    onClose: () => void
}

export default function StudentModal(props: StudentModalProps) {
    return (
        <Modal isOpen={true} onClose={props.onClose}>
            <Modal.Content>
                <Modal.Body justifyContent={"center"} alignItems={"center"}>
                    <Avatar
                        size={32}
                        source={{
                            uri: props.student.picture.large
                        }}
                        borderWidth={2}
                        marginBottom={5}
                        borderColor={"purple"}
                    />
                    <Text fontSize={20} fontWeight={700} textAlign={"center"}>{getFormattedStudentName(props.student)}</Text>
                    <Text fontSize={10} fontWeight={300} textAlign={"center"}>{props.student.login.uuid}</Text>

                    <Divider marginY={5} backgroundColor={"purple"}/>

                    <VStack w={"100%"} space={3}>
                        <StudentInfo label={"E-mail"} icon={"email"} content={props.student.email} />
                        <HStack w={"100%"} justifyContent={"space-between"}>
                            <StudentInfo label={"Data de Nascimento"} icon={"date-range"} content={getFormattedStudentDOB(props.student, true)} />
                            <StudentInfo label={"Gênero"} icon={"person"} content={getFormattedStudentGender(props.student)} />
                        </HStack>
                        <HStack w={"100%"} justifyContent={"space-between"}>
                            <StudentInfo label={"Telefone"} icon={"phone"} content={props.student.phone} />
                            <StudentInfo label={"Nacionalidade"} icon={"flag"} content={props.student.nat} />
                        </HStack>
                        <StudentInfo label={"Endereço"} icon={"location-pin"} content={getFormattedStudentAddress(props.student)} />
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}