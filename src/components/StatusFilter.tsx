
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { TicketStatus } from "../types/ticket";

type StatusFilterProps = {
  selectedStatus: TicketStatus | "all";
  onSelectStatus: (status: TicketStatus | "all") => void;
};

const statuses: (TicketStatus | "all")[] = [
  "all",
  "open",
  "in-progress",
  "resolved",
];

export default function StatusFilter({
  selectedStatus,
  onSelectStatus,
}: StatusFilterProps) {
  return (
    <View>
      <Text style={styles.filterTitle}>Filter by Status</Text>

      <View style={styles.filterRow}>
        {statuses.map((status) => {
          const isActive = selectedStatus === status;

          return (
            <Pressable
              key={status}
              onPress={() => onSelectStatus(status)}
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
                {status === "all"
                  ? "All"
                  : status === "in-progress"
                  ? "In Progress"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
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
