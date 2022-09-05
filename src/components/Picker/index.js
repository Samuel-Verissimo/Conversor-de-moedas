// Importando pickers
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';


// Função principal dessa página
export default function Picker(props){
  
  // Visualização do usuário (retornando o picker)
  return(
    <RNPickerSelect
      placeholder={{label: 'Selecione uma moeda:', value: null, color: '#000'}}
      items={props.moedas}
      onValueChange={ (valor) => props.onChange(valor)  }
      style={{
        inputIOS:{
        fontSize:20,
        color: '#000' 
        },
        inputAndroid:{
          fontSize:20,
          color: '#000'         
        }
      }}
    />
  );
}