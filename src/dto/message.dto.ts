import { IsNotEmpty, IsString } from "class-validator";

// message.dto.ts
export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  toUserId: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
