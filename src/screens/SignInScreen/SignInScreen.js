import React, {useState} from 'react';
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
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        // Validate user
        navigation.navigate("Home");
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword");
    };

    const onSignUpPress = () => {
        navigation.navigate("SignUp");
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
    },
    
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 20
    }
});

export default SignInScreen;