const generateOrderBillHTML = (order) => {
  console.log("order", order);
  const orderItemsHTML = order.orderItems
    .map(
      (item) => `
      <tr>
        <td>${item.cartItem.productId.name}</td>
        <td>$${item.cartItem.productId.prom_price.toFixed(2)}</td>
        <td>${item.cartItem.quantity}</td>
        <td>$${(item.cartItem.productId.prom_price * item.cartItem.quantity).toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  const subTotal = order.totalPrice;
  const tax = (subTotal * 0.05).toFixed(2); // Assuming 5% tax
  const grandTotal = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);

  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .invoice-box {
              max-width: 800px;
              margin: auto;
              height: fit-content;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              border-radius: 10px;
            }
            .header {
              background-color: #3bb67f;
              padding: 20px;
              text-align: center;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
            }
            .header img {
              max-width: 150px;
            }
            .details {
              margin: 20px 0;
            }
            .details p {
              margin: 5px 0;
            }
            .items {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            .items th,
            .items td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .items th {
              background-color: #f2f2f2;
            }
            .totals {
              float: right;
              margin-top: 20px;
            }
            .totals p {
              margin: 5px 0;
            }
            p {
              color: #7c7979;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="header">
              <img src="https://s3-ecommerce-image.s3.ap-southeast-1.amazonaws.com/logo.png" alt="NestMart Logo" />
              <div class="">
                <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Invoice No: #${order._id}</p>
              </div>
            </div>
            <div class="" style="display: flex; justify-content: space-between">
              <div class="">
                <h3>Invoice To</h3>
                <div class="">
                  <p>${
                    order.customer.lastName + " " + order.customer.firstName
                  }</p>
                  <p>${order.shippingAddress.address}</p>
                  <p>${order.shippingAddress.city}, ${
    order.shippingAddress.country
  }</p>
                </div>
              </div>
              <div class="">
                <h3>Ship To</h3>
                <div class="">
                  <p>NestMart Inc</p>
                  <p>billing@NetMart.com</p>
                  <p>205 HCM</p>
                </div>
              </div>
            </div>
            <div class="" style="display: flex; justify-content: space-between">
              <div class="">
                <h3>Due Date</h3>
                <p>${new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div class="">
                <h3>Payment Method</h3>
                <p>${order.paymentMethod}</p>
              </div>
            </div>
            <div class="details">
              <p>Invoice To: <b>${
                order.customer.lastName + " " + order.customer.firstName
              }</b></p>
              <p>Date: <b>${new Date(
                order.createdAt
              ).toLocaleDateString()}</b></p>
              <p>Invoice No: <b>#${order._id}</b></p>
            </div>
            <div class="">
              <table class="items">
                <tr>
                  <th>Item Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                <!-- Dynamic rows for each item -->
                ${orderItemsHTML}
                <tr>
                  <td colspan="4" style="text-align: end;">
                    <p>SubTotal: $${subTotal.toFixed(2)}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" style="text-align: end;">
                    <p>Tax: $${tax}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" style="text-align: end;">
                    <p><b>Grand Total: $${grandTotal}</b></p>
                  </td>
                </tr>
              </table>
            </div>
            
            <p class="footer">
              <div class="" style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="">
                      <h4>Important Note</h4>
                      <p>All amounts show in USD</p>
                      <p>Finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
                      <p>Once order done, money will not be refunded.</p>
                      <p>Delivery might delay due to some external dependency.</p>
                  </div>
                  <div class="">
                  <p>Thank you for your business!</p>
                  <p>NestMart</p>
                  </div>
              </div>
            </p>
          </div>
        </body>
      </html>
    `;
};

module.exports = { generateOrderBillHTML };
