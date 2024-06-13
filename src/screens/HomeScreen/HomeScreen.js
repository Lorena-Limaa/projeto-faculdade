import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TextInput, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSair = () => {
    navigation.navigate('SignIn'); 
  };

  const [formValue, setFormValue] = useState({
    professor: '',
    turma: '',
    aluno: '',
    periodoLetivo: '',
    disciplinas: '',
    materias: '',
    habilidades: '',
    objetivos: '',
    estrategias: '',
    foiPossivelAluno: [],
    procedimentosProfessor: [],
    observacoes: '',
    relatorio: '',
    dataProfessor: '',
    orientadoraEducacional: '',
    dataResponsavel: '',
    assinaturaResponsavel: ''
  });

  const { foiPossivelAluno, procedimentosProfessor } = formValue;

  const [formattedDate, setFormattedDate] = useState('');

const formatDate = (text) => {
  let formattedText = text.replace(/\D/g, '');
  if (formattedText.length > 2) {
    formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
  }
  if (formattedText.length > 5) {
    formattedText = `${formattedText.slice(0, 5)}/${formattedText.slice(5, 9)}`;
  }
  setFormattedDate(formattedText);
  setFormValue({ ...formValue, dataProfessor: formattedText });
};

  const generateWordDocument = () => {
  const {
    professor,
    turma,
    aluno,
    periodoLetivo,
    disciplinas,
    materias,
    habilidades,
    objetivos,
    estrategias,
    observacoes,
    relatorio,
    dataProfessor,
  } = formValue;


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
          new Paragraph({ text: "Informações Iniciais", heading: HeadingLevel.TITLE }),
          new Paragraph({ text: `Professor(a): ${professor}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Turma: ${turma}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Aluno(a): ${aluno}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Período Letivo: ${periodoLetivo}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Disciplinas: ${disciplinas}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Matérias: ${materias}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Habilidades: ${habilidades}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Objetivos: ${objetivos}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Estratégias: ${estrategias}`, heading: HeadingLevel.HEADING_1 }),
        ]
      },
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
          new Paragraph({ text: "Desenvolvimento das Aulas", heading: HeadingLevel.TITLE }),
          new Paragraph({ text: `Foi possível o(a) aluno(a): ${foiPossivelAluno.join(', ')}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Procedimentos do(a) professor(a): ${procedimentosProfessor.join(', ')}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Observações: ${observacoes}`, heading: HeadingLevel.HEADING_1 }),
        ]
      },
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
          new Paragraph({ text: "Relatório do Bimestre", heading: HeadingLevel.TITLE }),
          new Paragraph({ text: `Relatório: ${relatorio}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Data: ${dataProfessor}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Assinatura do(a) Professor(a):`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Orientadora Educacional: Rosangela`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Data:`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `Assinatura do Responsável:`, heading: HeadingLevel.HEADING_1 }),
        ]
      },
    ]
  });

  if (doc.sections && doc.sections.length > 0) {
    doc.sections.forEach((section) => {
      section.properties = { ...section.properties, border };
    });
  }

  const filename = FileSystem.documentDirectory + 'PEI - ' + formValue.aluno + ' - ' + formValue.turma +'.docx';
  Packer.toBase64String(doc).then((base64) => {
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64
    }).then(() => {
      console.log(`Saved file: ${filename}`);
      Sharing.shareAsync(filename);
    })
  });
};

return (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <SafeAreaView style={styles.container}>
    <Text>Primeira Página</Text>
    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, professor: text})}
      value={formValue.professor}
      placeholder="Professor(a)"
    />
    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, turma: text})}
      value={formValue.turma}
      placeholder="Turma"
    />
    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, aluno: text})}
      value={formValue.aluno}
      placeholder="Aluno(a)"
    />
    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, periodoLetivo: text})}
      value={formValue.periodoLetivo}
      placeholder="Período Letivo"
    />

    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, habilidades: text})}
      value={formValue.habilidades}
      placeholder="Habilidades"
    />
    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, objetivos: text})}
      value={formValue.objetivos}
      placeholder="Objetivos"
    />
    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, estrategias: text})}
      value={formValue.estrategias}
      placeholder="Estratégias"
    />

    <Text>Segunda Página</Text>
    <View style={styles.pageContainer}>
      <View style={styles.sectionContainer}>
        <Text>Foi possível o(a) aluno(a):</Text>
         <View style={styles.checkboxContainer}>
            <CheckBoxList
             options={['Explicar a disciplina com calma', 'Desenvolver o conteúdo no período da aula', 'Outros']}
              selectedValues={foiPossivelAluno}
              onChange={(values) => setFormValue({...formValue, foiPossivelAluno: values})}
            />
            {foiPossivelAluno.includes('Outros') && (
              <TextInput
                style={styles.input}
                onChangeText={(text) => setFormValue({...formValue, outrosFoiPossivelAluno: text})}
                value={formValue.outrosFoiPossivelAluno}
                placeholder="Outros"
              />
            )}
          </View>
      </View>

  <View style={styles.sectionContainer}>
    <Text>Procedimentos do(a) professor(a):</Text>
      <View style={styles.checkboxContainer}>
        <CheckBoxList
          options={['Realizar atividades práticas', 'Utilizar recursos visuais', 'Outros']}
          selectedValues={procedimentosProfessor}
          onChange={(values) => setFormValue({...formValue, procedimentosProfessor: values})}
        />
        {procedimentosProfessor.includes('Outros') && (
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFormValue({...formValue, outrosProcedimentosProfessor: text})}
            value={formValue.outrosProcedimentosProfessor}
            placeholder="Outros"
          />
      )}
    </View>
  </View>
</View>
    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, observacoes: text})}
      value={formValue.observacoes}
      placeholder="Observações"
    />

    <Text>Terceira Página</Text>
    <TextInput
      style={styles.input}
      onChangeText={(text) => setFormValue({...formValue, relatorio: text})}
      value={formValue.relatorio}
      placeholder="Relatório"
    />
    <TextInput
        style={styles.input}
        onChangeText={(text) => formatDate(text)}
        value={formValue.dataProfessor} // Usando formValue.dataProfessor
        placeholder="Data"
        maxLength={10}
        keyboardType="numeric"
      />

    <Button title="Generate Word Document" onPress={generateWordDocument} />
    <Button title="Sair" onPress={handleSair} style={{ backgroundColor: 'lightgrey' }} />
    <StatusBar style="auto" />
  </SafeAreaView>
  </ScrollView>
);
}

const CheckBoxList = ({ options, selectedValues, onChange }) => {
  const toggleOption = (option) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((value) => value !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  return (
    <>
      {options.map((option) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }} key={option}>
          <CheckBox
            value={selectedValues.includes(option)}
            onValueChange={() => toggleOption(option)}
          />
          <Text>{option}</Text>
        </View>
      ))}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
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
  pageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
});

export default HomeScreen;
