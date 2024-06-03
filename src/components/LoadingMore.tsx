import { Spinner, Text, VStack } from "native-base";

export default function LoadingMore() {
    return (
        <VStack
            space={8}
            justifyContent={"center"}
            alignItems={"center"}
            marginY={10}
        >
            <Spinner accessibilityLabel="Carregando mais" size={50} color={"purple"}/>
            <Text
                style={{ textTransform: 'uppercase' }}
                fontSize={16}
                fontWeight={500}
            >Carregando mais</Text>
        </VStack>
    );
}