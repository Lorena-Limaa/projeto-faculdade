import React from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const NewPasswordScreen = () => {
    const {control, handleSubmit} = useForm();

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate("Home");
    };

    const onSignInPress = () => {
        navigation.navigate("SignIn");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Resete sua senha</Text>

                <CustomInput
                    placeholder="Nome do usuário"
                    name="username"
                    control={control}
                    rules={{required: 'Por favor, preencha o campo nome do usuário'}}
                />

                <CustomInput 
                    placeholder="Código" 
                    name="code"
                    control={control}
                    rules={{required: 'Por favor, preencha o campo código'}}
                />

                <CustomInput 
                    placeholder="Digite sua nova senha" 
                    name="password"
                    control={control}
                    secureTextEntry
                    rules={{
                        required: 'Por favor, preencha o campo nova senha',
                        minLength: {
                        value: 8,
                        message: 'A senha deve ter no mínimo 8 caracteres',
                        },
                    }}  
                />

                <CustomButton text="Enviar" onPress={handleSubmit(onSubmitPressed)} />

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

export default NewPasswordScreen;