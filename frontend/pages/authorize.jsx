import { useState } from "react";
import Link from "next/link";

const coins = [
  { label: "USDT", networks: ["ERC-20", "TRC-20"] },
  { label: "USDC", networks: ["ERC-20", "TRC-20"] },
  { label: "BTC", networks: ["BTC (Native)"] }
];

export default function Authorize() {
  // Simulate summary from previous card entry
  const summary = {
    protocol: "101.2",
    protocolLabel: "Online sale/Purchase 101.2 (6 digit Auth Code)",
    card: "**** **** **** 1234",
    amount: "1500.00",
    currency: "USD",
    authCode: "123456",
    ref: "TXN" + Math.floor(Math.random()*1_000_000_000)
  };

  const [payoutType, setPayoutType] = useState("crypto");
  const [coin, setCoin] = useState("USDT");
  const [network, setNetwork] = useState("ERC-20");
  const [wallet, setWallet] = useState("");
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [swift, setSwift] = useState("");
  const [routing, setRouting] = useState("");
  const [iban, setIban] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState(summary.ref);

  // Networks for selected coin
  const networks = coins.find(c => c.label === coin)?.networks || [];

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("Processing...");
    setStatus("");
    setTimeout(() => {
      setStatus("success");
      setMessage("Payment & Payout Successful!");
    }, 2000);
  };

  return (
    <div className="glass-bg">
      <form className="glass-form" onSubmit={handleSubmit}>
        <img src="/logo-nbkpay.svg" alt="NBK Pay Logo" className="logo" />
        <div className="form-title">Authorize & Payout</div>
        <div className="summary-box">
          <b>Protocol:</b> {summary.protocolLabel}<br/>
          <b>Card:</b> {summary.card}<br/>
          <b>Amount:</b> {summary.amount} {summary.currency}<br/>
          <b>Auth Code:</b> {summary.authCode}<br/>
          <b>Reference:</b> {summary.ref}
        </div>
        <div className="button-group">
          <button
            type="button"
            className={`btn-toggle ${payoutType === "crypto" ? "active" : ""}`}
            onClick={() => setPayoutType("crypto")}
          >
            Crypto Payout
          </button>
          <button
            type="button"
            className={`btn-toggle ${payoutType === "bank" ? "active" : ""}`}
            onClick={() => setPayoutType("bank")}
          >
            Bank Payout
          </button>
        </div>
        {payoutType === "crypto" ? (
          <>
            <label>
              Select Coin
              <select
                className="input"
                value={coin}
                onChange={e => {
                  setCoin(e.target.value);
                  setNetwork(coins.find(c => c.label === e.target.value)?.networks[0] || "");
                }}
              >
                {coins.map(c => (
                  <option value={c.label} key={c.label}>{c.label}</option>
                ))}
              </select>
            </label>
            <label>
              Network
              <select
                className="input"
                value={network}
                onChange={e => setNetwork(e.target.value)}
              >
                {networks.map(n => (
                  <option value={n} key={n}>{n}</option>
                ))}
              </select>
            </label>
            <label>
              Wallet Address
              <input
                className="input"
                type="text"
                required
                value={wallet}
                placeholder="Paste wallet address"
                onChange={e => setWallet(e.target.value)}
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Bank Name
              <input
                className="input"
                type="text"
                required
                value={bank}
                onChange={e => setBank(e.target.value)}
                placeholder="e.g. HSBC"
              />
            </label>
            <label>
              Account Name
              <input
                className="input"
                type="text"
                required
                value={accountName}
                onChange={e => setAccountName(e.target.value)}
                placeholder="e.g. John Smith"
              />
            </label>
            <label>
              Account Number
              <input
                className="input"
                type="text"
                required
                value={accountNo}
                onChange={e => setAccountNo(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 123456789"
              />
            </label>
            <label>
              SWIFT Code
              <input
                className="input"
                type="text"
                required
                value={swift}
                onChange={e => setSwift(e.target.value.toUpperCase())}
                placeholder="e.g. HSBCHKHHHKH"
              />
            </label>
            <label>
              Routing Number (USA) / IBAN (EU/UK)
              <input
                className="input"
                type="text"
                value={routing}
                onChange={e => setRouting(e.target.value.toUpperCase())}
                placeholder="Routing (US) or leave blank"
              />
              <input
                className="input"
                type="text"
                value={iban}
                onChange={e => setIban(e.target.value.toUpperCase())}
                placeholder="IBAN (EU/UK) or leave blank"
              />
            </label>
          </>
        )}
        <button className="btn primary" type="submit">
          Authorize & Payout
        </button>
        <div className="msg">{message}</div>
        {status === "success" && (
          <div className="refbox">
            <div><b>Reference:</b> {reference}</div>
            <div>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${reference}`} alt="Reference QR" />
            </div>
            <div className="success-msg">Transaction Completed!</div>
            <Link href="/receipt" className="btn secondary">Print/Email Receipt</Link>
            <Link href="/dashboard" className="btn secondary">New Transaction</Link>
          </div>
        )}
        <div className="login-links">
          <Link href="/dashboard" className="link">Back to Dashboard</Link>
        </div>
      <style jsx>{`
        .glass-bg {
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(120deg,#e5e9f7 0%,#fff 100%);
        }
        .glass-form {
          width:99vw;max-width:430px;background:rgba(255,255,255,0.22);
          box-shadow:0 8px 32px 0 rgba(31,38,135,0.29);border-radius:22px;
          padding:36px 30px 30px 30px;display:flex;flex-direction:column;
          align-items:center;backdrop-filter:blur(11px);
          border:1.5px solid rgba(255,255,255,0.22);gap:14px;
        }
        .logo {width:70px;margin-bottom:6px;}
        .form-title {font-size:1.17rem;font-weight:700;color:#d7263d;margin-bottom:4px;letter-spacing:1px;}
        .summary-box {
          width:100%;background:rgba(255,255,255,0.29);
          border-radius:10px;padding:9px 14px;margin-bottom:12px;
          font-size:1.02em;color:#333;box-shadow:0 1px 7px rgba(31,38,135,0.07);
        }
        label {width:100%;color:#2853a8;font-size:1em;margin-bottom:2px;font-weight:500;}
        .input {width:100%;padding:11px 9px;border:1.5px solid #d7263d33;
          border-radius:8px;margin-bottom:7px;background:rgba(255,255,255,0.65);
          font-size:1em;color:#222;outline:none;margin-top:2px;}
        .input:focus {border:1.5px solid #d7263d;}
        .button-group {display:flex;width:100%;gap:10px;margin-bottom:12px;}
        .btn-toggle {
          flex:1;
          background:rgba(255,255,255,0.48);
          color:#d7263d;
          border:1.5px solid #d7263d;
          border-radius:8px;
          padding:10px 0;
          font-weight:600;
          font-size:1.08em;
          cursor:pointer;
          transition:background .18s;
        }
        .btn-toggle.active {
          background:linear-gradient(90deg,#d7263d 70%,#ffb4b4 100%);
          color:#fff;
          border:none;
        }
        .btn.primary {
          width:100%;
          background:linear-gradient(90deg,#d7263d 70%,#ffb4b4 100%);
          color:#fff;
          border:none;
          border-radius:8px;
          padding:13px 0 12px 0;
          font-size:1.09em;
          font-weight:600;
          cursor:pointer;
          margin-top:3px;
        }
        .msg{min-height:18px;color:#2853a8;font-size:0.98em;margin-top:6px;}
        .refbox {
          width:100%;margin:10px 0 0 0;padding:10px;background:rgba(255,255,255,0.44);
          border-radius:12px;text-align:center;
          box-shadow:0 1px 7px rgba(31,38,135,0.07);
        }
        .refbox img{margin-top:7px;}
        .success-msg{color:#1a9f45;font-weight:700;margin:11px 0;}
        .btn.secondary {
          background:#fff;
          color:#d7263d;
          margin:6px 3px 2px 3px;
          border:1.5px solid #d7263d;
          border-radius:8px;
          padding:10px 0 10px 0;
          font-size:1.05em;
          font-weight:600;
          cursor:pointer;
          display:inline-block;
          text-align:center;
          text-decoration:none;
        }
        .login-links{
          display:flex;flex-direction:column;gap:3px;width:100%;margin-bottom:10px;
        }
        .link{
          color:#d7263d;font-size:0.97em;text-align:left;
          text-decoration:underline;background:none;border:none;
          padding:0;margin:0;cursor:pointer;transition:color .2s;
        }
        @media (max-width:600px){
          .glass-form{padding:18px 7px 18px 7px;}
        }
      `}</style>
      </form>
    </div>
  );
}
