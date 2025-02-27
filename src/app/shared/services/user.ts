export interface User {
   uid: string;
   email: string;
   displayName?: string;
   photoURL: string;
   emailVerified: boolean;
   hallTicketNumber?: string;
   examCompleted?:boolean;
}