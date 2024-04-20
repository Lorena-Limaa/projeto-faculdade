import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');

    const navigation = useNavigation();

    const onSendPressed = () => {
        navigation.navigate("NewPassword");
    };

    const onSignInPress = () => {
        navigation.navigate("SignIn");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Redefina sua senha</Text>

                <CustomInput 
                    placeholder="Nome do usuário" 
                    value={username} 
                    setValue={setUsername}  
                />

                <CustomButton text="Enviar" onPress={onSendPressed} />

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

export default ForgotPasswordScreen;