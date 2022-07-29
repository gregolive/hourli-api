export type MongodbUser = {
  _id: string;
  email: string;
  emailVerified: boolean;
  provider: string;
  providerId: string | null;
  password: string;
};

export type PassportUser = {
  id?: number,
};
