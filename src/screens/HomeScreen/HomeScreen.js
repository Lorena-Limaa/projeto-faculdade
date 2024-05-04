import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Document, Packer, Paragraph, HeadingLevel, BorderStyle } from 'docx';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    message: ''
  });

  const generateWordDocument = () => {
    const { name, email, message } = formValue;

    const border = {
      top: { style: BorderStyle.SINGLE },
      right: { style: BorderStyle.SINGLE },
      bottom: { style: BorderStyle.SINGLE },
      left: { style: BorderStyle.SINGLE },
    };

    let doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720,
                right: 720,
                bottom: 720,
                left: 720
              }
            }
          },
          children: [
            new Paragraph({ text: "Formulário de Contato", heading: HeadingLevel.TITLE }),
            new Paragraph({ text: `Nome: ${name}`, heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: `Email: ${email}`, heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: `Mensagem: ${message}` }),
          ]
        },
        {
            children: [
              new Paragraph({ text: "Nova Página", heading: HeadingLevel.HEADING_1 }),
              new Paragraph({ text: "Texto ou conteúdo que deve começar em uma nova página." }),
              new Paragraph({ text: "Isso pode ser informações detalhadas, um formulário, etc." }),
            ]
          }
      ]
    });

    if (doc.sections && doc.sections.length > 0) {
      doc.sections.forEach((section) => {
        section.properties = { ...section.properties, border };
      });
    }

    Packer.toBase64String(doc).then((base64) => {
      const filename = FileSystem.documentDirectory + "ContactForm.docx";
      FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64
      }).then(() => {
        console.log(`Saved file: ${filename}`);
        Sharing.shareAsync(filename);
      })
    })
  };

  return (
    
    <SafeAreaView>
    <Text>"OI"</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setFormValue({...formValue, name: text})}
        value={formValue.name}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setFormValue({...formValue, email: text})}
        value={formValue.email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setFormValue({...formValue, message: text})}
        value={formValue.message}
        placeholder="Mensagem"
        multiline
      />
      <Button title="Generate Word Document" onPress={generateWordDocument} />
      <StatusBar style="auto" />
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});


// import React, { useState } from 'react';
// import { View, Text, Button, TextInput } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';


// const HomeScreen = () => {
//   const [nomeAluno, setNomeAluno] = useState('');
//   const [turma, setTurma] = useState('');
//   const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');
//   const [aulasSelecionadas, setAulasSelecionadas] = useState([]);

//   const disciplinas = [
//     { label: 'Língua Portuguesa', value: 'Língua Portuguesa', aulas: ['Gramática', 'Literatura', 'Redação'] },
//     { label: 'Matemática', value: 'Matemática', aulas: ['Álgebra', 'Geometria', 'Cálculo'] },
//     // Adicione mais disciplinas e suas respectivas aulas conforme necessário
//   ];

//   const handleChangeDisciplina = (value) => {
//     setDisciplinaSelecionada(value);
//     setAulasSelecionadas([]); // Limpa as aulas selecionadas quando a disciplina muda
//   };

//   const handleChangeAulas = (value) => {
//     setAulasSelecionadas(value || []);
//   };

//   const handleFormSubmit = async () => {
//   // Faça algo com os dados do formulário
//   console.log('Nome do aluno:', nomeAluno);
//   console.log('Turma:', turma);
//   console.log('Disciplina selecionada:', disciplinaSelecionada);
//   console.log('Aulas selecionadas:', aulasSelecionadas);

//   // Garante que aulasSelecionadas seja um array mesmo se estiver undefined
//   const aulasSelecionadasArray = aulasSelecionadas || [];

//   // Converte aulasSelecionadas para uma string separada por vírgulas
//   const aulasSelecionadasString = aulasSelecionadasArray.join(', ');

//   // Chama a função para gerar e salvar o documento Word
//   await handleSubmit(nomeAluno, turma, disciplinaSelecionada, aulasSelecionadasString);
// };

//   return (
//     <View>
//       <Text>Nome do Aluno:</Text>
//       <TextInput
//         value={nomeAluno}
//         onChangeText={setNomeAluno}
//         placeholder="Digite o nome do aluno"
//       />

//       <Text>Turma:</Text>
//       <TextInput
//         value={turma}
//         onChangeText={setTurma}
//         placeholder="Digite a turma"
//       />

//       <Text>Selecione a disciplina:</Text>
//       <RNPickerSelect
//         value={disciplinaSelecionada}
//         onValueChange={handleChangeDisciplina}
//         placeholder={{ label: 'Selecione uma disciplina', value: null }}
//         items={disciplinas}
//       />

//       {disciplinaSelecionada !== '' && (
//         <View>
//           <Text>Selecione as aulas:</Text>
//           <RNPickerSelect
//             value={aulasSelecionadas}
//             onValueChange={handleChangeAulas}
//             placeholder={{ label: 'Selecione as aulas', value: null }}
//             items={disciplinas.find(disciplina => disciplina.value === disciplinaSelecionada).aulas.map((aula, index) => ({
//               label: aula,
//               value: aula
//             }))}
//             multiple // Permite seleção múltipla
//           />
//         </View>
//       )}

//       <Button title="Enviar" onPress={handleFormSubmit} />
//     </View>
//   );
// };

// export default HomeScreen;
// // import React from 'react';
// // import { SafeAreaView, Text } from 'react-native'


// // const HomeScreen = () => {
// //     return (
// //         <SafeAreaView style={{ flex: 1 }}>
// //             <Text style={{fontSize: 24, alignSelf: 'center'}}>Home, sweet home</Text>
// //         </SafeAreaView>
// //     );
// // };

// // export default HomeScreen;