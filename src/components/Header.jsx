import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const opciones = ["Pomodoro", "Descanso breve", "Descanso largo"];

export default function Header({tiempoActual, setTiempoActual, setTiempo}) {

  function handlePress(index) {
    const nuevoTiempo = index === 0 ? 25 : index === 1 ? 5 : 15;
    setTiempoActual(index);
    setTiempo(nuevoTiempo * 60);
  }

  return (
    <View style={styles.menu}>
      {opciones.map((item, index) => (
        <TouchableOpacity onPress={() => handlePress(index)} key={index} style={[styles.estiloItems, tiempoActual !== index && {borderColor: "transparent"}]}>
          <Text style={styles.textoMenu}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
  },
  estiloItems: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: '#fff',
    marginVertical: 20,
  },
  textoMenu: {
    textAlign: 'center',
  },
})
