<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice - Blissful Moments</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #0b4a6f;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header img {
            width: 80px;
        }
        .header h2 {
            color: #0b4a6f;
        }
        .invoice-details, .customer-details {
            margin-bottom: 20px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        .table th, .table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .table th {
            background: #0b4a6f;
            color: white;
        }
        .total {
            font-weight: bold;
            font-size: 18px;
            text-align: right;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="{logo_path}" alt="Blissful Moments Logo">
            <h2>Invoice</h2>
        </div>

        <div class="invoice-details">
            <p><strong>Invoice No:</strong> {invoice_number}</p>
            <p><strong>Invoice Date:</strong> {invoice_date}</p>
        </div>

        <div class="customer-details">
            <p><strong>Billed To:</strong></p>
            <p>{customer_name}</p>
            <p>{customer_email}</p>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{plan_name}</td>
                    <td>1</td>
                    <td>${plan_amount}</td>
                    <td>${plan_amount}</td>
                </tr>
            </tbody>
        </table>

        <p class="total">Total: ${plan_amount}</p>

        <div class="footer">
            <p>Thank you for your business!</p>
            <p>For any queries, contact us at <a href="mailto:support@blissfulmoments.com">support@blissfulmoments.com</a></p>
        </div>
    </div>
</body>

</html>
