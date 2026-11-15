
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.heading}>Support Desk</Text>

      <Text style={styles.agentLabel}>
        Agent: You
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    marginBottom: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#123B66",
  },

  agentLabel: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
  },
});
