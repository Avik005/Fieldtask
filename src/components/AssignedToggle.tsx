
import { Text, Pressable, StyleSheet } from "react-native";

type AssignedToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export default function AssignedToggle({
  enabled,
  onToggle,
}: AssignedToggleProps) {
  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.toggle,
        {
          backgroundColor: enabled ? "#DCFCE7" : "#FEE2E2",
        },
      ]}
    >
      <Text style={styles.toggleText}>
        {enabled ? "My Tickets: ON" : "My Tickets: OFF"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
    alignItems: "center",
  },

  toggleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#123B66",
  },
});
