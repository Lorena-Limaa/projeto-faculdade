import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const SignInScreen = () => {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const [error, setError] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSignInPressed = (data) => {
        setError('');
        const encryptedPassword = CryptoJS.MD5(data.password).toString();

        fetch('https://grupoportugalgerencial.myscriptcase.com/scriptcase9/app/GrupoPortugal/conexao_user/index.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: encryptedPassword,                
            })
        })
        .then((response) => response.json())
        .then((res) => {
            console.log('Resposta da API:', res);
            if (res.success) {
                AsyncStorage.setItem('user', JSON.stringify(res.user));
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home', params: { user: res.user } }],
                    })
                );
            } else {
                setError('E-mail ou senha inválidos');
            }
        })
        .catch((error) => {
            console.error('Erro ao conectar com o servidor:', error);
            setError('Erro ao conectar com o servidor');
        });
    };

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, { height: height * 0.3 }]} 
                    resizeMode="contain" 
                />

                <CustomInput 
                    name="username"
                    placeholder="Nome do usuário"
                    control={control}
                    rules={{ required: 'Por favor, preencha o campo nome do usuário' }}
                />

                <CustomInput 
                    name="password"
                    placeholder="Senha" 
                    secureTextEntry
                    control={control}
                    rules={{
                        required: 'Por favor, preencha o campo senha', 
                        minLength: {
                            value: 8, 
                            message: 'A senha deve ter no mínimo 8 caracteres',
                        },
                    }}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <CustomButton text="Entrar" onPress={handleSubmit(onSignInPressed)} />

                <CustomButton
                    text="Não tem uma conta? Inscreva-se" 
                    onPress={onSignUpPress} 
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
        marginTop: 80
    },
    
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 20
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
    }
});

export default SignInScreen;
