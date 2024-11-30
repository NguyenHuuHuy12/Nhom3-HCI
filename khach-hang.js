// Hàm thêm thông tin khách hàng vào bảng
function addCustomer() {
    const customerName = document.getElementById("customerName").value;
    const bookName = document.getElementById("bookName").value;
    const price = document.getElementById("price").value;
    const purchaseDate = document.getElementById("purchaseDate").value;

    if (customerName && bookName && price && purchaseDate) {
        const table = document.getElementById("customerTableBody");
        const newRow = table.insertRow();

        const nameCell = newRow.insertCell(0);
        const bookCell = newRow.insertCell(1);
        const priceCell = newRow.insertCell(2);
        const dateCell = newRow.insertCell(3);
        const actionCell = newRow.insertCell(4);

        nameCell.innerText = customerName;
        bookCell.innerText = bookName;
        priceCell.innerText = `${parseInt(price).toLocaleString()} VNĐ`;
        dateCell.innerText = purchaseDate;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Xóa";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function () {
            table.deleteRow(newRow.rowIndex);

            if (table.rows.length === 0) {
                document.querySelector(".customer-list table").innerHTML = "<tr><td colspan='5'>Không có khách hàng nào.</td></tr>";
            }
        };
        actionCell.appendChild(deleteButton);

        document.getElementById("addCustomerForm").reset();
    } else {
        alert("Vui lòng nhập đầy đủ thông tin.");
    }
}

// Hàm xuất danh sách khách hàng sang DonHang.html
function exportToOrder() {
    const customerList = [];
    const rows = document.getElementById("customerTableBody").rows;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const customerName = row.cells[0].innerText;
        const bookName = row.cells[1].innerText;
        const price = row.cells[2].innerText.replace(' VNĐ', '').replace(',', '');
        const purchaseDate = row.cells[3].innerText;

        customerList.push({
            customerName,
            bookName,
            price: parseInt(price),
            purchaseDate
        });
    }

    // Lưu vào localStorage
    localStorage.setItem("customerList", JSON.stringify(customerList));

    // Chuyển hướng sang DonHang.html
    window.location.href = "don-hang.html";
}
