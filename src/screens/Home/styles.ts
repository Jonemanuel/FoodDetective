import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Fundo claro
  },
  description: {
    color: "#333", // Texto escuro
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    fontSize: 14,
    flex: 1,
    textAlignVertical: "center",
  },
  bottom: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Fundo branco
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    marginTop: -42,
    paddingTop: 12,
  },
  items: {
    flex: 1,
    gap: 12,
  },
  image: {
    flex: 1,
    borderRadius: 10, // Arredondar a imagem um pouco
    marginBottom: 12, // Espaço entre a imagem e a descrição
  },
});
