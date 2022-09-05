// Importações básicas da minha página
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, StatusBar} from 'react-native';
import Picker from './src/components/Picker';
import api from './src/services/api';


// Função principal da minha página
export default function App() {

  // Setando algumas variaveis
  const [moedas, setTipoMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada_A, setMoeda_A] = useState(null);
  const [moedaValor_A, setValor_A] = useState(0);
  const [moedaSelecionada_B, setMoeda_B] = useState(null);

  const [ValorResultado, setValorResultado] = useState(0);


  // Após a página carregar, receber valores recebidos da API e adicionar em um array
  useEffect(()=>{
    async function loadMoedas(){
      const response = await api.get('all');
      let arrayMoedas = []

      // Adicionando nesse array a moeda "BRL", pois não vem na API e é acessível pela URL
      arrayMoedas.push({
        key: 'BRL',
        label: 'BRL',
        value: 'BRL'
      })

      // Percorrendo array e inserido valores em um array
      Object.keys(response.data).map((key)=>{
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })

      setTipoMoedas(arrayMoedas);
      setLoading(false);
    }

    loadMoedas();
  }, []);


  // Função para conversão
  async function converter(){
    
    // Verificando se todos os campos estão preenchidos
    if(moedaSelecionada_A === null || moedaValor_A === 0){
      alert('Por favor selecione uma moeda (1).');
      return;
    }else if(moedaSelecionada_B === null){
      alert('Por favor selecione uma moeda (2).')
      return;
    }
    
    // Fazendo requisão via HTTP
    const response = await api.get(`all/${moedaSelecionada_A}-${moedaSelecionada_B}`);
    //USD-BRL a API devolve quanto é 1 dolar convertido pra reais
    //BRL-EUR a API devolve quanto é 1 real convertido para euro

    // Realizando a conversão
    let resultado = (response.data[moedaSelecionada_A].ask * parseFloat(moedaValor_A));
    setValorResultado(`${resultado.toFixed(2)}`);

    //Aqui ele fecha o teclado
    Keyboard.dismiss();
  }
 

  // Visualização do usuário
  if(loading){
   return(
   <View style={{ justifyContent: 'center', alignItems: 'center', flex:1 }}>
    <ActivityIndicator color="#FFF" size={45} />
   </View>
   )
 }else{
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgb(106, 90, 205)"/>

      <View style={styles.areaTitulo}>
        <Text style={styles.textoTitulo}>Conversor de moedas</Text>
      </View>

      <View style={styles.areaMoeda}>
       <Text style={styles.tituloMoeda}>De: </Text>
       <Picker moedas={moedas} onChange={ (moeda) => setMoeda_A(moeda) } />
       <TextInput
        style={styles.input}
        placeholder="Digite um valor"
        keyboardType="numeric"
        onChangeText={ (valor) => setValor_A(valor) }
       />
      </View>
      
      <View style={[styles.areaValor, {apaddingBottom: 10}]}>
        <Text style={styles.tituloMoeda}>Para: </Text>
        <Picker moedas={moedas} onChange={ (moeda) => setMoeda_B(moeda) }/>
      </View>
 
     <TouchableOpacity style={styles.botaoArea} onPress={converter}>
       <Text style={styles.botaoTexto}>Converter</Text>
     </TouchableOpacity>
 
      {ValorResultado !== 0 && (
      <View style={styles.areaResultado}>
        <Text style={styles.ValorResultado}>
            {moedaValor_A} {moedaSelecionada_A} para {moedaSelecionada_B}
        </Text>
        <Text style={[styles.ValorResultado, { fontSize: 14, margin: 10 } ]}>
          Corresponde a
        </Text>
        <Text style={[styles.ValorResultado, { color: 'rgb(106, 90, 205)' }]}>
          {ValorResultado} 
        </Text>
      </View>
      )}
 
    </View>
   );
 }
}



// Estilos da minha página
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    backgroundColor: '#101215',
    paddingTop: 30
  },
  areaMoeda:{
    width: '90%',
    backgroundColor: '#F9f9f9',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1,
  },
  areaValor:{
    width: '90%',
    backgroundColor: '#F9f9f9',
    paddingTop: 9
  },
  input:{
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: 'rgb(106, 90, 205)'
  },
  botaoArea:{
   width: '90%',
   backgroundColor: 'rgb(106, 90, 205)',
   height: 45 ,
   borderBottomLeftRadius: 9,
   borderBottomRightRadius: 9,
   justifyContent: 'center',
   alignItems: 'center'
  },
  botaoTexto:{
    fontSize: 22,
    color:'#FFF',
    fontWeight: 'bold'
  },
  areaResultado:{
    width: '90%',
    backgroundColor:'#FFF',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 9
  },
  ValorResultado:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000'
  },
  tituloMoeda: {
    textAlign: 'center',
    fontSize: 13
  },
  areaTitulo: {
    padding: 15,
    fontSize: 30
  },
  textoTitulo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});  