
import { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";

import { tickets } from "../Data/tickets";

import type {
  Ticket,
  TicketPriority,
  TicketStatus,
} from "../types/ticket";

import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import TicketCard from "../components/TicketCard";
import AssignedToggle from "../components/AssignedToggle";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import PriorityFilter from "../components/PriorityFilter";
export default function WelcomeScreen() {

  const [ticketList,setTicketList] = useState<Ticket[]>(tickets);
  const handleResolve = (ticketId: string) => {
    setTicketList(current =>
      current.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: "resolved" }
          : ticket
      )
    );
  };
  const [onlyMine, setOnlyMine] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<TicketStatus | "all">("all");

  const [priorityFilter, setPriorityFilter] =
    useState<TicketPriority | "all">("all");
    const resetFilters = () => {
      setSearchQuery("");
      setStatusFilter("all");
      setPriorityFilter("all");
      setOnlyMine(false);
    };

  const unresolvedCount = ticketList.filter(
    ticket => ticket.status !== "resolved"
  ).length;

  const urgentCount = ticketList.filter(
    ticket =>
      ticket.priority === "urgent" &&
      ticket.status !== "resolved"
  ).length;
const filteredTickets = ticketList.filter(ticket => {

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const matchesSearch =
    ticket.subject.toLowerCase().includes(normalizedSearch) ||
    ticket.customer.toLowerCase().includes(normalizedSearch) ||
    ticket.id.toLowerCase().includes(normalizedSearch);

  const matchesStatus =
    statusFilter === "all" ||
    ticket.status === statusFilter;

  const matchesPriority =
    priorityFilter === "all" ||
    ticket.priority === priorityFilter;

  const matchesAssignment =
    !onlyMine || ticket.assignedTo === "You";

  return (
    matchesSearch &&
    matchesStatus &&
    matchesPriority &&
    matchesAssignment
  );
});
const priorityOrder: Record<TicketPriority, number> = {
  urgent: 1,
  high: 2,
  medium: 3,
  low: 4,
};

const sortedTickets = [...filteredTickets].sort((a, b) => {
  const priorityDifference =
    priorityOrder[a.priority] - priorityOrder[b.priority];

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return b.minutesWaiting - a.minutesWaiting;
});
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.summaryRow}>
        <SummaryCard
          title="Unresolved Tickets"
          count={unresolvedCount}
        />

        <SummaryCard
          title="Urgent Tickets"
          count={urgentCount}
          urgent={true}
        />
      </View>
      <AssignedToggle
        enabled={onlyMine}
        onToggle={() => setOnlyMine(current => !current)}
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
<Pressable
  onPress={resetFilters}
  style={{
    alignSelf: "flex-end",
    padding: 8,
    marginBottom: 8,
  }}
>
  <Text style={{ color: "#2563EB", fontWeight: "bold" }}>
    Clear All Filters
  </Text>
</Pressable>
<View style={styles.filterSection}>
  <StatusFilter
    selectedStatus={statusFilter}
    onSelectStatus={setStatusFilter}
  />
</View>

<View style={styles.filterSection}>
  <PriorityFilter
    selectedPriority={priorityFilter}
    onSelectPriority={setPriorityFilter}
  />
</View>
      <Text style={styles.sectionTitle}>
        Recent Tickets
      </Text>
<Text
  style={{
    color: "#64748B",
    fontSize: 13,
    marginBottom: 10,
    marginTop: 4,
  }}
>
  {sortedTickets.length}{" "}
  {sortedTickets.length === 1 ? "ticket" : "tickets"} found
</Text>
      <FlatList
        style={styles.ticketList}
        data={sortedTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TicketCard
            ticket={item}
            onResolve={handleResolve}
          />
        )}
    ListEmptyComponent={
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text style={styles.emptyText}>
          No tickets found.
        </Text>

        <Pressable
          onPress={resetFilters}
          style={{
            backgroundColor: "#123B66",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
            Reset Filters
          </Text>
        </Pressable>
      </View>
    }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F8FAFC",
    padding: 20,
    flexDirection: "column",
    alignItems: "stretch",
  },

  summaryRow: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 15,
  },

  filterSection: {
    width: "100%",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#123B66",
    marginBottom: 12,
  },

  ticketList: {
    flex: 1,
    width: "100%",
  },

  listContent: {
    paddingBottom: 20,
  },

  emptyText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 14,
    marginTop: 30,
  },
});