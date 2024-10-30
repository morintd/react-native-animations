import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors, Onboarding } from "./src";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Onboarding
          pages={[
            {
              id: "0",
              image: require("./assets/images/shopping-cart.png"),
              text: (
                <View>
                  <Text style={{ fontSize: 24, fontWeight: 700 }}>
                    Lorem ipsum
                  </Text>
                  <Text style={{ fontSize: 16, color: Colors.Secondary }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
              ),
            },
            {
              id: "1",
              image: require("./assets/images/shopping-cart-2.png"),
              text: (
                <Text style={{ fontSize: 22, fontWeight: 700 }}>
                  Aliquam condimentum, arcu vel suscipit pretium, massa turpis
                  varius arcu.
                </Text>
              ),
            },
            {
              id: "2",
              image: require("./assets/images/shopping-cart-3.png"),
              text: (
                <Text style={{ fontSize: 20, fontWeight: 700 }}>
                  Nec faucibus diam est eget nisi.
                </Text>
              ),
            },
            {
              id: "3",
              image: require("./assets/images/shopping-cart-4.png"),
              text: (
                <Text style={{ fontSize: 20, fontWeight: 700 }}>
                  Suspendisse fringilla magna eu mauris vulputate, vel rutrum
                  nisl tristique.
                </Text>
              ),
            },
            {
              id: "4",
              image: require("./assets/images/shopping-cart-5.png"),
              text: (
                <Text style={{ fontSize: 20, fontWeight: 700 }}>
                  Vestibulum viverra venenatis tempus.
                </Text>
              ),
            },
          ]}
          start={"Start"}
          ignore={"Ignore"}
          next={"Next"}
          done={"Finish"}
          onDone={() => {
            Alert.alert("Onboarding finished!");
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
