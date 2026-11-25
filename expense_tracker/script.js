let transactions=JSON.parse(localStorage.getItem('transactions'))||[];

function saveTransactions(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

document.querySelector('.Transaction_form').addEventListener('submit',function(event){
    event.preventDefault();

    let newTransaction={
        id:Date.now(),
        description:document.querySelector('.description').value,
        amount:Number(document.querySelector('.Amount').value),
        type:document.querySelector('.type').value,
        category:document.querySelector('.category_type').value,
        date:document.querySelector('.date').value
    };

    transactions.push(newTransaction);
    saveTransactions();
    this.reset();
    displayTransactions();
});

function displayTransactions(){
    let transactionList=document.querySelector('.transaction-list');
    let incomeTotal=document.querySelector('.income_total');
    let expenseTotal=document.querySelector('.Expense_total');
    let balanceTotal=document.querySelector('.Balance_total');

    transactionList.innerHTML='';
    let income=0;
    let expenses=0;

    for(let i=0;i<transactions.length;i++){
        let t=transactions[i];
        let sign='';

        if(t.type==='Income'){
            income+=t.amount;
            sign='+';
        }
        else{
            expenses+=t.amount;
            sign='-';
        }

        transactionList.innerHTML+=`
        <tr>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td>${t.date}</td>
            <td class="${t.type}">${sign} ₹ ${t.amount}</td>
            <td><button class="delete-btn" data-id="${t.id}">Delete</button></td>
        </tr>`;
    }

    incomeTotal.textContent='₹ '+income;
    expenseTotal.textContent='₹ '+expenses;
    balanceTotal.textContent='₹ '+(income-expenses);
}

document.querySelector('.transaction-list').addEventListener('click',function(event){
    if(event.target.classList.contains('delete-btn')){
        let id=Number(event.target.dataset.id);
        let updatedTransactions=[];

        for(let i=0;i<transactions.length;i++){
            if(transactions[i].id!==id){
                updatedTransactions.push(transactions[i]);
            }
        }
        transactions=updatedTransactions;
        saveTransactions();
        displayTransactions();
    }
});

displayTransactions();