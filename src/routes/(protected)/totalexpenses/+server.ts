import prisma from "$lib/prisma";
import type { RequestEvent } from "./$types";

export async function GET(request: RequestEvent) {
  const session = await request.locals.getSession()
  const id: string | null | undefined = session && session.user && session.user.id;

  if(!id) return new Response(JSON.stringify({message: "user not found"}), {status: 401})

  const totalExpenses = await prisma.expenses.count({
    where: {
      userId: id
    }
  })

  return new Response(JSON.stringify(totalExpenses), {status: 200});
}
