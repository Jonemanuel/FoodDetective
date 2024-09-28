import { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, Alert, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { api } from '../../services/api';
import { foodContains } from '../../utils/foodContains';
import { styles } from './styles';
import { Tip } from '../../components/Tip';
import { Item, ItemProps } from '../../components/Item';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';

export function Home() {
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [message, setMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Estado para animação

  useEffect(() => {
    console.log({
      apiId: process.env.EXPO_PUBLIC_API_MODEL_ID,
      modelVersionId: process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID,
      appId: process.env.EXPO_PUBLIC_API_APP_ID,
      userId: process.env.EXPO_PUBLIC_API_USER_ID,
    });
  }, []);

  async function handleSelectImage() {
    const permissionResult = await requestMediaLibraryPermission();
    if (!permissionResult) return;

    setIsLoading(true);

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (pickerResult.canceled) {
      setIsLoading(false);
      return;
    }

    const manipulatedImage = await ImageManipulator.manipulateAsync(
      pickerResult.assets[0].uri,
      [{ resize: { width: 900 } }],
      {
        compress: 1,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );

    if (manipulatedImage.base64) {
      setSelectedImageUri(manipulatedImage.uri);
      await foodDetect(manipulatedImage.base64);
      animateImage(); // Chama a animação após selecionar a imagem
    }

    setIsLoading(false);
  }

  async function requestMediaLibraryPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'É necessário permitir o acesso à galeria!');
      return false;
    }
    return true;
  }

  async function foodDetect(imageBase64: string) {
    try {
      const response = await api.post(`/v2/models/${process.env.EXPO_PUBLIC_API_MODEL_ID}/versions/${process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID}/outputs`, {
        "user_app_id": {
          "user_id": process.env.EXPO_PUBLIC_API_USER_ID,
          "app_id": process.env.EXPO_PUBLIC_API_APP_ID,
        },
        "inputs": [
          {
            "data": {
              "image": {
                "base64": imageBase64,
              },
            },
          },
        ],
      });

      const foods = response.data.outputs[0].data.concepts.map((concept: any) => {
        return {
          name: concept.name,
          percentage: `${Math.round(concept.value * 100)}%`,
        };
      });

      const isVegetable = foodContains(foods, 'vegetable');
      setMessage(isVegetable ? '' : 'Adicione vegetais em seu prato!');
      setItems(foods);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao processar a imagem.');
      console.error('Erro ao processar a imagem:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Função para animar a imagem
  const animateImage = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleSelectImage} disabled={isLoading} title="Selecionar Imagem" />

      {selectedImageUri ? (
        <Animated.Image
          source={{ uri: selectedImageUri }}
          style={[styles.image, { opacity: fadeAnim }]}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.description}>
          Selecione a foto do seu prato para analisar.
        </Text>
      )}

      <View style={styles.bottom}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {message && <Tip message={message} />}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>
              <View style={styles.items}>
                {items.map((item) => (
                  <Item key={item.name} data={item} />
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}
