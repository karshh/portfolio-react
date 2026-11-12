import { projects, skills } from "~/lib/portfolio";

export default function Sait() {
  return <>
    <section className="container light-section text-center">
      <img draggable={false} className="banner" style={{ maxWidth: "75%", paddingBottom: 50 }} src="/assets/img/heritageHall.svg" alt="SAIT Heritage Hall" />
      <h2>Program</h2><p>🎓 SAIT</p><p>▣ Web Developer</p><p>◷ Jan. 2018 - April 2018</p>
    </section>
    <section className="dark-section"><div className="container text-center"><h2>Technical Summary</h2><br /><div className="row justify-center">
      {skills.map(([title, list]) => <div className="col-3" key={title}><div className="summary"><h5>{title}</h5><hr />{list.map((item) => <p key={item}>{item}</p>)}</div></div>)}
    </div></div></section>
    <section className="container light-section"><div className="text-center"><h2>Journey</h2></div><hr />
      {projects.map((project) => <article className="project" key={project.title}><h4>{project.title}</h4><div>{project.skills.map((item) => <span className="badge" key={item}>{item}</span>)}</div>
        <p>◷ {project.timeline}</p><p>⌘ <a href={`https://${project.github}`} target="_blank" rel="noreferrer">{project.github}</a></p><p>▤ <a href={`https://${project.website}`} target="_blank" rel="noreferrer">{project.website}</a></p><p>{project.description}</p>
      </article>)}
    </section>
  </>;
}
