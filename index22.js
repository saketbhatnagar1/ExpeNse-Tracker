const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");
const transactionForm = document.getElementById("transactionForm");

let balance = 0;
let totalIncome = 0;
let totalExpense = 0;

transactionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const type = document.getElementById("type").checked ? "income" : "expense";
  const name = transactionForm.name.value.trim();
  const amount = parseFloat(transactionForm.amount.value);
  const date = transactionForm.date.value;

  if (isNaN(amount) || amount <= 0 || !date) {
    alert("Please fill in all fields correctly.");
    return;
  }

  addTransaction(type, name, amount, date);

  transactionForm.reset();
});

function addTransaction(type, name, amount, date) {
  const transactionItem = document.createElement("li");
  transactionItem.textContent = `${date} - ${name}: ${
    ("₹", amount.toFixed(2))
  } (${type})`;

  transactionList.appendChild(transactionItem);

  if (type === "income") {
    totalIncome += amount;
  } else {
    totalExpense += amount;
  }

  updateTotals();
}

function updateTotals() {
  balance = ("₹", totalIncome - totalExpense);

  balanceElement.textContent = balance.toFixed(2);
  incomeElement.textContent = totalIncome.toFixed(2);
  expenseElement.textContent = totalExpense.toFixed(2);
}
