import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 8, // Cantos levemente arredondados
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#003366", // Azul escuro
    position: "absolute",
    right: 42,
    top: 42,
    zIndex: 100,
    shadowColor: "#000", // Cor da sombra
    shadowOffset: {
      width: 0,
      height: 4, // Altura da sombra
    },
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 6, // Raio da sombra
    elevation: 5, // Sombra em Android
  },
  icon: {
    width: 32, // Tamanho do ícone
    height: 32, // Tamanho do ícone
    resizeMode: 'contain', // Ajuste do ícone
    tintColor: "#FFFFFF", // Cor do ícone em branco para contraste
  },
});
