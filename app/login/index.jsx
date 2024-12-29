import { View, Text, Image, Pressable, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "web") {
      // Warm up the android/iOS browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const Index = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      console.log("Starting OAuth flow...");
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
        });
      console.log("OAuth flow completed:", {
        createdSessionId,
        signIn,
        signUp,
      });

      if (createdSessionId) {
        console.log("Session created:", createdSessionId);
      } else {
        console.log("Sign-in or sign-up required:", { signIn, signUp });
      }
    } catch (err) {
      console.error("OAuth Error:", err);
    }
  }, []);

  return (
    <View style={{ backgroundColor: Colors.WHITE }}>
      <Image
        source={require("../../assets/images/login.png")}
        style={{ width: "100%", height: 500 }}
      />
      <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}>
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          dolores!
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 14,
            width: "100%",
          }}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
            }}>
            Get started
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Index;
