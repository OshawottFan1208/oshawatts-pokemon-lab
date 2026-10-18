type Project = {
  id: string
  title: string
  blurb: string
  category: 'Games' | 'Tools' | 'The Lab'
  status: 'live' | 'soon'
  url?: string
}

const PROJECTS: Project[] = [
  {
    id: 'daily-cynthia',
    title: 'Daily Cynthia',
    blurb: 'Challenge the Sinnoh Champion. Same six random Pokémon for everyone, one official battle a day. Can you win?',
    category: 'Games',
    status: 'live',
    url: 'https://daily-cynthia.oshawattjj.workers.dev',
  },
  {
    id: 'team-randomizer',
    title: 'Team Randomizer',
    blurb: 'Roll a random team with sensible movesets for Nuzlockes, challenge runs, or just for fun.',
    category: 'Tools',
    status: 'soon',
  },
  {
    id: 'coverage-checker',
    title: 'Type Coverage Checker',
    blurb: 'Paste a team and see which types it hits hard and which it struggles against.',
    category: 'Tools',
    status: 'soon',
  },
  {
    id: 'battle-lab',
    title: 'Battle Lab',
    blurb: 'Experimental battle ideas and prototypes. Not ready yet, but you can watch it take shape here.',
    category: 'The Lab',
    status: 'soon',
  },
]

function Card({ p, featured = false }: { p: Project; featured?: boolean }) {
  const live = p.status === 'live'
  return (
    <article className={`card${featured ? ' featured' : ''}${live ? '' : ' soon'}`}>
      <span className={`pill ${live ? 'pill-live' : 'pill-soon'}`}>{live ? 'Live' : 'Coming soon'}</span>
      <h3>{p.title}</h3>
      <p>{p.blurb}</p>
      {live && p.url ? (
        <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">
          Open game ↗
        </a>
      ) : (
        <span className="btn btn-disabled" aria-disabled="true">
          In development
        </span>
      )}
    </article>
  )
}

export default function App() {
  const featured = PROJECTS.find((p) => p.id === 'daily-cynthia') as Project
  const byCategory = (c: Project['category']) => PROJECTS.filter((p) => p.category === c && p.id !== featured.id)

  return (
    <>
      <header className="nav">
        <a className="brand" href="#top">Oshawatt's Pokémon Lab</a>
        <nav>
          <a href="#games">Games</a>
          <a href="#tools">Tools</a>
          <a href="#lab">The Lab</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">Your next adventure starts here</p>
          <h1>
            Welcome to the <span className="glow">Lab</span>.
          </h1>
          <p className="lead">Experiments, battles, and Pokémon projects, built by a fan, for fans.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#games">Explore projects</a>
            <a className="btn btn-ghost" href="#about">About the Lab</a>
          </div>
        </section>

        <section id="games">
          <h2>Games</h2>
          <Card p={featured} featured />
        </section>

        <section id="tools">
          <h2>Tools</h2>
          <div className="grid">
            {byCategory('Tools').map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section id="lab">
          <h2>The Lab</h2>
          <p className="section-note">Prototypes and half-finished ideas. Things here may change or disappear.</p>
          <div className="grid">
            {byCategory('The Lab').map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section id="about">
          <h2>About</h2>
          <div className="about">
            <p>
              Oshawatt's Pokémon Lab is a home for the Pokémon fan projects I build and tinker with. Daily Cynthia was
              the first, and more are on the way.
            </p>
            <p>
              Have feedback or an idea for the Lab? My github is OshawottFan1208, discord is darkaura1208, and twitter is @DarkAuraChannel
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        Oshawatt's Pokémon Lab is a free, unofficial fan project. It is not affiliated with or endorsed by Nintendo,
        Creatures Inc., GAME FREAK inc. or The Pokémon Company. Pokémon and Pokémon character names are © Nintendo,
        Creatures Inc. and GAME FREAK inc.
      </footer>
    </>
  )
}