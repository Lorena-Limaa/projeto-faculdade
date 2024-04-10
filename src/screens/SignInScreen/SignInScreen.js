import React, {useState} from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn("Sign in");
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    };

    const onSignUpPressed = () => {
        console.warn("Sign up");
    };

    return (
        <ScrollView>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain" 
                />

                <CustomInput 
                    placeholder="Nome do usuário" 
                    value={username} 
                    setValue={setUsername}  
                />

                <CustomInput 
                    placeholder="Senha" 
                    value={password} 
                    setValue={setPassword} 
                    secureTextEntry
                />

                <CustomButton text="Entrar" onPress={onSignInPressed} />

                <CustomButton
                    text="Esqueceu a senha?" 
                    onPress={onForgotPasswordPressed} 
                    type="SECONDARY" 
                />

                <CustomButton
                    text="Não tem uma conta? Se inscreva" 
                    onPress={onSignUpPressed} 
                    type="SECONDARY" 
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
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 20
    }
});

export default SignInScreen;