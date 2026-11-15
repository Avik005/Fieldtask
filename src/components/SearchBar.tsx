
import { View, TextInput, StyleSheet } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by subject, customer or ID..."
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 15,
    color: "#123B66",
  },
});
