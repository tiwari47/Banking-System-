let loginkey = sessionStorage.getItem("logging");
if (loginkey != 1) {
  alert("login first ");
  window.location.href = "login.html";
}

let customer_detail = JSON.parse(localStorage.getItem("detail")) || [];
// open new account button
let btn_open_new_account = document.getElementById("btnOpenNewAccount");
btn_open_new_account.addEventListener("click", function () {
  window.location.href = "openNewAccount.html";
});

//div_total_account btn this div is useded to show total account
let div_total_account = document.getElementById("div_total_account");
div_total_account.addEventListener("click", function () {
  window.location.href = "totalAccount_table.html";
});
// this variable is used to store total number of account in database
let count_total_account = document.getElementById("count_total_account");
count_total_account.textContent = customer_detail.length;

//this varibale is used to store details of user whos account type is  saving account
let count_saving_account = document.getElementById("count_saving_account");
count_saving_account.textContent = customer_detail.filter(
  (e) => e.account_type == "saving"
).length;

//this varibale is used to store details of user whos account type is  student account
let count_student_account = document.getElementById("count_student_account");
count_student_account.textContent = customer_detail.filter(
  (e) => e.account_type == "student"
).length;

let div_saving_account = document.getElementById("div_saving_account");
div_saving_account.addEventListener("click", function (e) {
  window.location.href = "savingAccount_table.html";
});

let div_student_account = document.getElementById("div_student_account");
div_student_account.addEventListener("click", function () {
  window.location.href = "studentAccount_table.html";
});

let btn_atm_setup = document.getElementById("btn_atm_setup");
btn_atm_setup.addEventListener("click", function () {
  window.location.href = "atm_setup.html";
});

let btn_withdrawal_from_atm = document.getElementById(
  "btn_withdrawal_from_atm"
);
btn_withdrawal_from_atm.addEventListener("click", function () {
  window.location.href = "atm_option_for_user.html";
});

// credit account button
let btn_credit_account = document.getElementById("btn_credit_account");

// onclick the model will be alive
btn_credit_account.addEventListener("click", function (e) {
  document.getElementById("pop_up_for_credit_account_modal").style.display =
    "block";
});

let close_modal = document.getElementById("close_modal");
close_modal.addEventListener("click", function (e) {
  document.getElementById("pop_up_for_credit_account_modal").style.display =
    "none";
  document.getElementById("account_number_check").value = "";
  document.getElementById("input_account_number_mode_bycheck").value = "";
  document.getElementById("deposite_amount").value = "";
  document.getElementById("re_enter_depsoite_amount").value = "";
  document.getElementById("outer_div_table_for_userdetail").style.display =
    "none";
  document.getElementById(
    "upper_div_for_credit_history_available"
  ).style.display = "none";
  document.getElementById("div_transaction_table").style.display = "none";
  // document.getElementById("div_table_for_userdetail").style.display = "none";
});

let btn_submit_account_number = document.getElementById(
  "btn_submit_account_number"
);

// Function for creating user details information table   START
function createUserDetailTable(customerIndex, tbody_for_userdetail) {
  tbody_for_userdetail.innerHTML = "";
  let row1 = document.createElement("tr");
  let th1 = document.createElement("th");
  th1.textContent = "A/C Number";
  let td1 = document.createElement("td");
  td1.textContent = customer_detail[customerIndex].account_number;
  row1.append(th1);
  row1.append(td1);
  let row2 = document.createElement("tr");
  let th2 = document.createElement("th");
  th2.textContent = "Name";
  let td2 = document.createElement("td");
  td2.textContent = customer_detail[customerIndex].name;
  row2.append(th2);
  row2.append(td2);
  let row3 = document.createElement("tr");
  let th3 = document.createElement("th");
  th3.textContent = "Contact Number";
  let td3 = document.createElement("td");
  td3.textContent = customer_detail[customerIndex].phone_number;
  row3.append(th3);
  row3.append(td3);
  let row4 = document.createElement("tr");
  let th4 = document.createElement("th");
  th4.textContent = "Email";
  let td4 = document.createElement("td");
  td4.textContent = customer_detail[customerIndex].email;
  row4.append(th4);
  row4.append(td4);
  let row5 = document.createElement("tr");
  let th5 = document.createElement("th");
  th5.textContent = "Age";
  let td5 = document.createElement("td");
  td5.textContent = customer_detail[customerIndex].age;
  row5.append(th5);
  row5.append(td5);
  let row6 = document.createElement("tr");
  let th6 = document.createElement("th");
  th6.textContent = "Aadhar Number";
  let td6 = document.createElement("td");
  td6.textContent = customer_detail[customerIndex].aadhar_number;
  row6.append(th6);
  row6.append(td6);
  let row7 = document.createElement("tr");
  let th7 = document.createElement("th");
  th7.textContent = "Pan Number";
  let td7 = document.createElement("td");
  td7.textContent = customer_detail[customerIndex].pan_number;
  row7.append(th7);
  row7.append(td7);
  let row8 = document.createElement("tr");
  let th8 = document.createElement("th");
  th8.textContent = "A/C Status";
  let td8 = document.createElement("td");
  td8.textContent =
    customer_detail[customerIndex].account_status == 0 ? "Active" : "Block";
  row8.append(th8);
  row8.append(td8);
  let rows = [row1, row2, row3, row4, row5, row6, row7, row8];
  for (let i = 0; i < rows.length; i++) {
    tbody_for_userdetail.append(rows[i]);
  }
}
//END

let customerIndex;

// Function to get index of the user
function checkUserExist(acc) {
  if (customer_detail.length == 0) {
    return 404;
  } else {
    for (let i = 0; i < customer_detail.length; i++) {
      if (acc == customer_detail[i].account_number) {
        return i;
      }
    }
    return 404;
  }
}
//function to find  the index of the user  we are depositing money
function get_user_index_for_checkbook_deposite(num) {
  for (let i = 0; i < customer_detail.length; i++) {
    if (customer_detail[i].checkbook_issue.length == 0) {
      console.log("check book is not created");
      continue;
    } else {
      for (let j = 0; j < customer_detail[i].checkbook_issue.length; j++) {
        if (num == customer_detail[i].checkbook_issue[j].series_number) {
          return i;
        }
      }
    }
  }
  return 404;
}

btn_submit_account_number.addEventListener("click", function () {
  let account_number_check = document.getElementById(
    "account_number_check"
  ).value;

  if (account_number_check.length !== 9) {
    document.getElementById("account_number_check").value = "";
    alert(" Enter the  your  account number");
  } else {
    customerIndex = checkUserExist(account_number_check);
    if (customerIndex == 404) {
      alert("User Detail Not Found");
    } else {
      document.getElementById("outer_div_table_for_userdetail").style.display =
        "block";
      document.getElementById(
        "upper_div_for_credit_history_available"
      ).style.display = "block";
      document.getElementById("div_transaction_table").style.display = "block";

      let tbody_for_userdetail = document.getElementById(
        "tbody_for_userdetail"
      );
      createUserDetailTable(customerIndex, tbody_for_userdetail);
      let transaction_table_body = document.getElementById(
        "tansaction_table_body"
      );
      creat_Table_For_Transaction_History(
        customerIndex,
        transaction_table_body,
        "deposite_transaction"
      );
    }
  }
  let output_for_available_balance = document.getElementById(
    "output_for_available_balance"
  );
  available_balance(
    customerIndex,
    "deposite_transaction",
    output_for_available_balance
  );
  document.getElementById("account_number_check").value = "";
});

// select to check deposite via check or cash   start
let selectDepositeType = document.getElementById("selectDepositeType");
selectDepositeType.addEventListener("click", function () {
  console.log("btn clicked");
  if (selectDepositeType.value == "Check") {
    document.getElementById("div_depositemode_bycheck").style.display = "block";
  } else {
    document.getElementById("div_depositemode_bycheck").style.display = "none";
    document.getElementById("input_account_number_mode_bycheck").value = "";
  }
});

//end

//we have created this counter variable only for withdrawal transaction operation
let withdrawal_transaction_check_sufficient_balance;

//function for check available_balance in account

function available_balance(index, type, show_output_available_balance_value) {
  let total_available_amount = 0;
  if (type == "deposite_transaction") {
    if (customer_detail[index].withdrawal_transaction.length == 0) {
      for (
        let i = 0;
        i < customer_detail[index].deposite_transaction.length;
        i++
      ) {
        total_available_amount +=
          customer_detail[index].deposite_transaction[i].amount;
      }
      show_output_available_balance_value.value = total_available_amount;
      customer_detail[index].total_amount_available = total_available_amount;
      localStorage.setItem("detail", JSON.stringify(customer_detail));
    } else {
      let value_for_total_deposite_transaction = 0;
      let value_for_total_withdrawal_transaction = 0;
      for (
        let i = 0;
        i < customer_detail[index].deposite_transaction.length;
        i++
      ) {
        value_for_total_deposite_transaction +=
          customer_detail[index].deposite_transaction[i].amount;
      }
      for (
        let j = 0;
        j < customer_detail[index].withdrawal_transaction.length;
        j++
      ) {
        value_for_total_withdrawal_transaction +=
          customer_detail[index].withdrawal_transaction[j].amount;
      }
      show_output_available_balance_value.value =
        value_for_total_deposite_transaction -
        value_for_total_withdrawal_transaction;
      customer_detail[index].total_amount_available =
        value_for_total_deposite_transaction -
        value_for_total_withdrawal_transaction;
      localStorage.setItem("detail", JSON.stringify(customer_detail));
    }
  } else if (type == "withdrawal_transaction") {
    if (customer_detail[index].deposite_transaction.length == 0) {
      withdrawal_transaction_check_sufficient_balance = 0;
      //  alert("Insufficient balance");
    } else if (customer_detail[index].deposite_transaction.length != 0) {
      let value_for_total_deposite_transaction = 0;
      let value_for_total_withdrawal_transaction = 0;
      for (
        let i = 0;
        i < customer_detail[index].deposite_transaction.length;
        i++
      ) {
        value_for_total_deposite_transaction +=
          customer_detail[index].deposite_transaction[i].amount;
      }
      for (
        let j = 0;
        j < customer_detail[index].withdrawal_transaction.length;
        j++
      ) {
        value_for_total_withdrawal_transaction +=
          customer_detail[index].withdrawal_transaction[j].amount;
      }
      withdrawal_transaction_check_sufficient_balance =
        value_for_total_deposite_transaction -
        value_for_total_withdrawal_transaction;
      show_output_available_balance_value.value =
        value_for_total_deposite_transaction -
        value_for_total_withdrawal_transaction;

      customer_detail[index].total_amount_available =
        value_for_total_deposite_transaction -
        value_for_total_withdrawal_transaction;
      localStorage.setItem("detail", JSON.stringify(customer_detail));
    }
  }
}

//End

// function for  creating   table for deposite History  START
function creat_Table_For_Transaction_History(
  index,
  transaction_table_body,
  type
) {
  transaction_table_body.innerHTML = "";
  if (
    type == "deposite_transaction" &&
    customer_detail[index].deposite_transaction.length != 0
  ) {
    console.log("no data found");
    let customer_detail_for_table_transaction =
      customer_detail[index].deposite_transaction;
    customer_detail_for_table_transaction.forEach((e, index) => {
      let row = document.createElement("tr");
      let td_sl_no = document.createElement("td");
      td_sl_no.textContent = index + 1;
      let td_account_number = document.createElement("td");
      td_account_number.textContent = e.account_number;
      let td_amount = document.createElement("td");
      td_amount.textContent = e.amount;
      let td_transaction_type = document.createElement("td");
      td_transaction_type.textContent = e.transaction_type;
      let td_transaction_id = document.createElement("td");
      td_transaction_id.textContent = e.transacation_Id;
      let td_date = document.createElement("td");
      td_date.textContent = e.date;
      row.append(td_sl_no);
      row.append(td_account_number);
      row.append(td_amount);
      row.append(td_transaction_type);
      row.append(td_transaction_id);
      row.append(td_date);
      transaction_table_body.append(row);
    });
  } else if (
    type == "withdrawal_transaction" &&
    customer_detail[index].withdrawal_transaction.length != 0
  ) {
    console.log("no data found");
    let customer_detail_for_table_transaction =
      customer_detail[index].withdrawal_transaction;
    customer_detail_for_table_transaction.forEach((e, index) => {
      let row = document.createElement("tr");
      let td_sl_no = document.createElement("td");
      td_sl_no.textContent = index + 1;
      let td_account_number = document.createElement("td");
      td_account_number.textContent = e.account_number;
      let td_amount = document.createElement("td");
      td_amount.textContent = e.amount;
      let td_transaction_type = document.createElement("td");
      td_transaction_type.textContent = e.transaction_type;
      let td_transaction_id = document.createElement("td");
      td_transaction_id.textContent = e.transacation_Id;
      let td_date = document.createElement("td");
      td_date.textContent = e.date;
      row.append(td_sl_no);
      row.append(td_account_number);
      row.append(td_amount);
      row.append(td_transaction_type);
      row.append(td_transaction_id);
      row.append(td_date);
      transaction_table_body.append(row);
    });
  } else if (
    type == "deposite_transaction" &&
    customer_detail[index].deposite_transaction.length == 0
  ) {
    transaction_table_body.textContent = "No  Transaction  yet ";
  } else if (
    type == "withdrawal_transaction" &&
    customer_detail[index].withdrawal_transaction.length == 0
  ) {
    transaction_table_body.textContent = "No  Transaction  yet ";
  } else if (
    type == "checkbook_issue" &&
    customer_detail[index].checkbook_issue.length == 0
  ) {
    transaction_table_body.textContent = "No Check-Book Issued ";
  } else if (type == "checkbook_issue") {
    let checkbook_issue_history_table = customer_detail[index].checkbook_issue;
    checkbook_issue_history_table.forEach((e, index) => {
      let row = document.createElement("tr");
      let td_sl_no = document.createElement("td");
      td_sl_no.textContent = index + 1;

      let td_check_book_series_number = document.createElement("td");
      td_check_book_series_number.textContent = e.check_book_series_number;

      let td_series_number = document.createElement("td");
      td_series_number.textContent = e.series_number;

      let td_date_of_check_issued = document.createElement("td");
      td_date_of_check_issued.textContent = e.date_of_check_issued;

      row.append(td_sl_no);
      row.append(td_check_book_series_number);
      row.append(td_series_number);
      row.append(td_date_of_check_issued);

      transaction_table_body.append(row);
    });
  }
}

//END
function deposite_by_check(index, amount) {
  if (customer_detail[index].deposite_transaction.length == 0) {
    return 0;
  } else if (
    customer_detail[index].withdrawal_transaction.length == 0 &&
    customer_detail[index].deposite_transaction.length != 0
  ) {
    let tempo_deposite_amount = 0;
    for (
      let i = 0;
      i < customer_detail[index].deposite_transaction.length;
      i++
    ) {
      tempo_deposite_amount += parseInt(
        customer_detail[index].deposite_transaction[i].amount
      );
    }

    if (tempo_deposite_amount < amount) {
      return 0;
    } else {
      return 1;
    }
  } else if (
    customer_detail[index].withdrawal_transaction.length != 0 &&
    customer_detail[index].deposite_transaction.length != 0
  ) {
    let tempo_deposite_amount = 0;
    let tempo_withdrawal_amount = 0;
    for (
      let i = 0;
      i < customer_detail[index].deposite_transaction.length;
      i++
    ) {
      tempo_deposite_amount += parseInt(
        customer_detail[index].deposite_transaction[i].amount
      );
    }
    for (
      let j = 0;
      j < customer_detail[index].withdrawal_transaction.length;
      j++
    ) {
      tempo_withdrawal_amount += parseInt(
        customer_detail[index].withdrawal_transaction[j].amount
      );
    }
    if (tempo_deposite_amount - tempo_withdrawal_amount < amount) {
      return 0;
    } else {
      return 1;
    }
  }
}

function check_account_limit_before_deposite(index, amount) {
  let tempo_amount = 0;
  let tempo_deposite_amount = 0;
  let tempo_withdrawal_amount = 0;

  if (
    customer_detail[index].deposite_transaction.length == 0 &&
    customer_detail[index].withdrawal_transaction.length == 0
  ) {
    tempo_amount = amount + 0;
    return tempo_amount;
  } else if (
    customer_detail[index].deposite_transaction.length != 0 &&
    customer_detail[index].withdrawal_transaction.length == 0
  ) {
    for (
      let i = 0;
      i < customer_detail[index].deposite_transaction[i].length;
      i++
    ) {
      tempo_deposite_amount += parseInt(
        customer_detail[index].deposite_transaction[i].amount
      );
    }
    tempo_amount = tempo_deposite_amount + amount;
    return tempo_amount;
  } else if (
    customer_detail[index].deposite_transaction.length != 0 &&
    customer_detail[index].withdrawal_transaction.length != 0
  ) {
    for (
      let j = 0;
      j < customer_detail[index].deposite_transaction[j].length;
      j++
    ) {
      tempo_deposite_amount += parseInt(
        customer_detail[index].deposite_transaction[j].amount
      );
    }
    for (
      let k = 0;
      k < customer_detail[index].withdrawal_transaction[k].length;
      k++
    ) {
      tempo_deposite_amount += parseInt(
        customer_detail[index].withdrawal_transaction[k].amount
      );
    }
    tempo_amount = amount + (tempo_deposite_amount - tempo_withdrawal_amount);

    return tempo_amount;
  }
}

// take deposite amount  from input
let btn_deposite_amount = document.getElementById("btn_deposite_amount");

btn_deposite_amount.addEventListener("click", function () {
  // c_d is current date
  let c_d = new Date();
  console.log(c_d);
  let date_now = `${c_d.getDate()}-${c_d.getMonth() + 1}-${c_d.getFullYear()}`;
  let selectDepositeType = document.getElementById("selectDepositeType").value;
  let depsoite_amount = document.getElementById("deposite_amount").value;
  let re_enter_deposite_amount = document.getElementById(
    "re_enter_depsoite_amount"
  ).value;

  if (
    depsoite_amount != re_enter_deposite_amount ||
    depsoite_amount == "" ||
    re_enter_deposite_amount == "" ||
    depsoite_amount.includes(".") == true ||
    re_enter_deposite_amount.includes(".") == true
  ) {
    document.getElementById("deposite_amount").value = "";
    document.getElementById("re_enter_depsoite_amount").value = "";
    alert("please enter  amount properly");
  } else if (selectDepositeType == "Check") {
    let input_account_number_mode_bycheck = document.getElementById(
      "input_account_number_mode_bycheck"
    ).value;
    if (input_account_number_mode_bycheck == "") {
      alert(" enter account");
    } else if (input_account_number_mode_bycheck.length != 4) {
      alert("please enter valid account number ");
    } else if (input_account_number_mode_bycheck.includes(".")) {
      alert("please enter valid account number ");
    } else {
      let check_user_exist_mode_bycheck = get_user_index_for_checkbook_deposite(
        input_account_number_mode_bycheck
      );

      if (check_user_exist_mode_bycheck == 404) {
        alert("User not found Enter another check book number  ");
      } else {
        if (
          customer_detail[customerIndex].account_status == 1 &&
          customer_detail[check_user_exist_mode_bycheck].account_status == 1
        ) {
          alert("Your account is blocked Unlock it!");
        } else if (
          parseInt(re_enter_deposite_amount) >
          parseInt(customer_detail[customerIndex].total_limit)
        ) {
          alert("Insufficint balance in account");
        } else {
          let check_amount_above_limit = check_account_limit_before_deposite(
            customerIndex,
            re_enter_deposite_amount
          );

          if (
            check_amount_above_limit >
            customer_detail[customerIndex].total_limit
          ) {
            alert("above your account limit");
          } else {
            let limit_checking = deposite_by_check(
              check_user_exist_mode_bycheck,
              re_enter_deposite_amount
            );
            if (limit_checking == 0) {
              alert(
                "Insufficient amount in account number",
                customer_detail[check_user_exist_mode_bycheck].account_number
              );
            } else {
              customer_detail[
                check_user_exist_mode_bycheck
              ].withdrawal_transaction.push({
                account_number: customer_detail[customerIndex].account_number,
                transacation_Id: Math.floor(Math.random() * 1000000 + 1),
                amount: parseInt(re_enter_deposite_amount),
                transaction_mode: "Check",
                transaction_type: "Debit",
                date: date_now,
                current_date: c_d,
              });

              customer_detail[customerIndex].deposite_transaction.push({
                account_number:
                  customer_detail[check_user_exist_mode_bycheck].account_number,
                transacation_Id: Math.floor(Math.random() * 1000000 + 1),
                amount: parseInt(re_enter_deposite_amount),
                transaction_type: "Credit",
                transaction_mode: selectDepositeType,
                date: date_now,
                current_date: c_d,
              });
              localStorage.setItem("detail", JSON.stringify(customer_detail));
              let transaction_table_body = document.getElementById(
                "tansaction_table_body"
              );
              creat_Table_For_Transaction_History(
                customerIndex,
                transaction_table_body,
                "deposite_transaction"
              );
              let output_for_available_balance = document.getElementById(
                "output_for_available_balance"
              );

              available_balance(
                customerIndex,
                "deposite_transaction",
                output_for_available_balance
              );
            }
          }
        }
      }
    }
  } else if (
    selectDepositeType == "Cash" &&
    depsoite_amount.includes(".") == false &&
    re_enter_deposite_amount.includes(".") == false &&
    depsoite_amount != "" &&
    re_enter_deposite_amount != "" &&
    depsoite_amount != 0 &&
    re_enter_deposite_amount != 0
   
  ) {
      if( customer_detail[customerIndex].account_status == 1)
      {
        alert("Account Blocked")
      }
     else if(
      parseInt(re_enter_deposite_amount) >
      parseInt(customer_detail[customerIndex].total_limit)
    ) {
      alert("above your account limit");
    }  else if (
      parseInt(re_enter_deposite_amount) <
      parseInt(customer_detail[customerIndex].total_limit)
    ) {
      let check_amount_above_limit = check_account_limit_before_deposite(
        customerIndex,
        re_enter_deposite_amount
      );

      if (
        check_amount_above_limit >
        parseInt(customer_detail[customerIndex].total_limit)
      ) {
        alert("Above limit Try Again");
      } else {
        customer_detail[customerIndex].deposite_transaction.push({
          account_number: customer_detail[customerIndex].account_number,
          transacation_Id: Math.floor(Math.random() * 1000000 + 1),
          amount: parseInt(re_enter_deposite_amount),
          transaction_type: "Credit",
          transaction_mode: selectDepositeType,
          date: date_now,
          current_date: c_d,
        });
        localStorage.setItem("detail", JSON.stringify(customer_detail));
        let transaction_table_body = document.getElementById(
          "tansaction_table_body"
        );
        creat_Table_For_Transaction_History(
          customerIndex,
          transaction_table_body,
          "deposite_transaction"
        );

        let output_for_available_balance = document.getElementById(
          "output_for_available_balance"
        );
        available_balance(
          customerIndex,
          "deposite_transaction",
          output_for_available_balance
        );

        document.getElementById("deposite_amount").value = "";
        document.getElementById("re_enter_depsoite_amount").value = "";
      }
    }
  }
});

// all the operation for debit account start here
let btn_debit_account = document.getElementById("btn_debit_account");
btn_debit_account.addEventListener("click", function () {
  console.log("btn_debit_account_clicked");
  document.getElementById("pop_up_for_debit_account_modal").style.display =
    "block";
});

//close_model_for_debit_account START FROM HERE

let debit_close_modal = document.getElementById("debit_close_modal");
debit_close_modal.addEventListener("click", function (e) {
  document.getElementById("pop_up_for_debit_account_modal").style.display =
    "none";
  document.getElementById("debit_account_number_check").value = "";
  document.getElementById("deposite_amount").value = "";
  document.getElementById("re_enter_deposite_amount").value = "";
  document.getElementById("input_account_number_mode_bycheck").value = "";

  document.getElementById(
    "debit_outer_div_table_for_userdetail"
  ).style.display = "none";
  document.getElementById(
    "upper_div_for_debit_history_available"
  ).style.display = "none";
  document.getElementById("debit_div_transaction_table").style.display = "none";
  // document.getElementById("debit_div_table_for_userdetail").style.display = "none";
});

// close_model_for_debit_account END

let btn_submit_debit_account_number = document.getElementById(
  "btn_submit_debit_account_number"
);
btn_submit_debit_account_number.addEventListener("click", function (e) {
  let debit_account_number_check = document.getElementById(
    "debit_account_number_check"
  ).value;
  if (debit_account_number_check.length !== 9) {
    document.getElementById("debit_account_number_check").value = "";
    alert(" Enter account number");
  } else {
    customerIndex = checkUserExist(debit_account_number_check);
    if (customerIndex == 404) {
      alert("User Detail Not Found");
    } else {
      //  document.getElementById("debit_div_table_for_userdetail").style.display = "block";
      document.getElementById(
        "debit_outer_div_table_for_userdetail"
      ).style.display = "block";
      document.getElementById(
        "upper_div_for_debit_history_available"
      ).style.display = "block";
      document.getElementById("debit_div_transaction_table").style.display =
        "block";

      let debit_tbody_for_userdetail = document.getElementById(
        "debit_tbody_for_userdetail"
      );
      createUserDetailTable(customerIndex, debit_tbody_for_userdetail);
    }
  }
  let debit_output_for_available_balance = document.getElementById(
    "debit_output_for_available_balance"
  );
  available_balance(
    customerIndex,
    "withdrawal_transaction",
    debit_output_for_available_balance
  );
  let debit_tansaction_table_body = document.getElementById(
    "debit_tansaction_table_body"
  );

  creat_Table_For_Transaction_History(
    customerIndex,
    debit_tansaction_table_body,
    "withdrawal_transaction"
  );
  document.getElementById("debit_account_number_check").value = "";
});

// select to check debit via check or cash or ATM   START
let select_debit_type = document.getElementById("select_debit_type");
select_debit_type.addEventListener("click", function () {
  console.log("btn clicked");
  if (select_debit_type.value == "Check") {
    document.getElementById("debit_div_debit_mode_bycheck").style.display =
      "block";
  } else {
    document.getElementById("debit_div_debit_mode_bycheck").style.display =
      "none";
  }
});

// take debit  amount  from input
let btn_debit_amount = document.getElementById("btn_debit_amount");
btn_debit_amount.addEventListener("click", function () {
  // c_d is current date
  let c_d = new Date();
  console.log(c_d);
  let date_now = `${c_d.getDate()}-${c_d.getMonth() + 1}-${c_d.getFullYear()}`;

  let select_debit_type = document.getElementById("select_debit_type").value;

  let debit_amount = document.getElementById("debit_amount").value;
  let re_enter_debit_amount = document.getElementById(
    "re_enter_debit_amount"
  ).value;

  if (
    debit_amount != re_enter_debit_amount ||
    debit_amount.includes(".") == true ||
    re_enter_debit_amount.includes(".") == true
  ) {
    document.getElementById("debit_amount").value = "";
    document.getElementById("re_enter_debit_amount").value = "";
    alert("please enter same amount");
  } else if (select_debit_type == "Check") {
    if (
      customer_detail[customerIndex].checkbook_issue.length == 0 ||
      debit_input_account_number_mode_bycheck == "" ||
      debit_input_account_number_mode_bycheck.length != 4 ||
      debit_input_account_number_mode_bycheck.includes(".") == true
    ) {
      alert("please enter generate check book first ");
    } else {
      if (customer_detail[customerIndex].account_status == 1) {
        alert("Account is blocked Please Unblock it!");
      }
      let user_found_for_check_book_withdrawal = 0;
      let debit_input_account_number_mode_bycheck = document.getElementById(
        "debit_input_account_number_mode_bycheck"
      ).value;
      for (
        let j = 0;
        j < customer_detail[customerIndex].checkbook_issue.length;
        j++
      ) {
        if (
          debit_input_account_number_mode_bycheck ==
          customer_detail[customerIndex].checkbook_issue[j].series_number
        ) {
          user_found_for_check_book_withdrawal = 1;
        }
      }
      if (user_found_for_check_book_withdrawal != 1) {
        alert("please enter valid series number ");
      } else {
        if (withdrawal_transaction_check_sufficient_balance == 0) {
          alert("Insufficient Balance");
        } else if (
          re_enter_debit_amount >
          withdrawal_transaction_check_sufficient_balance
        ) {
          alert("Insufficient Balance");
        } else {
          customer_detail[customerIndex].withdrawal_transaction.push({
            account_number: customer_detail[customerIndex].account_number,
            transacation_Id: Math.floor(Math.random() * 1000000 + 1),
            amount: parseInt(re_enter_debit_amount),
            transaction_type: "Debit",
            date: date_now,
            transaction_mode: select_debit_type,
            current_date: c_d,
          });
          localStorage.setItem("detail", JSON.stringify(customer_detail));
        }
        let debit_output_for_available_balance = document.getElementById(
          "debit_output_for_available_balance"
        );
        available_balance(
          customerIndex,
          "withdrawal_transaction",
          debit_output_for_available_balance
        );
        let debit_tansaction_table_body = document.getElementById(
          "debit_tansaction_table_body"
        );
        creat_Table_For_Transaction_History(
          customerIndex,
          debit_tansaction_table_body,
          "withdrawal_transaction"
        );
        document.getElementById("debit_amount").value = "";
        document.getElementById("re_enter_debit_amount").value = "";
      }
    }
  } else {
    if (withdrawal_transaction_check_sufficient_balance == 0) {
      alert("Insufficient Balance");
    } else if (
      re_enter_debit_amount > withdrawal_transaction_check_sufficient_balance
    ) {
      alert("Insufficient Balance");
    } else {
      if (customer_detail[customerIndex].account_status == 1) {
        alert("Account is blocked Please Unblock it!");
      } else {
        customer_detail[customerIndex].withdrawal_transaction.push({
          account_number: customer_detail[customerIndex].account_number,
          transacation_Id: Math.floor(Math.random() * 1000000 + 1),
          amount: parseInt(re_enter_debit_amount),
          transaction_type: "Debit",
          date: date_now,
          transaction_mode: select_debit_type,
          current_date: c_d,
        });
        localStorage.setItem("detail", JSON.stringify(customer_detail));
      }
      let debit_output_for_available_balance = document.getElementById(
        "debit_output_for_available_balance"
      );
      available_balance(
        customerIndex,
        "withdrawal_transaction",
        debit_output_for_available_balance
      );
      let debit_tansaction_table_body = document.getElementById(
        "debit_tansaction_table_body"
      );
      creat_Table_For_Transaction_History(
        customerIndex,
        debit_tansaction_table_body,
        "withdrawal_transaction"
      );
      document.getElementById("debit_amount").value = "";
      document.getElementById("re_enter_debit_amount").value = "";
    }
  }
});

// all operation for  Debit account is End Here

//operation for checkBook Issue start from here

let btn_checkbook_issue = document.getElementById("btn_checkbook_issue");
btn_checkbook_issue.addEventListener("click", function () {
  let pop_up_for_checkbook_issue_modal = document.getElementById(
    "pop_up_for_checkbook_issue_modal"
  );
  pop_up_for_checkbook_issue_modal.style.display = "block";
});

let btn_submit_checkbook_issue_account_number = document.getElementById(
  "btn_submit_checkbook_issue_account_number"
);

btn_submit_checkbook_issue_account_number.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    let checkbook_issue_account_number_check = document.getElementById(
      "checkbook_issue_account_number_check"
    ).value;
    if (
      checkbook_issue_account_number_check.length != 9 ||
      checkbook_issue_account_number_check == "" ||
      checkbook_issue_account_number_check.includes(".") == true
    ) {
      alert("Please enter valid account  number ");
    } else {
      customerIndex = checkUserExist(checkbook_issue_account_number_check);
      if (customerIndex == 400) {
        alert("User Detail Not Found");
      } else {
        document.getElementById(
          "checkbook_issue_outer_div_table_for_userdetail"
        ).style.display = "block";
        document.getElementById(
          "upper_div_for_checkbook_issue_history_available"
        ).style.display = "block";
        document.getElementById(
          "checkbook_issue_div_checkbook_detail_table"
        ).style.display = "block";
        let checkbook_issue_tbody_for_userdetail = document.getElementById(
          "checkbook_issue_tbody_for_userdetail"
        );
        createUserDetailTable(
          customerIndex,
          checkbook_issue_tbody_for_userdetail
        );
        let checkbook_issue_output_for_available_balance =
          document.getElementById(
            "checkbook_issue_output_for_available_balance"
          );
        available_balance(
          customerIndex,
          "withdrawal_transaction",
          checkbook_issue_output_for_available_balance
        );
        creat_Table_For_Transaction_History(
          customerIndex,
          checkbook_issue_table_body,
          "checkbook_issue"
        );
        document.getElementById("checkbook_issue_account_number_check").value =
          "";
      }
    }
  }
);

let btn_generate_checkBook = document.getElementById("btn_generate_checkBook");
btn_generate_checkBook.addEventListener("click", function () {
  let checkbook_issue_count_number = document.getElementById(
    "checkbook_issue_count_number"
  ).value;
  let input_4_digit_series_number = document.getElementById(
    "input_4_digit_series_number"
  ).value;
  if (
    checkbook_issue_count_number == "" ||
    input_4_digit_series_number == "" ||
    input_4_digit_series_number.length < 4 ||
    input_4_digit_series_number == 0 ||
    checkbook_issue_count_number == 0 ||
    input_4_digit_series_number.includes(".") == true
  ) {
    alert("please enter values in given input field");
  } else if (customer_detail[customerIndex].account_status == 1) {
    alert("Account is blocked Please Unblock it!");
  } else {
    for (let i = 0; i < checkbook_issue_count_number; i++) {
      let generated_series_number_checkbook =
        Math.floor(Math.random() * (100000 - 999999)) + 999999;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = mm + "-" + dd + "-" + yyyy;
      customer_detail[customerIndex].checkbook_issue.push({
        check_book_series_number: generated_series_number_checkbook,
        series_number: input_4_digit_series_number,
        date_of_check_issued: today,
      });
      localStorage.setItem("detail", JSON.stringify(customer_detail));
    }
    let checkbook_issue_table_body = document.getElementById(
      "checkbook_issue_table_body"
    );

    creat_Table_For_Transaction_History(
      customerIndex,
      checkbook_issue_table_body,
      "checkbook_issue"
    );
  }
});

let checkbook_issue_close_modal = document.getElementById(
  "checkbook_issue_close_modal"
);
checkbook_issue_close_modal.addEventListener("click", function () {
  document.getElementById("pop_up_for_checkbook_issue_modal").style.display =
    "none";
  document.getElementById(
    "checkbook_issue_div_checkbook_detail_table"
  ).style.display = "none";
  document.getElementById(
    "upper_div_for_checkbook_issue_history_available"
  ).style.display = "none";
  document.getElementById(
    "checkbook_issue_outer_div_table_for_userdetail"
  ).style.display = "none";
  document.getElementById("checkbook_issue_count_number").value = "";
  document.getElementById("input_4_digit_series_number").value = "";
});

// all the operations for check_book issue END here

//operation to generate atm card START

// this function is created to check whether the atm card is expired or not
function check_atm_card_expiry(customerIndex) {
  let current_index_of_atm_info;
  var today = new Date();
  var mm = today.getMonth() + 1;
  var yyyy_current = today.getFullYear();
  let total_length_of_atm_info_array =
    customer_detail[customerIndex].atm_info.length;
  current_index_of_atm_info = total_length_of_atm_info_array - 1;
  let check_expiry_date_of_atm =
    customer_detail[customerIndex].atm_info[current_index_of_atm_info]
      .dateofexp;
  let check_month_year = check_expiry_date_of_atm.split("/");
  if (
    check_month_year[current_index_of_atm_info] < mm &&
    check_month_year[current_index_of_atm_info] < yyyy_current
  ) {
    return 0;
  } else {
    return 1;
  }
}
//this function is created to generate atm card
function generateAtmCard(customerIndex) {
  document.getElementById("div_for_atm").style.display = "block";
  let total_length_of_atm_info_array =
    customer_detail[customerIndex].atm_info.length;
  current_index_of_atm_info = total_length_of_atm_info_array - 1;

  document.getElementById("span-4no-1").textContent = customer_detail[
    customerIndex
  ].atm_info[current_index_of_atm_info].atmnumber.slice(0, 4);
  document.getElementById("span-4no-2").textContent = customer_detail[
    customerIndex
  ].atm_info[current_index_of_atm_info].atmnumber.slice(4, 8);
  document.getElementById("span-4no-3").textContent = customer_detail[
    customerIndex
  ].atm_info[current_index_of_atm_info].atmnumber.slice(8, 12);
  document.getElementById("span-4no-4").textContent = customer_detail[
    customerIndex
  ].atm_info[current_index_of_atm_info].atmnumber.slice(12, 16);
  document.getElementById("h4_card_holder_name").textContent =
    customer_detail[customerIndex].atm_info[
      current_index_of_atm_info
    ].name_of_card_holder;
  document.getElementById("atm_expiry_number").textContent =
    customer_detail[customerIndex].atm_info[
      current_index_of_atm_info
    ].dateofexp;
}

let btn_atm = document.getElementById("btn_atm");
btn_atm.addEventListener("click", function () {
  document.getElementById("pop_up_for_atm_modal").style.display = "block";
});

let btn_submit_atm_account_number = document.getElementById(
  "btn_submit_atm_account_number"
);

btn_submit_atm_account_number.addEventListener("click", function () {
  let atm_account_number_check = document.getElementById(
    "atm_account_number_check"
  ).value;
  if (atm_account_number_check.length != 9 || atm_account_number_check == "") {
    alert("please enter valid account number ");
  } else {
    customerIndex = checkUserExist(atm_account_number_check);
    if (customerIndex == 404) {
      alert("User not found");
    } else {
      let atm_tbody_for_userdetail = document.getElementById(
        "atm_tbody_for_userdetail"
      );

      createUserDetailTable(customerIndex, atm_tbody_for_userdetail);
      document.getElementById(
        "atm_outer_div_table_for_userdetail"
      ).style.display = "block";
      document.getElementById("atm_account_number_check").value = "";
      if (customer_detail[customerIndex].atm_info.length != 0) {
        generateAtmCard(customerIndex);
      } else if (customer_detail[customerIndex].atm_info.length == 0) {
        document.getElementById(
          "div_for_atm_card_generate_amount"
        ).style.display = "block";
      } else if (
        check_atm_card_expiry(customerIndex) == 0 ||
        customer_detail[customerIndex].atm_info.length == 0
      ) {
        document.getElementById(
          "div_for_atm_card_generate_amount"
        ).style.display = "block";
      } else {
        document.getElementById(
          "div_for_atm_card_generate_amount"
        ).style.display = "none";
      }
    }
  }
});

let atm_close_modal = document.getElementById("atm_close_modal");
atm_close_modal.addEventListener("click", function () {
  document.getElementById("pop_up_for_atm_modal").style.display = "none";
  document.getElementById("atm_outer_div_table_for_userdetail").style.display =
    "none";
  document.getElementById("atm_account_number_check").value = "";
  document.getElementById("atm_pin_number").value = "";
  document.getElementById("div_for_atm").style.display = "none";
});

let btn_generate_atm = document.getElementById("btn_generate_atm");
btn_generate_atm.addEventListener("click", function () {
  let atm_pin_number = document.getElementById("atm_pin_number").value;
  if (atm_pin_number.length != 4 || atm_pin_number == "") {
    alert("please Enter 4 digit pin number ");
  } else if (customer_detail[customerIndex].account_status == 1) {
    alert("Account is blocked Please Unblock it!");
  } else {
    let atm_card_number = "";
    for (let i = 0; i < 4; i++) {
      atm_card_number += Math.floor(Math.random() * (9999 - 1000) + 1000);
    }

    var today = new Date();

    var mm = today.getMonth() + 1;

    var next_3_years_from_now = today.getFullYear() + 3;

    today = mm + "/" + next_3_years_from_now;

    if (customer_detail[customerIndex].atm_info.length == 0) {
      customer_detail[customerIndex].atm_info.push({
        name_of_card_holder: customer_detail[customerIndex].name,
        pin_number: atm_pin_number,
        atmnumber: atm_card_number,
        cvvnumber: atm_card_number.slice(13),
        dateofexp: today,
        mode: 1,
      });
      localStorage.setItem("detail", JSON.stringify(customer_detail));
      generateAtmCard(customerIndex);
    } else if (check_atm_card_expiry(customerIndex) == 0) {
      customer_detail[customerIndex].atm_info.push({
        name_of_card_holder: customer_detail[customerIndex].name,
        pin_number: atm_pin_number,
        atmnumber: atm_card_number,
        cvvnumber: atm_card_number.slice(13),
        dateofexp: today,
        mode: 1,
      });
      localStorage.setItem("detail", JSON.stringify(customer_detail));
      generateAtmCard(customerIndex);
    } else {
      alert("ATM  is already generated");
      document.getElementById("atm_pin_number").value = "";
    }
  }
});

let cash_report_detail = [];

let btn_cash_report = document.getElementById("btn_cash_report");
let cash_report_close_model = document.getElementById(
  "cash_report_close_model"
);
btn_cash_report.addEventListener("click", function () {
  let pop_up_for_cash_report_model = document.getElementById(
    "pop_up_for_cash_report_model"
  );

  pop_up_for_cash_report_model.style.display = "Block";
});

cash_report_close_model.addEventListener("click", function () {
  let pop_up_for_cash_report_model = document.getElementById(
    "pop_up_for_cash_report_model"
  );
  cash_report_detail = [];
  pop_up_for_cash_report_model.style.display = "none";
  document.getElementById("cash_report_account_number").value = "";
  document.getElementById("cash_report_table_tbody").innerHTML = "";
});

let btn_submit_cash_report_button = document.getElementById(
  "btn_submit_cash_report_button"
);
btn_submit_cash_report_button.addEventListener("click", function () {
  let cash_report_account_number = document.getElementById(
    "cash_report_account_number"
  ).value;

  if (cash_report_account_number == "") {
    alert("please enter valid acccount number ");
  } else if (
    cash_report_account_number.length < 9 ||
    cash_report_account_number.length > 9 ||
    cash_report_account_number.includes(".")
  ) {
    alert("please enter valid account number ");
  } else {
    customerIndex = checkUserExist(cash_report_account_number);
    if (customerIndex == 404) {
    } else {
      let cash_report_tbody_for_userdetail = document.getElementById(
        "cash_report_tbody_for_userdetail"
      );

      createUserDetailTable(customerIndex, cash_report_tbody_for_userdetail);
    }

    let array_for_cash_report_to_add = [];
    let cash_report_deposite_transaction =
      customer_detail[customerIndex].deposite_transaction;

    let cash_report_withdrawal_transaction =
      customer_detail[customerIndex].withdrawal_transaction;
    array_for_cash_report_to_add.push(cash_report_deposite_transaction);
    array_for_cash_report_to_add.push(cash_report_withdrawal_transaction);

    cash_report_detail = array_for_cash_report_to_add.flat();
    cash_report_detail.sort(
      (a, b) => new Date(b.current_date) - new Date(a.current_date)
    );

    console.log(cash_report_detail);
    let cash_report_table_tbody = document.getElementById(
      "cash_report_table_tbody"
    );
    cash_report_table_tbody.innerHTML = "";
    cash_report_detail.forEach((cr, index) => {
      let tr = document.createElement("tr");
      let th_serial_no = document.createElement("th");
      th_serial_no.textContent = index + 1;
      tr.append(th_serial_no);

      let th_transaction_id = document.createElement("td");
      th_transaction_id.textContent = cr.transacation_Id;
      tr.append(th_transaction_id);

      let th_transaction_type = document.createElement("th");

      th_transaction_type.textContent = cr.transaction_type;
      tr.append(th_transaction_type);

      let th_transaction_mode = document.createElement("td");
      th_transaction_mode.textContent = cr.transaction_mode;
      tr.append(th_transaction_mode);

      let th_amount = document.createElement("th");
      th_amount.textContent = cr.amount;
      tr.append(th_amount);

      let th_date = document.createElement("th");
      th_date.textContent = cr.date;
      tr.append(th_date);
      if (cr.transaction_type == "Credit") {
        tr.style.background = "green";
      } else {
        tr.style.background = "red";
      }

      cash_report_table_tbody.append(tr);
    });

    cash_report_detail = [];
    array_for_cash_report_to_add = [];
  }
});
