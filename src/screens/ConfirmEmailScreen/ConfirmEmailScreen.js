import React from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
    const route = useRoute();
    const { control, handleSubmit } = useForm({
        defaultValues: { username: route?.params?.username },
    });

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
                    name="username"
                    control={control}
                    placeholder="Nome do usuário"
                    rules={{
                        required: 'Por favor, preencha o campo nome do usuário',
                    }}
                />

                <CustomInput 
                    name="code"
                    control={control}
                    placeholder="Digite seu código de confirmação"
                    rules={{
                        required: 'Por favor, preencha o campo código de confirmação',
                    }}
                />

                <CustomButton text="Confirmar" onPress={handleSubmit(onConfirmPressed)} />

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
