import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const onRegisterPressed = () => {
        console.warn('onRegisterPressed');
    };

    const onSignInPress = () => {
        console.warn('onSignInPress');
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
                    placeholder="Nome do usuário" 
                    value={username} 
                    setValue={setUsername}  
                />

                <CustomInput 
                    placeholder="E-mail" 
                    value={email} 
                    setValue={setEmail}  
                />

                <CustomInput 
                    placeholder="Senha" 
                    value={password} 
                    setValue={setPassword} 
                    secureTextEntry
                />

                <CustomInput 
                    placeholder="Repita a senha" 
                    value={passwordRepeat} 
                    setValue={setPasswordRepeat} 
                    secureTextEntry
                />

                <CustomButton text="Inscreva-se" onPress={onRegisterPressed} />

                <Text style={styles.text}>
                    Ao se registrar, você confirma que aceita nossos{' '} 
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Termos de Uso</Text> e{' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Política de Privacidade.</Text>
                </Text>

                <CustomButton
                    text="Tem uma conta? Entre" 
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
        color: '#FF0000',
    }
});

export default SignUpScreen;