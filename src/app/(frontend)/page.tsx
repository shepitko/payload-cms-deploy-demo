export default function HomePage() {
  return (
    <section className="shell">
      <div className="panel">
        <span className="eyebrow">Payload CMS + PostgreSQL</span>
        <h1>Production-leaning local starter</h1>
        <p>
          This project is intentionally small: one app container, one database container, clean
          environment variables, and a structure that can grow into CI/CD and DigitalOcean
          deployment.
        </p>
        <div className="actions">
          <a href="/admin">Open Payload Admin</a>
          <a href="/api/health">Check Health Endpoint</a>
        </div>
      </div>
    </section>
  )
}
