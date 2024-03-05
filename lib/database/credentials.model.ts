import {Schema, model, models, Document} from 'mongoose';

export interface ICredentials extends Document {
  email: string;
  password: string;
}

const CredentialsSchema = new Schema<ICredentials>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Credentials = models.Credentials || model<ICredentials>('Credentials', CredentialsSchema);

export default Credentials;
