const items = [
  'Docker-based local development with one main entry point',
  'Environment-based PostgreSQL configuration',
  'Local media storage isolated behind the media collection',
  'Clear path to later move media to S3 or DigitalOcean Spaces',
]

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

      <div className="panel muted">
        <h2>Why this setup works well in an interview</h2>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
