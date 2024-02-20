/**
 * DTO for sending authentication info to the service layer
 */
export interface UserAuthDTO {
  readonly id: string;
  readonly username: string;
  readonly role: string;
}
