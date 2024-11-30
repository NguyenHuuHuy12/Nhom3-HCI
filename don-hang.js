      // Hàm hiển thị danh sách đơn hàng từ localStorage
        window.onload = function() {
            const customerList = JSON.parse(localStorage.getItem("customerList"));
            const tableBody = document.getElementById("orderTableBody");

            if (customerList && customerList.length > 0) {
                customerList.forEach(customer => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).innerText = customer.customerName;
                    row.insertCell(1).innerText = customer.bookName;
                    row.insertCell(2).innerText = `${customer.price.toLocaleString()} VNĐ`;
                    row.insertCell(3).innerText = customer.purchaseDate;
                });
            } else {
                tableBody.innerHTML = "<tr><td colspan='4'>Không có đơn hàng nào.</td></tr>";
            }
        }

        // Hàm in danh sách đơn hàng
        function printList() {
            const printWindow = window.open('', '', 'height=500, width=800');
            const content = document.querySelector('.order-list').innerHTML;
            printWindow.document.write('<html><head><title>Danh Sách Đơn Hàng</title></head><body>');
            printWindow.document.write(content);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }

        // Hàm lưu danh sách dưới dạng tệp JSON
        function saveList() {
            const customerList = JSON.parse(localStorage.getItem("customerList"));
            if (!customerList || customerList.length === 0) {
                alert("Không có dữ liệu để lưu.");
                return;
            }

            // Chuyển mảng khách hàng thành chuỗi JSON
            const data = JSON.stringify(customerList);
            const blob = new Blob([data], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'donhang.json'; // Tên tệp khi tải xuống
            link.click();
        }
