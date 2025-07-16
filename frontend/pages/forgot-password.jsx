import { useState } from "react";
import Link from "next/link";
const terminals = Array.from({length: 1000}, (_, i) => `NBK-PAY-${(i+1).toString().padStart(4, "0")}`);

export default function ForgotPassword() {
  const [terminal, setTerminal] = useState(terminals[0]);
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPw, setNewPw] = useState("");

  const handleSendOtp = e => {
    e.preventDefault();
    setMessage("Sending OTP...");
    setTimeout(() => {
      setOtpSent(true);
      setMessage("OTP sent to your mobile/email.");
    }, 1000);
  };
  const handleReset = e => {
    e.preventDefault();
    setMessage("Resetting...");
    setTimeout(() => setMessage("Password reset!"), 1000);
  };

  return (
    <div className="glass-bg">
      <form className="glass-form" onSubmit={otpSent ? handleReset : handleSendOtp}>
        <img src="/logo-nbkpay.svg" alt="NBK Pay Logo" className="logo" />
        <div className="form-title">Forgot Password</div>
        <label>
          Terminal ID
          <select value={terminal} onChange={e => setTerminal(e.target.value)} className="input">
            {terminals.map(t => (<option value={t} key={t}>{t}</option>))}
          </select>
        </label>
        <label>
          Username
          <input className="input" required value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Mobile or Email
          <input className="input" required value={contact} onChange={e => setContact(e.target.value)} />
        </label>
        {otpSent && (
          <>
            <label>
              OTP
              <input className="input" maxLength={6} required value={otp} onChange={e => setOtp(e.target.value)} />
            </label>
            <label>
              New Password
              <input className="input" type="password" required value={newPw} onChange={e => setNewPw(e.target.value)} />
            </label>
          </>
        )}
        <div className="login-links">
          <Link href="/login" className="link">Back to Login</Link>
        </div>
        <button className="btn primary" type="submit">{otpSent ? "Reset Password" : "Send OTP"}</button>
        <div className="msg">{message}</div>
      </form>
      <style jsx>{`
        .glass-bg {min-height:100vh;display:flex;align-items:center;justify-content:center;
          background:linear-gradient(120deg,#e5e9f7 0%,#fff 100%);}
        .glass-form {width:99vw;max-width:410px;background:rgba(255,255,255,0.22);
          box-shadow:0 8px 32px 0 rgba(31,38,135,0.29);border-radius:22px;
          padding:36px 30px 30px 30px;display:flex;flex-direction:column;align-items:center;
          backdrop-filter:blur(11px);border:1.5px solid rgba(255,255,255,0.22);gap:18px;}
        .logo{width:70px;margin-bottom:6px;}
        .form-title{font-size:1.17rem;font-weight:700;color:#d7263d;margin-bottom:4px;letter-spacing:1px;}
        label{width:100%;color:#2853a8;font-size:1em;margin-bottom:2px;font-weight:500;}
        .input{width:100%;padding:11px 9px;border:1.5px solid #d7263d33;
          border-radius:8px;margin-bottom:7px;background:rgba(255,255,255,0.65);
          font-size:1em;color:#222;outline:none;margin-top:2px;}
        .input:focus{border:1.5px solid #d7263d;}
        .login-links{display:flex;flex-direction:column;gap:3px;width:100%;margin-bottom:10px;}
        .link{color:#d7263d;font-size:0.97em;text-align:left;text-decoration:underline;
          background:none;border:none;padding:0;margin:0;cursor:pointer;transition:color .2s;}
        .btn.primary{width:100%;background:linear-gradient(90deg,#d7263d 70%,#ffb4b4 100%);
          color:#fff;border:none;border-radius:8px;padding:13px 0 12px 0;font-size:1.09em;
          font-weight:600;cursor:pointer;margin-top:3px;}
        .msg{min-height:18px;color:#2853a8;font-size:0.98em;margin-top:6px;}
        @media (max-width:600px){.glass-form{padding:18px 7px 18px 7px;}}
      `}</style>
    </div>
  );
}
