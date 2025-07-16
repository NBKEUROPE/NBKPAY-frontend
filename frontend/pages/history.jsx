import { useState } from "react";
import Link from "next/link";

// Dummy transactions for UI demo
const dummyTxns = [
  {
    id: "TXN1000001",
    date: "2025-07-14",
    terminal: "NBK-PAY-0001",
    user: "admin",
    amount: "1000.00",
    currency: "USD",
    payout: "USDT (ERC-20)",
    status: "Success",
    card: "**** **** **** 1234",
    protocol: "101.2",
    ref: "REF123456",
    receiptLink: "/receipt?ref=REF123456"
  },
  {
    id: "TXN1000022",
    date: "2025-07-15",
    terminal: "NBK-PAY-0003",
    user: "operator",
    amount: "700.50",
    currency: "EUR",
    payout: "Bank",
    status: "Reject",
    card: "**** **** **** 5678",
    protocol: "201.3",
    ref: "REF789101",
    receiptLink: "/receipt?ref=REF789101"
  }
];

export default function History() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTerminal, setFilterTerminal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [txns, setTxns] = useState(dummyTxns);

  // Filter logic
  const filtered = txns.filter(txn =>
    (!search || txn.id.includes(search) || txn.ref.includes(search) || txn.card.includes(search)) &&
    (!filterStatus || txn.status === filterStatus) &&
    (!filterTerminal || txn.terminal === filterTerminal) &&
    (!startDate || txn.date >= startDate) &&
    (!endDate || txn.date <= endDate)
  );

  // For demonstration, 10 terminals
  const terminals = Array.from({length: 10}, (_, i) => `NBK-PAY-${(i+1).toString().padStart(4, "0")}`);

  const handlePrint = () => window.print();

  return (
    <div className="glass-bg">
      <div className="glass-form history-form">
        <img src="/logo-nbkpay.svg" alt="NBK Pay Logo" className="logo" />
        <div className="form-title">Transaction History</div>
        <div className="filters">
          <input
            className="input"
            placeholder="Search by TXN, card, reference"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="input" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Success">Success</option>
            <option value="Reject">Reject</option>
          </select>
          <select className="input" value={filterTerminal} onChange={e => setFilterTerminal(e.target.value)}>
            <option value="">All Terminals</option>
            {terminals.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input
            className="input"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            title="Start Date"
          />
          <input
            className="input"
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            title="End Date"
          />
        </div>
        <div className="history-table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Terminal</th>
                <th>User</th>
                <th>Amount</th>
                <th>Payout</th>
                <th>Status</th>
                <th>Card</th>
                <th>Protocol</th>
                <th>Ref</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={10} style={{textAlign:'center',color:'#a0a0a0'}}>No transactions found.</td></tr>
              )}
              {filtered.map(txn => (
                <tr key={txn.id} className={txn.status === "Reject" ? "reject" : ""}>
                  <td>{txn.date}</td>
                  <td>{txn.terminal}</td>
                  <td>{txn.user}</td>
                  <td>{txn.amount} {txn.currency}</td>
                  <td>{txn.payout}</td>
                  <td className={txn.status === "Success" ? "succ" : "rej"}>{txn.status}</td>
                  <td>{txn.card}</td>
                  <td>{txn.protocol}</td>
                  <td>{txn.ref}</td>
                  <td>
                    <Link href={txn.receiptLink} target="_blank" className="receipt-link">Receipt</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="history-actions">
          <button className="btn secondary" onClick={handlePrint} type="button">Print Statement</button>
          <Link href="/dashboard" className="btn secondary">Back to Dashboard</Link>
        </div>
      </div>
      <style jsx>{`
        .glass-bg {
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(120deg,#e5e9f7 0%,#fff 100%);
        }
        .glass-form.history-form {
          width:99vw;max-width:1240px;background:rgba(255,255,255,0.22);
          box-shadow:0 8px 32px 0 rgba(31,38,135,0.29);border-radius:22px;
          padding:24px 18px 24px 18px;display:flex;flex-direction:column;align-items:center;
          backdrop-filter:blur(11px);
          border:1.5px solid rgba(255,255,255,0.22);gap:16px;
        }
        .logo {width:62px;margin-bottom:3px;}
        .form-title {font-size:1.17rem;font-weight:700;color:#d7263d;margin-bottom:4px;letter-spacing:1px;}
        .filters {
          width:100%;display:flex;gap:7px;flex-wrap:wrap;justify-content:center;
          margin-bottom:7px;
        }
        .input {padding:8px 8px;border:1.5px solid #d7263d33;
          border-radius:8px;background:rgba(255,255,255,0.65);
          font-size:1em;color:#222;outline:none;min-width:130px;max-width:180px;}
        .history-table-wrap {width:100%;overflow-x:auto;}
        .history-table {
          width:100%;border-collapse:collapse;margin:0 auto;
          background:rgba(255,255,255,0.90);
          border-radius:14px;overflow:hidden;
        }
        .history-table th,.history-table td {
          padding:8px 6px;font-size:0.97em;text-align:center;
          border-bottom:1px solid #eee;
        }
        .history-table th {
          background:#f7dae1;color:#d7263d;font-weight:700;
        }
        .history-table tr:last-child td {border-bottom:none;}
        .succ {color:#1a9f45;font-weight:700;}
        .rej {color:#d7263d;font-weight:700;}
        .history-table tr.reject {background:rgba(255,112,112,0.07);}
        .receipt-link {color:#2853a8;text-decoration:underline;}
        .history-actions {display:flex;gap:13px;justify-content:center;width:100%;}
        .btn.secondary {
          background:#fff;
          color:#d7263d;
          border:1.5px solid #d7263d;
          border-radius:8px;
          padding:9px 18px;
          font-size:1.05em;
          font-weight:600;
          cursor:pointer;
          display:inline-block;
          text-align:center;
          text-decoration:none;
        }
        @media (max-width:900px){
          .glass-form.history-form{padding:8px 2px 8px 2px;}
          .history-table th,.history-table td{padding:5px 2px;}
        }
      `}</style>
    </div>
  );
}
