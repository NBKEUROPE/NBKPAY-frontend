import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>NBK Pay - Card Payment Systems</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="glass-bg">
        <div className="glass-card">
          <img src="/logo-nbkpay.svg" alt="NBK Pay Logo" className="logo" />
          <div className="title">NBK Pay</div>
          <div className="subtitle">CARD PAYMENT SYSTEMS</div>
          <div className="terminal-id">Terminal ID: NBK-PAY-0001</div>
          <div className="login-buttons">
            <Link href="/login" className="btn primary">Login</Link>
            <Link href="/change-password" className="btn">Change Password</Link>
            <Link href="/forgot-password" className="btn">Forgot Password</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .glass-bg {
          min-height: 100vh;
          background: linear-gradient(120deg,#e5e9f7 0%,#fff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }
        .glass-card {
          width: 99vw;
          max-width: 400px;
          background: rgba(255,255,255,0.22);
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.29);
          border-radius: 22px;
          padding: 38px 30px 30px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(11px);
          border: 1.5px solid rgba(255,255,255,0.22);
        }
        .logo {
          width: 88px;
          margin-bottom: 10px;
        }
        .title {
          font-size: 2rem;
          font-weight: 700;
          color: #d7263d;
          letter-spacing: 1.5px;
          margin-bottom: 2px;
        }
        .subtitle {
          font-size: 1.05rem;
          color: #2853a8;
          letter-spacing: 1px;
          margin-bottom: 17px;
        }
        .terminal-id {
          color: #666;
          font-size: 1em;
          margin-bottom: 22px;
        }
        .login-buttons {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 14px;
        }
        .btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 14px 0;
          border-radius: 8px;
          font-size: 1.09em;
          font-weight: 600;
          background: rgba(255,255,255,0.55);
          color: #2853a8;
          border: 1.5px solid #d7263d;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          transition: background .2s, color .2s;
        }
        .btn.primary {
          background: linear-gradient(90deg,#d7263d 70%,#ffb4b4 100%);
          color: #fff;
          border: none;
        }
        .btn:hover, .btn.primary:hover {
          filter: brightness(1.09);
        }
        @media (max-width:600px){
          .glass-card { padding: 18px 7px 18px 7px; }
        }
      `}</style>
    </>
  );
}
