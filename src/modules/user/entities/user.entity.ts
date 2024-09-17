import { Allocation } from '@prisma/client';

export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  allocations: Allocation[];
}
