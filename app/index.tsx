import MainScreen from '@/src/MainScreen';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, View } from "native-base";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { THEMES } from '@/src/styles/themes';
import GenderFilterContext from '@/src/contexts/GenderFilterContext';
import { SQLiteProvider } from 'expo-sqlite';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

export default function Index() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const [genderFilter, setGenderFilter] = useState("")

  return (
    <NativeBaseProvider theme={THEMES} >
      <View backgroundColor={"white"} w={"100%"} h={"100%"}>
        <SQLiteProvider databaseName="studentsDB.db">
          <GenderFilterContext.Provider value={{ genderFilter, setGenderFilter }}>
            <MainScreen />
          </GenderFilterContext.Provider>
          <StatusBar style='dark' />
        </SQLiteProvider>
      </View>
    </NativeBaseProvider>


  );
}
