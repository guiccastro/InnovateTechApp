import { VStack } from "native-base"
import Title from "./components/Title";
import SearchInput from "./components/SearchInput";
import StudentsList from "./components/StudentsList";
import { useState } from "react";


export default function MainScreen() {
    const [searchText, setSearchText] = useState("")

    return (
        <VStack
            flex={1}
            alignItems="center"
            mt={5}
            marginX={5}
        >
            <Title />
            <SearchInput onChangeText={newText => setSearchText(newText)} />
            <StudentsList textFilter={searchText} />
        </VStack>
    );
}
