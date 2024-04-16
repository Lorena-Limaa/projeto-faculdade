import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');

    const navigation = useNavigation();

    const onConfirmPressed = () => {
        navigation.navigate("Home");
    };

    const onSignInPress = () => {
        navigation.navigate("SignIn");
    };

    const onResendPress = () => {
        console.warn('onResendPress');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirme seu e-mail</Text>

                <CustomInput 
                    placeholder="Digite seu código de confirmação" 
                    value={code} 
                    setValue={setCode}  
                />

                <CustomButton text="Confirmar" onPress={onConfirmPressed} />

                <CustomButton
                    text="Reenviar código" 
                    onPress={onResendPress} 
                    type="SECONDARY" 
                />

                <CustomButton
                    text="Voltar para fazer login" 
                    onPress={onSignInPress} 
                    type="TERTIARY" 
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },

    text: {
        color: 'gray',
        marginVertical: 10,
    },
    
    link: {
        color: '#FE2D2E',
    }
});

export default ConfirmEmailScreen;