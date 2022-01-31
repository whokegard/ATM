//OnClick function to start the ATM
const play = document.getElementById("play");
play.addEventListener("click", function () {
  atm();
});

const account = {
  accountName: "William Hökegård",
  balance: 100,
  getBalance: function () {
    alert(`Balance: ${this.balance}$`);
  },
  //Using parseFloat here so it's possible to deposit for example: 20.55$.
  deposit: function () {
    let depositMoney = parseFloat(
      prompt("How much money do you want to deposit?")
    );
    if (this.accountError(depositMoney, 1)) return;
    this.balance += depositMoney;
  },
  withdrawal: function () {
    //Using parseFloat here so it's possible to withdrawal for example: 20.55$.
    let withdrawalMoney = parseFloat(
      prompt("How much money do you want to withdrawal?")
    );
    if (this.accountError(withdrawalMoney, 2)) return;
    this.balance -= withdrawalMoney;
  },
  getAccountName: function () {
    alert(`Account name: ${this.accountName}`);
  },
  //Exits the ATM.
  exitAccount: function () {
    alert("ATM is shutting down...");
    running = false;
    return;
  },
  //Error function that handles both deposit & withdrawal errors.
  //Two parameters for checking deposit or withdrawal errors.
  //Action 1 handles deposit errors.
  //Action 2 handles withdrawal errors.
  //If an error is found the function will return true.
  accountError: function (money, action) {
    //Deposit errors.
    let error = false;
    if (action === 1) {
      while (true) {
        if (isNaN(money)) {
          alert("Please enter a number!");
          error = true;
          this.deposit();
        }
        if (money <= 0) {
          alert(`You can't deposit ${money}$`);
          error = true;
          this.deposit();
        }
        break;
      }
    }
    //Withdrawal errors.
    if (action === 2) {
      while (true) {
        if (isNaN(money)) {
          alert("Please enter a number!");
          error = true;
          this.withdrawal();
        }
        if (money > this.balance) {
          alert("Not enough balance!");
          error = true;
        }
        if (money <= 0) {
          alert(`You can't withdrawal ${money}$`);
          error = true;
          this.withdrawal();
        }
        break;
      }
    }
    return error;
  },
};

//Switch menu, it's easier to read and to understand than a if/else menu.
function atm() {
  running = true;
  while (running) {
    //Using parseInt so the user only can enter numbers in the ATM menu,
    //works well with the switch case.
    let menuInput = parseInt(
      prompt(
        "Select a choice:\n (1). See Balance \n (2). Make a deposit \n (3). Make a withdrawal \n (4). Get account name \n (5). Exit"
      )
    );
    switch (menuInput) {
      case 1:
        account.getBalance();
        break;
      case 2:
        account.deposit();
        break;
      case 3:
        //Unable to enter case 3 function if your balance is at or below 0.
        if (account.balance <= 0) {
          alert("You don't have any money to withdrawal.");
          break;
        } else {
          account.withdrawal();
          break;
        }
      case 4:
        account.getAccountName();
        break;
      case 5:
        account.exitAccount();
        break;
    }
  }
}
