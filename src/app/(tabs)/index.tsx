import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Stack } from "expo-router";
import { Avatar, Searchbar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Categories } from "@/src/data/categorydata";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Home() {
  const headerHight = useHeaderHeight();
  const [searchQuery, setSearchQuery] = React.useState("");
  const ref = useRef<TouchableOpacity[]>([]);
const [activeIndex,setActiveIndex]=useState(0)
  const handleSelectedcategory=(index:number)=>{
    setActiveIndex(index)
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Avatar.Image
                size={35}
                source={{ uri: "https://i.ibb.co/cCNWdT6/about.jpg" }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: "#FFF",
                borderRadius: 10,
                padding: 10,
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <Ionicons name="notifications" size={24} color={"#999"} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[style.container, { paddingTop: headerHight }]}>
        <View>
          <Text style={[style.headingText, { paddingVertical: 10 }]}>
            Explore The Beautiful Word !
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Searchbar
            style={{ backgroundColor: "#FFF", borderRadius: 10, width: "80%" }}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#f48c06",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 10,
            }}
          >
            <Ionicons name="options" size={24} color={"#FFF"} />
          </TouchableOpacity>
        </View>

        {/* category */}
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginVertical: 10,
            }}
          >
            Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
          >
            {Categories.map(({ name, icon }, index) => (
              <TouchableOpacity
                key={index}
                ref={(el) => ref.current[index] == el}
                onPress={()=>handleSelectedcategory(index)}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: activeIndex=== index 
              ? "#f48c06": "#FFF", 
                  borderRadius: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <MaterialCommunityIcons
                  name={icon as any}
                  size={24}
                  color={activeIndex==index?"#FFF":"#f48c06"}
                />
                <Text style={{
                    color:activeIndex==index?"#FFF":"#f48c06"
                }}>{name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#e9ecef",
  },
  headingText: {
    fontSize: 28,
    fontWeight: "800",
    color: "black",
    marginTop: 10,
  },
});
