import { Spinner, Text, VStack } from "native-base";

export default function LoadingMore() {
    return (
        <VStack
            space={4}
            justifyContent={"center"}
            alignItems={"center"}
            marginY={10}
        >
            <Spinner accessibilityLabel="Carregando mais" size={50} />
            <Text
                style={{ textTransform: 'uppercase' }}
                fontSize={16}
                fontWeight={400}
            >Carregando mais</Text>
        </VStack>
    );
}