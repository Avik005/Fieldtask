
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { TicketPriority } from "../types/ticket";

type PriorityFilterProps = {
  selectedPriority: TicketPriority | "all";
  onSelectPriority: (priority: TicketPriority | "all") => void;
};

const priorities: (TicketPriority | "all")[] = [
  "all",
  "urgent",
  "high",
  "medium",
  "low",
];

export default function PriorityFilter({
  selectedPriority,
  onSelectPriority,
}: PriorityFilterProps) {
  return (
    <View>
      <Text style={styles.filterTitle}>Filter by Priority</Text>

      <View style={styles.filterRow}>
        {priorities.map((priority) => {
          const isActive = selectedPriority === priority;

          return (
            <Pressable
              key={priority}
              onPress={() => onSelectPriority(priority)}
              style={[
                styles.filterButton,
                isActive && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  isActive && styles.activeFilterText,
                ]}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#123B66",
    marginBottom: 9,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
  },
  activeFilter: {
    backgroundColor: "#123B66",
  },
  filterText: {
    fontSize: 12,
    color: "#334155",
    fontWeight: "600",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
});
