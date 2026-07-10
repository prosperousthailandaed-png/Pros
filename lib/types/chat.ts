export type SenderType = 'customer' | 'admin';
export type ConversationStatus = 'open' | 'closed';

export interface Conversation {
  id: string;
  customer_name: string;
  customer_contact: string | null;
  status: ConversationStatus;
  created_at: string;
  last_message_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_type: SenderType;
  content: string;
  is_read: boolean;
  created_at: string;
}