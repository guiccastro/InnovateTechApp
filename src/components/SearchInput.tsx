import { MaterialIcons } from "@expo/vector-icons";
import { Button, HStack, Icon, Input, Modal, Text, View } from "native-base";
import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { THEMES } from "../styles/themes";
import GenderFilterContext from "../contexts/GenderFilterContext";

type SearchInputProps = {
    onChangeText: (newText: string) => void
}

export default function SearchInput(props: SearchInputProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMaleSelected, setIsMaleSelected] = useState(false)
    const [isFemaleSelected, setIsFemaleSelected] = useState(false)

    const genderFilterContext = useContext(GenderFilterContext)

    const onOptionPressed = (option: string) => {
        switch (option) {
            case "male": {
                setIsMaleSelected(!isMaleSelected)
                if (isFemaleSelected) {
                    setIsFemaleSelected(false)
                }
                break
            }
            case "female": {
                setIsFemaleSelected(!isFemaleSelected)
                if (isMaleSelected) {
                    setIsMaleSelected(false)
                }
                break
            }
        }
    }

    const saveOption = () => {
        if (!isMaleSelected && !isFemaleSelected) {
            genderFilterContext?.setGenderFilter("")
        } else if (isMaleSelected) {
            genderFilterContext?.setGenderFilter("male")
        } else {
            genderFilterContext?.setGenderFilter("female")
        }

        setIsModalOpen(false)
    }

    const onOpenFilter = () => {
        switch(genderFilterContext.genderFilter) {
            case "male": {
                setIsMaleSelected(true)
                setIsFemaleSelected(false)
                break
            }
            case "female": {
                setIsMaleSelected(false)
                setIsFemaleSelected(true)
                break
            }
            default: {
                setIsMaleSelected(false)
                setIsFemaleSelected(false)
                break
            }
        }
        setIsModalOpen(true)
    }

    return (
        <View w={"100%"} marginY={5}>
            <HStack alignItems="center" w={"100%"} justifyContent={"center"}>
                <Input
                    placeholder="Buscar por nome"
                    size={10}
                    borderColor={"gray.700"}
                    placeholderTextColor={"gray.400"}
                    focusOutlineColor={"purple"}
                    bgColor={"white"}
                    onChangeText={props.onChangeText}
                    InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="gray.700" />}
                    borderRadius={20}
                    cursorColor={"purple"}
                    flex={1}
                />

                <TouchableOpacity onPress={() => onOpenFilter()}>
                    <Icon as={<MaterialIcons name={"filter-alt"} />} size={10} ml={2} color="purple" />
                </TouchableOpacity>

                <Modal isOpen={isModalOpen} size={"full"} onClose={() => setIsModalOpen(false)} closeOnOverlayClick={true}>
                    <Modal.Content style={{ marginBottom: 0, marginTop: "auto" }}>
                        <Modal.Header>
                            <HStack w={"100%"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                                <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                                    <Icon as={<MaterialIcons name={"close"} />} size={7} mr={10}/>
                                </TouchableOpacity>
                                <Text flex={1} fontSize={20} style={{ textAlignVertical: 'center' }} textAlign={"center"} fontWeight={500}>Filtrar por gênero</Text>
                                <Button w={20} onPress={saveOption} variant={"ghost"}><Text color={"purple"}>Salvar</Text></Button>
                            </HStack>
                        </Modal.Header>
                        <Modal.Body>
                            <Button.Group isAttached mx={{ base: "auto", md: 0 }} marginY={5}>
                                <Button style={isMaleSelected ? styles.buttonSolid : styles.buttonOutline} onPress={() => onOptionPressed("male")}><Text style={isMaleSelected ? styles.fontSolid : styles.fontOutline}>Masculino</Text></Button>
                                <Button style={isFemaleSelected ? styles.buttonSolid : styles.buttonOutline} onPress={() => onOptionPressed("female")}><Text style={isFemaleSelected ? styles.fontSolid : styles.fontOutline}>Feminino</Text></Button>
                            </Button.Group>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

            </HStack>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonSolid: {
        backgroundColor: THEMES.colors.purple
    },
    buttonOutline: {
        backgroundColor: "white",
        borderColor: THEMES.colors.purple,
        borderWidth: 1,
        color: THEMES.colors.purple
    },
    fontSolid: {
        color: "white"
    },
    fontOutline: {
        color: THEMES.colors.purple
    }
})
