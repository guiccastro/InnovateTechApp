import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Icon, Text, VStack } from "native-base";

type StudentInfoProps = {
    label: string,
    icon: string
    content: string
}

export default function StudentInfo(studentInfo: StudentInfoProps) {
    return (
        <VStack>
            <HStack alignItems={"center"} space={1}>
                <Icon as={<MaterialIcons name={studentInfo.icon} />} size={5} color="purple" />
                <Text fontSize={14} fontWeight={700} color={"purple"}>{studentInfo.label}:</Text>
            </HStack>
            <Text fontSize={16}>{studentInfo.content}</Text>
        </VStack>
    );
}