import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer title="Stars App">
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Stars App', headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Stars App', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
