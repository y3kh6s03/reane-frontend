import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0
      }}
    >
      <div>
        <div
          style={{
            width: '100vw',
            maxWidth: "500px",
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