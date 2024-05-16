import React from 'react';
import { 
    View, 
    Image, 
    StyleSheet, 
    useWindowDimensions, 
    ScrollView
} from "react-native";
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form'; 

const SignInScreen = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const {
        control, 
        handleSubmit, 
        formState: {errors},
    } = useForm();

    const onSignInPressed = data => {
        console.log(data);
        // Validate user
        navigation.navigate('Home');
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain" 
                />

                <CustomInput 
                    name="username"
                    placeholder="Nome do usuário"
                    control={control}
                    rules={{required: 'Por favor, preencha o campo nome do usuário'}}
                />

                <CustomInput 
                    name="password"
                    placeholder="Senha" 
                    secureTextEntry
                    control={control}
                    rules={{
                        required: 'Por favor, preencha o campo senha', 
                        minLength: {
                            value: 3, 
                            message: 'A senha deve ter no mínimo 3 caracteres',
                        },
                    }}
                />

                <CustomButton text="Entrar" onPress={handleSubmit(onSignInPressed)} />

                <CustomButton
                    text="Esqueceu a senha?" 
                    onPress={onForgotPasswordPressed} 
                    type="TERTIARY" 
                />

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
    }
});

export default SignInScreen;