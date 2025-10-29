  let loginkey = sessionStorage.getItem("logging");
if (loginkey != 1) {
  alert("login first ");
  window.location.href = "login.html";
}

let atm_number_output = document.getElementById("atm_number_output");
let atm_name_output = document.getElementById("atm_name_output");
let atm_available_balance_output = document.getElementById(
  "atm_available_balance_output"
);
let note2000 = document.getElementById("2000_note");
let note500 = document.getElementById("500_note");
let note200 = document.getElementById("200_note");
let note100 = document.getElementById("100_note");
let output_2000_note = document.getElementById("output_2000_note");
let output_500_note = document.getElementById("output_500_note");
let output_200_note = document.getElementById("output_200_note");
let output_100_note = document.getElementById("output_100_note");
const url = new URL(window.location.href);
let index = url.searchParams.get("index");
console.log(index);

let atm_info = JSON.parse(localStorage.getItem("atm_machine")) || [];
atm_name_output.value = atm_info[index].atm_name;
atm_number_output.value = atm_info[index].atm_number;

atm_available_balance_output.value =
    atm_info[index].total_money_in_machine == ""
    ? 0
    : atm_info[index].total_money_in_machine;





  

counter_note2000 = 0;
counter_note500 = 0;
counter_note200 = 0;
counter_note100 = 0;




let no_2000 = 0;
let no_500 = 0;
let no_200 = 0;
let no_100 = 0;

function calculate_total_amount_added_in_atm(temporary, type) {
  if (type == "note_2000") {
    no_2000 = temporary * 2000;
  }
  if (type == "note_500") {
    no_500 = temporary * 500;
  }
  if (type == "note_200") {
    no_200 = temporary * 200;
  }
  if (type == "note_100") {
    no_100 = temporary * 100;
  }

  let total_amount_added_in_atm_machine = no_2000 + no_500 + no_200 + no_100;
  document.getElementById("total_money_added_in_atm_machine_output").value =
    total_amount_added_in_atm_machine;
}

note2000.addEventListener("click", function () {
  let temporary = ++counter_note2000;
  output_2000_note.value = temporary;
  calculate_total_amount_added_in_atm(temporary, "note_2000");
});
note500.addEventListener("click", function () {
  let temporary = ++counter_note500;
  output_500_note.value = temporary;
  calculate_total_amount_added_in_atm(temporary, "note_500");
});
note200.addEventListener("click", function () {
  let temporary = ++counter_note200;
  output_200_note.value = temporary;
  calculate_total_amount_added_in_atm(temporary, "note_200");
});

note100.addEventListener("click", function () {
  let temporary = ++counter_note100;
  output_100_note.value = temporary;
  calculate_total_amount_added_in_atm(temporary, "note_100");
});

let btn_add_money_in_atm = document.getElementById("btn_add_money_in_atm");

btn_add_money_in_atm.addEventListener("click", function () {
  let total_money_available;
  if (atm_info[index].total_money_in_machine == "") {
    total_money_available = 0;
  } else {
    total_money_available = 
      atm_info[index].total_money_in_machine;
  }

  if (atm_info[index].available_note[0].note_2000 == "") {
   
    atm_info[index].available_note[0].note_2000 =
      parseInt(no_2000) / parseInt(2000);
    total_money_available += Number(no_2000);
  } else {
    let temperory = atm_info[index].available_note[0].note_2000;
     
    atm_info[index].available_note[0].note_2000 =
      parseInt(temperory) + (parseInt(no_2000) / parseInt(2000));
    total_money_available += Number(no_2000);
  }

  if (atm_info[index].available_note[0].note_500 == "") {
    atm_info[index].available_note[0].note_500 = no_500 / 500;
    total_money_available += Number(no_500);
  } else {
    let temperory = atm_info[index].available_note[0].note_500;
    atm_info[index].available_note[0].note_500 =
      parseInt(temperory) + (parseInt(no_500) / parseInt(500));
    total_money_available += Number(no_500);
  }

  if (atm_info[index].available_note[0].note_200 == "") {
    atm_info[index].available_note[0].note_200 =
      parseInt(no_200) / parseInt(200);
    total_money_available += Number(no_200);
  } else {
    let temperory = atm_info[index].available_note[0].note_200;
    atm_info[index].available_note[0].note_200 =
      parseInt(temperory) + (parseInt(no_200) / parseInt(200));
    total_money_available += Number(no_200);
  }

  if (atm_info[index].available_note[0].note_100 == "") {
    atm_info[index].available_note[0].note_100 =
      parseInt(no_100) / parseInt(100);
    total_money_available += Number(no_100);
  } else {
    let temperory = atm_info[index].available_note[0].note_100;
    atm_info[index].available_note[0].note_100 =
      parseInt(temperory) + (parseInt(no_100) / parseInt(100));

    total_money_available += Number(no_100);
  }
  console.log(total_money_available);

  atm_info[index].total_money_in_machine = Number(total_money_available);
  localStorage.setItem("atm_machine", JSON.stringify(atm_info));
  alert("Money  added to  ATM Machine");
  document.getElementById("total_money_added_in_atm_machine_output").value = ""
  location.reload();

});
