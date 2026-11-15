
export type TicketStatus = "open" | "in-progress" | "resolved";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string;
  minutesWaiting: number;
}
