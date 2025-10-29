let users = [
  { name: "Vikash", age: 21, phone: "9876543210" },
  { name: "Rahul", age: 25, phone: "9999999999" }
];

let btn = document.getElementById("loadTable");
let tableBody = document.getElementById("user_table_body");

function renderTable() {
  tableBody.innerHTML = "";

  users.forEach((user, index) => {
    let row = document.createElement("tr");

    // Name
    let tdName = document.createElement("td");
    tdName.textContent = user.name;
    row.appendChild(tdName);

    // Age
    let tdAge = document.createElement("td");
    tdAge.textContent = user.age;
    row.appendChild(tdAge);

    // Phone
    let tdPhone = document.createElement("td");
    tdPhone.textContent = user.phone;
    row.appendChild(tdPhone);

    // Action buttons (in 1 <td>)
    let tdAction = document.createElement("td");

    // View button
    let btnView = document.createElement("button");
    btnView.textContent = "View";
    btnView.style.marginRight = "5px";
    btnView.addEventListener("click", () => {
      alert(`Name: ${user.name}, Age: ${user.age}, Phone: ${user.phone}`);
    });

    // Edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.style.marginRight = "5px";
    btnEdit.addEventListener("click", () => {
      alert("Edit logic yahan ayega");
    });

    // Delete button
    let btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.style.background = "red";
    btnDelete.style.color = "white";
    btnDelete.addEventListener("click", () => {
      users.splice(index, 1);
      renderTable();
    });

    // Add all 3 buttons in one td
    tdAction.appendChild(btnView);
    tdAction.appendChild(btnEdit);
    tdAction.appendChild(btnDelete);

    row.appendChild(tdAction);
    tableBody.appendChild(row);
  });
}

btn.addEventListener("click", renderTable);
