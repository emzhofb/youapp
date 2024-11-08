import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Profile, ProfileSchema } from 'src/schemas/profile.schema';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { ProfileController } from 'src/controllers/profile.controller';
import { ProfileService } from 'src/services/profile.service';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MessageController } from 'src/controllers/message.controller';
import { MessageService } from 'src/services/message.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/youapp'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    JwtModule.register({
      secret: 'very-secret-key', // Use a strong, secure key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, AuthController, ProfileController, MessageController],
  providers: [AppService, AuthService, ProfileService, MessageService, JwtStrategy],
})
export class AppModule {}
