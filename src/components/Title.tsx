import { Text, View } from "native-base";

export default function Title() {
    return (
        <View>
            <Text
                fontSize={24}
                fontWeight={800}
                mt={10}
                color={"purple"}
            >InnovateTech</Text>
        </View>
    );
}