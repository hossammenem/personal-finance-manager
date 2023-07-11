/// <reference types="@sveltejs/kit" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { IBills, IMoneyInMoneyOut, ISavings } from '$types/types';
import type { Session } from '@auth/sveltekit/node_modules/@auth/core/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session | undefined;
      income: IMoneyInMoneyOut[];
      expenses: IMoneyInMoneyOut[];
      bills: IBills[];
      savings: ISavings[];
		}
		// interface PageData {}
		// interface Platform {}
	}
}
