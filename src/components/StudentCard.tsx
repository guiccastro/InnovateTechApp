import { Avatar, Divider, HStack, Pressable, Text, VStack } from "native-base";
import StudentModal from "./StudentModal";
import { memo, useState } from "react";
import IStudent, { getFormattedStudentDOB, getFormattedStudentGender, getFormattedStudentName } from "../interfaces/IStudent";

const StudentCard = (student: IStudent) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <Pressable onPress={() => setShowModal(true)}>
            {showModal ? <StudentModal student={student} onClose={() => setShowModal(false)}/>: ''}
            <HStack
                w={"100%"}
                marginY={2}
                borderWidth={1}
                borderRadius={6}
                borderColor={"purple"}
                padding={4}
                backgroundColor={"white"}
                shadow={2}
            >
                <Avatar
                    size={20}
                    source={{
                        uri: student.picture.large
                    }}
                />

                <Divider orientation="vertical" marginX={4} backgroundColor={"purple"}/>

                <VStack
                    flex={1}
                >
                    <Text
                        w={"100%"}
                        fontSize={18}
                        fontWeight={700}
                    >{getFormattedStudentName(student)}</Text>

                    <HStack
                        mt={5}
                        justifyContent={"space-between"}
                    >
                        <Text
                            fontSize={16}
                            fontWeight={500}
                        >{getFormattedStudentGender(student)}</Text>

                        <Text
                            fontSize={16}
                            fontWeight={500}
                        >{getFormattedStudentDOB(student)}</Text>
                    </HStack>
                </VStack>
            </HStack>
        </Pressable>
    );
}

export default memo(StudentCard)