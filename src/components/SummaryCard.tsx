
import { View, Text, StyleSheet } from "react-native";

type SummaryCardProps = {
  title: string;
  count: number;
  urgent?: boolean;
};

export default function SummaryCard({
  title,
  count,
  urgent = false,
}: SummaryCardProps) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryLabel}>{title}</Text>

      <Text
        style={[
          styles.summaryValue,
          urgent && styles.urgentValue,
        ]}
      >
        {count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#123B66",
    marginTop: 5,
  },
  urgentValue: {
    color: "#DC2626",
  },
});
