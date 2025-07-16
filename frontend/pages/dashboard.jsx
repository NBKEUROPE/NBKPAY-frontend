import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="glass-bg">
      <div className="navbar">
        <img src="/logo-nbkpay.svg" alt="NBK Pay" className="nav-logo"/>
        <div className="nav-title">NBK Pay</div>
        <div className="nav-links">
          <Link href="/dashboard">Home</Link>
          <Link href="/payout">Payout</Link>
          <Link href="/card-payment">Card Entry</Link>
          <Link href="/history">History</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login" className="logout">Logout</Link>
        </div>
      </div>
      <div className="dashboard-content">
        <h2>Welcome to NBK Pay Terminal</h2>
        <p>Select a function from the navigation menu.</p>
      </div>
      <style jsx>{`
        .glass-bg {min-height:100vh;background:linear-gradient(120deg,#e5e9f7 0%,#fff 100%);}
        .navbar {
          display:flex;align-items:center;justify-content:space-between;
          padding: 18px 28px;background:rgba(255,255,255,0.28);
          box-shadow:0 3px 18px rgba(31,38,135,0.09);
          border-radius:0 0 14px 14px;
        }
        .nav-logo{width:44px;margin-right:8px;}
        .nav-title{font-size:1.36em;font-weight:700;color:#d7263d;margin-right:18px;}
        .nav-links{display:flex;gap:18px;}
        .nav-links a{color:#2853a8;font-weight:600;text-decoration:none;font-size:1.09em;}
        .nav-links a.logout{color:#d7263d;border-left:1.5px solid #ddd;padding-left:13px;}
        .dashboard-content{max-width:420px;background:rgba(255,255,255,0.18);
          margin:50px auto 0 auto;padding:38px 22px 22px 22px;border-radius:22px;
          box-shadow:0 6px 28px rgba(31,38,135,0.11);}
        @media (max-width:600px){
          .navbar{padding:12px 5px;}
          .dashboard-content{padding:15px 5px;}
        }
      `}</style>
    </div>
  );
}
