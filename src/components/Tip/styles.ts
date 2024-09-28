import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    height: 56,
    borderRadius: 8, // Cantos levemente arredondados
    justifyContent: 'center',
    backgroundColor: "#003366", // Cor do botão
    shadowColor: "#000", // Sombra para dar profundidade
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 2, // Sombra em Android
  },
  message: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#F2F2F2", // Cor do texto em azul escuro
  },
});
