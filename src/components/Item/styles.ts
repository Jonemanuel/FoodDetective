import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: "#F2F2F2", // Fundo neutro para um visual clean
    borderRadius: 8, // Cantos levemente arredondados
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    shadowColor: "#000", // Sombra para dar profundidade
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 2, // Sombra em Android
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#003366", // Cor do título em azul escuro
  },
  percentage: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    backgroundColor: "#B3C7E6", // Azul claro para o percentual
    height: 42,
    width: 42,
    borderRadius: 7,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#003366", // Cor do texto em azul escuro para contraste
  },
});
