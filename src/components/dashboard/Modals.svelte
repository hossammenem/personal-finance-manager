<script lang="ts">
  import Modal from "./Modal.svelte";
</script>


<Modal action="?/income" modalId="incomeModal" title="Add New Income Entry" fields={
  [{"type": "text", "placeholder": "Name", "name": "source"},
  {"type": "number", "placeholder": "amount", "name": "amount"}
  ]} />

<Modal action="?/expenses" modalId="expensesModal" title="Add New Expenses Entry" fields={
  [{"type": "text", "placeholder": "Name", "name": "source"},
  {"type": "number", "placeholder": "amount", name: "amount"}
  ]} />

<Modal action="?/bills" modalId="billsModal" title="Add New Bill" fields={
  [{"type": "text", "placeholder": "Name", "name": "name"},
  {"type": "number", "placeholder": "amount", "name": "amount"}
  ]} />

<Modal action="?/savings" modalId="savingsModal" title="Add New Saving Goal" fields={
  [{"type": "text", "placeholder": "Name", "name": "title"}, 
  {"type": "number", "placeholder": "goal", "name": "goal"},
  {"type": "number", "placeholder": "min/month", "name": "minPerMonth"}
  ]} />

<Modal action="?/payBills" modalId="payBillsModal" yesNoBtns={true} title="Have you Paid the Bill?" />

<Modal action="?/paySavings" modalId="paySavingsModal" paySavings={true} title="Pay for Your Goal" /> 
