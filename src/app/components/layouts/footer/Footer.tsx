import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        position: 'fixed',
        bottom: 0,
        left: 0

      }}
    >
      <div>
        <div
          style={{
            width: '100%',
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex",
            gap: "2rem",
            justifyContent: "center"
          }}
        >
          <Link href="/terms">
            利用規約
          </Link>
          <Link href="/privacy">
            プライバシーポリシー
          </Link>
        </div>
        <div
          style={{
            width: "100vw",
            textAlign: "center",
            marginBottom: "1rem"
          }}
        >
          {new Date().getFullYear()} &copy; REANE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}