import type { RequestEvent } from "./$types"

export const load = async (event: RequestEvent) => {
  return {
    session: event.locals.getSession(),
  }
}
