import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import CryptoJS from 'crypto-js';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const { control, handleSubmit, watch, reset, setError } = useForm();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    setMessage('');
    setMessageType('');
    const encryptedPassword = CryptoJS.MD5(data.password).toString();

    fetch('https://grupoportugalgerencial.myscriptcase.com/scriptcase9/app/GrupoPortugal/conexao_signup/index.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: encryptedPassword,
        email: data.email,
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('Resposta da API:', res);
        if (res.success) {
          reset();
          setMessage('Usuário cadastrado com sucesso');
          setMessageType('success');
        } else {
          setMessage('Usuário já cadastrado');
          setMessageType('error');
        }
      })
      .catch((error) => {
        console.error('Erro ao conectar com o servidor:', error);
        setMessage('Erro ao conectar com o servidor');
        setMessageType('error');
      });
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
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
            pattern: { value: EMAIL_REGEX, message: 'Email inválido' }
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

        {message ? (
          <Text style={[styles.message, messageType === 'success' ? styles.success : styles.error]}>
            {message}
          </Text>
        ) : null}

        <CustomButton text="Inscreva-se" onPress={handleSubmit(onRegisterPressed)} />

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
  message: {
    marginVertical: 10,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
  },
  success: {
    color: 'green',
    backgroundColor: '#e0f8e0',
  },
  error: {
    color: 'red',
    backgroundColor: '#f8d7da',
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
