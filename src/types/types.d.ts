import type { Session as OGSession, DefaultSession, User as OGUser } from '@auth/core/types';
import { SvelteKitAuthConfig as OGSvelteKitAuthConfig } from '@auth/sveltekit';

interface IMoneyInMoneyOut {
  source: string;
  amount: number;
  date: date;
}

interface IBills{
  id: string;
  name: string;
  amount: number;
  dueDate: date;
  paied: boolean;
}

interface ISavings{
  id: string;
  name: string;
  goal: number;
  monthlyMinimum: number;
  progress: number;
  date: date;
}

declare module '@auth/sveltekit/node_modules/@auth/core/types' {
	interface Session extends OGSession {
		user?: {
			id: string;
			accountBalance: number;
      income: IMoneyInMoneyOut[];
      expenses: IMoneyInMoneyOut[];
      bills: IBills[];
      savings: ISavings[];
		} & DefaultSession['user'];
	}

	interface User extends OGUser {
		accountBalance: number;
    income: IMoneyInMoneyOut[];
    expenses: IMoneyInMoneyOut[];
    bills: IBills[];
    savings: ISavings[];
	}
}
