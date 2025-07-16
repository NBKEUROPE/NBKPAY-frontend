import { useState } from "react";
import Link from "next/link";

const protocolGroups = [
  {
    label: "ONLINE PROTOCOLS",
    options: [
      { label: "Online sale 101.1 (4 digit Auth Code)", value: "101.1" },
      { label: "Online sale/Purchase 101.2 (6 digit Auth Code)", value: "101.2" },
      { label: "Online sale 101.3 (6 digit Auth Code)", value: "101.3" },
      { label: "Online sale/Purchase 101.4 (4 & 6 digit Auth Code)", value: "101.4" },
      { label: "Online sale 101.5 (digit Auth Code)", value: "101.5" },
      { label: "Online sale 101.6 Pre-Auth [1:1]", value: "101.6" },
      { label: "Online forced sale 101.7 (4 digit Auth Code)", value: "101.7" },
      { label: "Online sale Pinless 101.8", value: "101.8" },
      { label: "Online sale one step completion 201.1 (6 digit Auth Code)", value: "201.1" },
    ]
  },
  {
    label: "OFFLINE PROTOCOLS",
    options: [
      { label: "Offline forced sale 201.2 (6 digit Auth Code)", value: "201.2" },
      { label: "Offline sale 201.3 (6 digit Auth Code)", value: "201.3" },
      { label: "Online sale Ticket Only / Phone Order 201.4 (6 digit Auth Code)", value: "201.4" },
      { label: "Online sale Pre-Auth and completion (1:More) 201.1 (6 digit Auth Code)", value: "201.1b" },
    ]
  },
  {
    label: "SERVER PROTOCOL SERIES",
    options: [
      { label: "Protocol 100", value: "100" },
      { label: "Protocol 101", value: "101" },
      { label: "Protocol 201", value: "201" }
    ]
  },
];

export default function CardPayment() {
  const [protocol, setProtocol] = useState(protocolGroups[0].options[0].value);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  function formatCardNumber(val) {
    return val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExpiry(val) {
    return val.replace(/[^0-9]/g, "").replace(/(.{2})/, "$1/").slice(0, 5);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("Processing...");
    // Replace with actual backend call
    setTimeout(() => {
      setMessage("Proceed to authorization...");
      window.location.href = "/authorize";
    }, 1200);
  };

  return (
    <div className="glass-bg">
      <form className="glass-form" onSubmit={handleSubmit}>
        <img src="/logo-nbkpay.svg" alt="NBK Pay Logo" className="logo" />
        <div className="form-title">Card Payment Entry</div>
        <label>
          Protocol
          <select
            className="input"
            value={protocol}
            onChange={e => setProtocol(e.target.value)}
            required
          >
            {protocolGroups.map(group => (
              <optgroup label={group.label} key={group.label}>
                {group.options.map(opt => (
                  <option value={opt.value} key={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label>
          Card Number
          <input
            className="input"
            value={cardNumber}
            required
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            onChange={e => setCardNumber(formatCardNumber(e.target.value))}
          />
        </label>
        <label>
          Expiry (MM/YY)
          <input
            className="input"
            value={expiry}
            maxLength={5}
            required
            placeholder="MM/YY"
            onChange={e => setExpiry(formatExpiry(e.target.value))}
          />
        </label>
        <label>
          CVV/CVC
          <input
            className="input"
            value={cvv}
            required
            maxLength={4}
            placeholder="123"
            onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
          />
        </label>
        <label>
          Authorization/Approval Code
          <input
            className="input"
            value={authCode}
            required
            maxLength={6}
            placeholder="e.g. 1011"
            onChange={e => setAuthCode(e.target.value.replace(/\D/g, ""))}
          />
        </label>
        <label>
          Amount (USD/EUR)
          <input
            className="input"
            type="number"
            required
            min={0}
            max={1_000_000_000}
            step="0.01"
            value={amount}
            placeholder="e.g. 100.00"
            onChange={e => setAmount(e.target.value)}
          />
        </label>
        <button className="btn primary" type="submit">Proceed to Authorization</button>
        <div className="msg">{message}</div>
        <div className="login-links">
          <Link href="/dashboard" className="link">Back to Dashboard</Link>
        </div>
      </form>
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
        label {width:100%;color:#2853a8;font-size:1em;margin-bottom:2px;font-weight:500;}
        .input {width:100%;padding:11px 9px;border:1.5px solid #d7263d33;
          border-radius:8px;margin-bottom:7px;background:rgba(255,255,255,0.65);
          font-size:1em;color:#222;outline:none;margin-top:2px;}
        .input:focus {border:1.5px solid #d7263d;}
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
    </div>
  );
}
