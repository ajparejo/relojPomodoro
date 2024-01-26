import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colores = ["#1272ef", "#f7e411", "#e36b1b"]

export default function App() {
  const [estaTrabajando, setEstaTrabajando] = useState(false);
  const [tiempo, setTiempo] = useState(25*60);
  const [tiempoActual, setTiempoActual] = useState("POMO"|"LARGO"|"CORTO");
  const [estaActivo, setEstaActivo] = useState(false);

  useEffect(() => {
    let interval = null;

    if (estaActivo) {
      interval = setInterval(() => {
        setTiempo(tiempo-1)
      }, 1);
    } else {
      clearInterval(interval);
    }

    if (tiempo === 0) {
      sonidoFinal();
      setEstaActivo(false);
      setEstaTrabajando((prev) => !prev);
      setTiempo(estaTrabajando ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [estaActivo, tiempo])

  function handleActivo() {
    sonidoInicio();
    setEstaActivo(!estaActivo);
  }

  function handleReset() {
    setTiempo(25*60)
  }

  async function sonidoInicio() {
    const {sound} = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    )
    await sound.playAsync();
  }

  async function sonidoFinal() {
    const {sound} = await Audio.Sound.createAsync(
      require('./assets/ding.mp3')
    )
    await sound.playAsync();
  }

  return (
    <View style={[styles.container, {backgroundColor: colores[tiempoActual]}]}>
      <Text style={styles.texto}>Pomodoro</Text>
      <Header setTiempo={setTiempo} tiempoActual={tiempoActual} setTiempoActual={setTiempoActual} />
      <Timer tiempo={tiempo}/>
      <TouchableOpacity onPress={handleActivo} style={styles.boton}>
        <Text style={styles.botonTexto}>{estaActivo ? 'Alto' : 'Inicio'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset} style={styles.boton}>
        <Text style={styles.botonTexto}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 15,
  },
  texto: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff'
  }
});
