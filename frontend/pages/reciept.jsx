import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Demo: simulate two types (merchant/customer), supports print/email, QR, logo, modern style
export default function Receipt() {
  const router = useRouter();
  const { ref = "REF123456", type = "merchant" } = router.query;
  const [receiptType, setReceiptType] = useState(type);

  // Simulate fetching transaction details (replace with real API)
  const txn = {
    id: "TXN1000001",
    date: "2025-07-14 12:37:45",
    terminal: "NBK-PAY-0001",
    user: "admin",
    amount: "1000.00",
    currency: "USD",
    payout: "USDT (ERC-20)",
    status: "Success",
    card: "**** **** **** 1234",
    protocol: "101.2",
    ref,
    merchantEmail: "merchant@nbkpay.com",
    customerEmail: "customer@example.com"
  };

  // Print handler
  const handlePrint = () => window.print();

  // Email handler (simulated)
  const handleEmail = (email) => {
    alert(`Receipt sent to ${email} (simulation).`);
  };

  return (
    <div className="receipt-bg">
      <div className="receipt-container" id="print-area">
        <div className="receipt-header">
          <div className="logo-box">
            <img src="/logo-nbkpay.svg" alt="NBK Pay Logo" className="logo" />
            <div className="logo-title">NBK Pay</div>
          </div>
          <div className="receipt-type">
            {receiptType === "customer" ? "Customer Copy" : "Merchant Copy"}
          </div>
        </div>
        <div className="company-info">
          <div className="red-square">
            <span className="spark">&#10022;</span>
          </div>
          <div className="receipt-head">
            CARD PAYMENT RECEIPT
          </div>
        </div>
        <div className="txn-info">
          <b>Date:</b> {txn.date}<br />
          <b>Terminal:</b> {txn.terminal}<br />
          <b>User:</b> {txn.user}<br />
          <b>Card:</b> {txn.card}<br />
          <b>Protocol:</b> {txn.protocol}<br />
          <b>Reference:</b> {txn.ref}<br />
        </div>
        <div className="amount-box">
          <span className="label">Amount</span>
          <span className="value">{txn.amount} {txn.currency}</span>
        </div>
        <div className="payout-info">
          <b>Payout:</b> {txn.payout}
        </div>
        <div className={`status-box ${txn.status === "Success" ? "ok" : "fail"}`}>
          {txn.status === "Success" ? "Payment Successful" : "Payment Failed"}
        </div>
        <div className="qr-row">
          <div className="qr-box">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${txn.ref}`} alt="QR" />
            <div className="qr-label">Scan for Details</div>
          </div>
        </div>
        <div className="receipt-footer">
          <div>Thank you for using NBK Pay</div>
          <div>
            <span className="receipt-link" onClick={() => setReceiptType(receiptType === "merchant" ? "customer" : "merchant")}>
              Switch to {receiptType === "merchant" ? "Customer" : "Merchant"} Copy
            </span>
          </div>
        </div>
      </div>
      <div className="receipt-actions noprint">
        <button className="btn primary" onClick={handlePrint}>Print</button>
        <button className="btn secondary" onClick={() => handleEmail(receiptType === "merchant" ? txn.merchantEmail : txn.customerEmail)}>
          Email {receiptType === "merchant" ? "Merchant" : "Customer"}
        </button>
        <Link href="/dashboard" className="btn secondary">Back to Dashboard</Link>
      </div>
      <style jsx>{`
        .receipt-bg {
          min-height:100vh;
          background:linear-gradient(120deg,#e5e9f7 0%,#fff 100%);
          display:flex;flex-direction:column;align-items:center;justify-content:center;
        }
        .receipt-container {
          background:#fff;
          border-radius:20px;
          max-width:330px;
          width:100%;
          margin:40px auto 14px auto;
          box-shadow:0 8px 28px rgba(31,38,135,0.18);
          padding:19px 20px 16px 20px;
          font-family:'Inter','Segoe UI',Arial,sans-serif;
        }
        .receipt-header {
          display:flex;align-items:center;justify-content:space-between;
          margin-bottom:4px;
        }
        .logo-box {
          display:flex;align-items:center;gap:7px;
        }
        .logo {width:38px;}
        .logo-title {font-size:1.14em;font-weight:700;color:#d7263d;}
        .receipt-type {
          color:#fff;background:#d7263d;border-radius:8px;padding:7px 15px;font-weight:700;
          font-size:1em;letter-spacing:1px;box-shadow:0 1px 6px rgba(215,38,61,0.08);
        }
        .company-info {
          display:flex;align-items:center;gap:8px;margin:13px 0 10px 0;
          flex-direction:row;
        }
        .red-square {
          width:40px;height:40px;border-radius:8px;background:#d7263d;display:flex;align-items:center;justify-content:center;
        }
        .spark {font-size:1.8em;color:#fff;font-family:sans-serif;}
        .receipt-head {font-size:1.13em;font-weight:700;letter-spacing:1.5px;color:#2853a8;}
        .txn-info {
          font-size:0.99em;color:#4a4a4a;margin:10px 0 9px 0;background:rgba(215,38,61,0.06);padding:8px 10px;border-radius:8px;
        }
        .amount-box {
          display:flex;align-items:center;justify-content:space-between;
          background:rgba(215,38,61,0.09);border-radius:8px;
          font-size:1.12em;font-weight:700;padding:8px 14px;margin:9px 0;
        }
        .amount-box .label {color:#2853a8;}
        .amount-box .value {color:#d7263d;}
        .payout-info {font-size:1em;margin-bottom:9px;color:#2853a8;font-weight:500;}
        .status-box {
          font-size:1.08em;padding:8px 0;margin:8px 0 0 0;text-align:center;
          border-radius:8px;
        }
        .status-box.ok {color:#fff;background:#1a9f45;}
        .status-box.fail {color:#fff;background:#d7263d;}
        .qr-row {display:flex;justify-content:center;margin:13px 0;}
        .qr-box {display:flex;flex-direction:column;align-items:center;}
        .qr-label {font-size:0.89em;color:#2853a8;margin-top:2px;}
        .receipt-footer {
          margin-top:10px;text-align:center;font-size:0.97em;color:#555;
        }
        .receipt-link {
          color:#d7263d;text-decoration:underline;cursor:pointer;margin-top:4px;display:inline-block;
        }
        .receipt-actions {
          margin:0 0 30px 0;display:flex;gap:15px;justify-content:center;
        }
        .btn {
          border-radius:8px;padding:10px 16px;font-size:1.05em;font-weight:600;cursor:pointer;
          border:none;text-decoration:none;text-align:center;
        }
        .btn.primary {
          background:linear-gradient(90deg,#d7263d 70%,#ffb4b4 100%);
          color:#fff;
        }
        .btn.secondary {
          background:#fff;color:#d7263d;border:1.5px solid #d7263d;
        }
        @media print {
          .receipt-actions.noprint, .receipt-link { display:none !important; }
          .receipt-container { box-shadow:none !important; border:1.5px solid #d7263d;}
        }
      `}</style>
    </div>
  );
}
