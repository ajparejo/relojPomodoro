import { Text, View, StyleSheet } from "react-native";

export default function Timer({tiempo}) {

    const tiempoFormateado = `${Math.floor(tiempo/60).toString().padStart(2,"0")}:${(tiempo%60).toString().padStart(2,"0")}`

    return(
        <View style={styles.container}>
            <Text style={styles.timer}>{tiempoFormateado}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
    },
    timer: {
        fontSize: 95,
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });