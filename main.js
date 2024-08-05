document.getElementById('generatePDF').addEventListener('click', generatePDF);
document.getElementById('sendEmail').addEventListener('click', sendEmail);

function addItem() {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
        <input type="text" class="item-name" placeholder="Item Name" required>
        <input type="number" class="item-quantity" placeholder="Quantity" required>
        <input type="number" class="item-price" placeholder="Price" required>
        <button type="button" class="remove-item" onclick="removeItem(this)">Remove</button>
    `;
    document.getElementById('items').appendChild(itemDiv);
}

function removeItem(button) {
    button.parentElement.remove();
    updateTotal();
}

function generatePDF() {
    const invoiceOutput = document.getElementById('invoiceOutput');
    const invoiceContent = document.getElementById('invoiceContent');
    const totalAmount = document.getElementById('totalAmount');
    const customerName = document.getElementById('customerName').value;
    const invoiceDate = document.getElementById('invoiceDate').value;

    let items = '';
    let total = 0;
    document.querySelectorAll('#items .item').forEach(item => {
        const name = item.querySelector('.item-name').value;
        const quantity = item.querySelector('.item-quantity').value;
        const price = item.querySelector('.item-price').value;
        const itemTotal = quantity * price;
        total += itemTotal;
        items += `<tr>
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${price}</td>
            <td>${itemTotal.toFixed(2)}</td>
        </tr>`;
    });

    invoiceContent.innerHTML = `
        <h2>Invoice</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Date:</strong> ${invoiceDate}</p>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${items}
            </tbody>
        </table>
    `;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
    invoiceOutput.classList.remove('hidden');
    
    document.getElementById('downloadPDF').addEventListener('click', () => {
        downloadPDF();
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.fromHTML(document.getElementById('invoiceContent').innerHTML, 10, 10, {
        'width': 180
    });
    doc.save('invoice.pdf');
}

function sendEmail() {
    alert('Email send Successfully!!!');
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll('#items .item').forEach(item => {
        const quantity = item.querySelector('.item-quantity').value;
        const price = item.querySelector('.item-price').value;
        total += (quantity * price);
    });
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
}
