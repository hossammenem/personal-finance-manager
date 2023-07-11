import prisma from "$lib/prisma";
import type { RequestEvent } from "./$types";

export async function GET(request: RequestEvent) {
  const session = await request.locals.getSession()
  const id: string | null | undefined = session && session.user && session.user.id;

  if(!id) return new Response(JSON.stringify({message: "user not found"}), {status: 401})

  const savingsData = await prisma.savings.findMany({
    where: {
      userId: id
    }
  })

  return new Response(JSON.stringify(savingsData), {status: 200});
}
