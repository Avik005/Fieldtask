
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { Ticket } from "../types/ticket";

type TicketCardProps = {
  ticket: Ticket;
  onResolve: (ticketId: string) => void;
};

export default function TicketCard({
  ticket,
  onResolve,
}: TicketCardProps) {
  const priorityColor =
    ticket.priority === "urgent"
      ? "#DC2626"
      : ticket.priority === "high"
      ? "#EA580C"
      : ticket.priority === "medium"
      ? "#D97706"
      : "#16A34A";

  const statusColor =
    ticket.status === "open"
      ? "#2563EB"
      : ticket.status === "in-progress"
      ? "#D97706"
      : "#16A34A";

  const isWaitingTooLong = ticket.minutesWaiting > 60;

  return (
    <View style={styles.ticketCard}>
      <View style={styles.ticketTopRow}>
        <Text style={styles.ticketId}>{ticket.id}</Text>

        <Text
          style={[
            styles.priorityBadge,
            { backgroundColor: priorityColor },
          ]}
        >
          {ticket.priority.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.ticketSubject}>{ticket.subject}</Text>

      <Text style={styles.label}>
        Customer: {ticket.customer}
      </Text>

      <View style={styles.ticketInfoRow}>
        <Text style={styles.categoryBadge}>
          {ticket.category}
        </Text>

        <Text
          style={[
            styles.statusBadge,
            { backgroundColor: statusColor },
          ]}
        >
          {ticket.status.toUpperCase()}
        </Text>
      </View>

      <View style={styles.ticketFooter}>
        <Text style={styles.footerText}>
          Assigned: {ticket.assignedTo}
        </Text>

        <Text
          style={[
            styles.footerText,
            isWaitingTooLong && styles.warningText,
          ]}
        >
          {ticket.minutesWaiting} min waiting
          {isWaitingTooLong ? " !!" : ""}
        </Text>
      </View>

      {ticket.status !== "resolved" && (
        <Pressable
          onPress={() => onResolve(ticket.id)}
          style={styles.resolveButton}
        >
          <Text style={styles.resolveButtonText}>
            Resolve
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ticketCard: {
    width: "100%",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },
  ticketTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  ticketId: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#64748B",
  },
  priorityBadge: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  ticketSubject: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#123B66",
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
  },
  ticketInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  statusBadge: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  footerText: {
    fontSize: 11,
    color: "#64748B",
  },
  warningText: {
    color: "#B91C1C",
    backgroundColor: "#FEE2E2",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
  resolveButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  resolveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
