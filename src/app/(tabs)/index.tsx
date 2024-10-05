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
  const headerHeight = useHeaderHeight();
  const [searchQuery, setSearchQuery] = React.useState("");
  const ref = useRef<(TouchableOpacity | null)[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState("all");

  const handleSelectedCategory = (index: number) => {
    setActiveIndex(index);
    const selectedCategory = ref.current[index];
    if (selectedCategory) {
      selectedCategory.measure((x) => {
        scrollRef.current?.scrollTo({
          x,
          y: 0,
          animated: true,
        });
      });
    }
  };

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
              <Ionicons name="notifications" size={24} color="#999" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <View>
          <Text style={[styles.headingText, { paddingVertical: 10 }]}>
            Explore The Beautiful World!
          </Text>
        </View>

        <View style={styles.searchSection}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />

          <TouchableOpacity style={styles.optionsButton}>
            <Ionicons name="options" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View>
          <Text style={styles.categoryTitle}>Categories</Text>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            {Categories.map(({ name, icon }, index) => (
              <TouchableOpacity
                key={index}
                ref={(el) => (ref.current[index] = el)} // Assigning ref correctly
                onPress={() => handleSelectedCategory(index)}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: activeIndex === index ? "#f48c06" : "#FFF",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={icon as any}
                  size={24}
                  color={activeIndex === index ? "#FFF" : "#f48c06"}
                />
                <Text
                  style={{
                    color: activeIndex === index ? "#FFF" : "#f48c06",
                  }}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: "80%",
  },
  optionsButton: {
    backgroundColor: "#f48c06",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  categoryContainer: {
    gap: 10,
  },
  categoryButton: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
