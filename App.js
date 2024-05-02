import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [weatherInfo, setWeatherInfo] = useState('');
  const [weatherImage, setWeatherImage] = useState(null);

  const handleWeatherClick = async () => {
    const options = {
      method: 'GET',
      url: 'https://open-weather13.p.rapidapi.com/city/crato/PT_BR',
      headers: {
        'X-RapidAPI-Key': '377f2f15b8msh539bbe5ee6b2cd6p1f1ab6jsna705374552c7',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(options.url, options);
      const data = await response.json();

      if (data && data.main && data.main.temp) {
        let temperature = data.main.temp;
        temperature = ((temperature - 32) / 1.8);
        setWeatherInfo(`Temperatura: ${temperature.toFixed(2)} ºC`);

        if (temperature >= 29) {
          setWeatherImage(require('./assets/sol.png'));
        } else {
          setWeatherImage(require('./assets/Cubos_de_Gelo_PNG_Transparente_Sem_Fundo.png'));
        }
      } else {
        setWeatherInfo('Informações de clima não disponíveis');
      }
    } catch (error) {
      console.error('Erro ao buscar informações do clima:', error);
      setWeatherInfo('Erro ao buscar informações do clima');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema de Clima da Cidade do Crato</Text>
      <Button title="Clima" onPress={handleWeatherClick} color="green" />
      <Text style={styles.weatherInfo}>{weatherInfo}</Text>
      {weatherImage && <Image source={weatherImage} style={styles.weatherImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99CED3',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: 'black',
    marginBottom: 20,
  },
  weatherInfo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    color: 'black',
    marginTop: 20,
  },
  weatherImage: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});
