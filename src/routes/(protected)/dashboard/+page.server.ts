import type { PageServerLoad, Actions } from './$types';
import prisma from "$lib/prisma";

export const load = (async ({ url, fetch }) => {
  const take = Number(url.searchParams.get("take")) || 7;
  const skip = Number(url.searchParams.get("skip")) || 0;

  const [ income, expenses, bills, savings ] = await Promise.all([fetch(`/income?take=${take}&skip=${skip}`), fetch("/expenses"), fetch("/bills"), fetch("/savings")])
  return {
    income: income.json(),
    expenses: expenses.json(),
    bills: bills.json(),
    savings: savings.json(),
  }
 }) satisfies PageServerLoad;

export const actions = {
  income: async ({ request, locals })=>{
    const session = await locals.getSession();
    const id: string | null | undefined = session && session.user && session.user.id;

    if(!id) return { message: "user not found", status: 401};


    const data = await request.formData();
    const source = data.get("source") as unknown as string;
    const amount: number = +(data.get("amount") as unknown as number);

    if(!source || !amount) return { message: "Invalid Data Has Been Entered, Missing Fields", status: 402};

    await prisma.income.create({
      data: {
        source,
        amount,
        date: new Date(),
        userId: id,
      }
    })

    const user = await prisma.user.update({
      where: { id },
      data: { accountBalance: { increment: amount } },
    });

    if(!user) return { message: "User Not Found", status: 402};


    return { message: "New Income Entry Has Been Added Successfully, And Account Balance Has Been Updated", status: 201};
  },

  expenses: async ({ request, locals })=> {
    const session = await locals.getSession();
    const id: string | null | undefined = session && session.user && session.user.id;

    if(!id) return { message: "user not found", status: 401};


    const data = await request.formData();
    const source = data.get("source") as unknown as string;
    const amount: number = +(data.get("amount") as unknown as number);

    if(!source || !amount) return { message: "Invalid Data Has Been Entered, Missing Fields", status: 402};

    await prisma.expenses.create({
      data: {
        source,
        amount,
        date: new Date(),
        userId: id,
      }
    })

    const user = await prisma.user.update({
      where: { id },
      data: { accountBalance: { decrement: amount } },
    });

    if(!user) return { message: "User Not Found", status: 402};


    return { message: "New Expenses Entry Has Been Added Successfully, And Account Balance Has Been Updated", status: 201};
  },

  bills: async ({ request, locals })=> {
    const session = await locals.getSession();
    const id: string | null | undefined = session && session.user && session.user.id;

    if(!id) return { message: "user not found", status: 401};

    const data = await request.formData();
    const name = data.get("name") as unknown as string;
    const amount: number = +(data.get("amount") as unknown as number);
    const dueDate = data.get("dueDate") as unknown as string;

    if(!name || !amount || !dueDate) return { message: "Invalid Data Has Been Entered, Missing Fields", status: 402};

    await prisma.bills.create({
      data: {
        name,
        amount,
        dueDate: new Date(dueDate),
        paied: false,
        userId: id,
      }
    })

    return { message: "New Bill Entry Has Been Added Successfully", status: 201};
  },

  payBills: async ({ request, locals})=> {
    const session = await locals.getSession();
    const id: string | null | undefined = session && session.user && session.user.id;

    if(!id) return { message: "user not found", status: 401};

    const data = await request.formData();
    const billId = data.get("billId") as unknown as string;

    if(!billId) return { message: "Invalid Data Has Been Entered, Missing Fields", status: 402};

    const paiedBill = await prisma.bills.update({
      where: {id : billId},
      data: {
        paied: true
      }
     })

    await prisma.user.update({
      where: { id },
      data: { accountBalance: { decrement: paiedBill.amount } },
    });

    return { message: "Bill Entry Has Been Updated Successfully", status: 200};
  },

  savings: async ({ request, locals })=> {
    const session = await locals.getSession();
    const id: string | null | undefined = session && session.user && session.user.id;

    if(!id) return { message: "user not found", status: 401};

    const data = await request.formData();
    const name = data.get("title") as unknown as string;
    const goal: number = +(data.get("goal") as unknown as number);
    const monthlyMinimum: number = +(data.get("minPerMonth") as unknown as number);

    if(!name || !monthlyMinimum || !goal) return { message: "Invalid Data Has Been Entered, Missing Fields", status: 402};

    await prisma.savings.create({
      data: {
        name,
        goal,
        monthlyMinimum,
        progress: 0,
        userId: id,
        date: new Date(),
      }
    })

    return { message: "New Bills Entry Has Been Added Successfully", status: 201};
  },

  paySavings: async ({ request, locals})=> {
    const session = await locals.getSession();
    const id: string | null | undefined = session && session.user && session.user.id;

    if(!id) return { message: "user not found", status: 401};

    const data = await request.formData();
    const goalId = data.get("goalId") as unknown as string;
    const amount = Number(data.get("amount"));

    if(!goalId || !amount) return { message: "Invalid Data Has Been Entered, Missing Fields", status: 402};

    
    await prisma.savings.update({ where: { id : goalId }, data: {
      progress: { increment: amount }
    }})

    await prisma.user.update({
      where: { id },
      data: { accountBalance: { decrement : amount } },
    });

    return { message: "Bill Entry Has Been Updated Successfully", status: 200};
  },


} satisfies Actions;
