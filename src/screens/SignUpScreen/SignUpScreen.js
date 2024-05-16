import React from 'react';
import {View, StyleSheet, ScrollView, Text} from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();

    const onRegisterPressed = () => {
        navigation.navigate('ConfirmEmail');
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Crie uma conta</Text>

                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Nome do usuário"
                    rules={{
                        required: 'Por favor, preencha o campo nome do usuário',
                        minLength: {
                        value: 3,
                        message: 'O campo deve ter no mínimo 3 caracteres',
                        },
                        maxLength: {
                        value: 24,
                        message: 'O campo deve ter no máximo 24 caracteres',
                        },
                    }}
                />

                <CustomInput 
                    name="email"
                    control={control}
                    placeholder="E-mail"
                    rules={{
                        required: 'Por favor, preencha o campo E-mail',
                        pattern: {value: EMAIL_REGEX, message: 'Email inválido'}
                    }}
                />

                <CustomInput 
                    name="password"
                    control={control}
                    placeholder="Senha" 
                    secureTextEntry
                    rules={{
                        required: 'Por favor, preencha o campo senha',
                        minLength: {
                        value: 8,
                        message: 'O campo deve ter no mínimo 8 caracteres',
                        },
                    }}
                />

                <CustomInput 
                    name="password-repeat"
                    control={control}
                    placeholder="Digite a senha novamente" 
                    secureTextEntry
                    rules={{
                        validate: value => value === pwd || 'Senha não confere',
                    }}
                />

                <CustomButton text="Inscreva-se" onPress={handleSubmit(onRegisterPressed)} />

                <Text style={styles.text}>
                    Ao se registrar, você confirma que aceita nossos{' '} 
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Termos de Uso</Text> e{' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Política de Privacidade.</Text>
                </Text>

                <CustomButton
                    text="Tem uma conta? Faça o login" 
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
        marginTop: 80
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
        color: '#FF0000',
    }
});

export default SignUpScreen;