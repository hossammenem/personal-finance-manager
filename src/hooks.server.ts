import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "$lib/prisma";

const handleAuth = SvelteKitAuth({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],	
  callbacks: {
			async session({ session, user }) {
				session.user = {
          id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					accountBalance: user.accountBalance,
          income: [],
          expenses: [],
          bills: [],
          savings: [],
				};
				return session;
			},
		},
  pages: {
    newUser: '/dashboard'
  }
});


const protectedHandle = (async ({ event, resolve }) => {
	const session = await event.locals.getSession();
	if (!session && event.route.id?.includes('(protected)')) {
		throw redirect(302, '/');
	}
	return resolve(event);
}) satisfies Handle;


export const handle = sequence(handleAuth, protectedHandle);
