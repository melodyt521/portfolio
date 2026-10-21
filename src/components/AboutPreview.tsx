import './about-profile.css';

export function AboutPreview() {
 return <section className="about-section about-profile section-shell" aria-labelledby="about-profile-title">
  <header className="about-profile-heading"><h2 id="about-profile-title">A LITTLE ABOUT ME</h2><span>TAIWAN ↗ NEW YORK</span></header>
  <p className="about-profile-intro">I was born and raised in Taiwan and now live in New York City. I’m pursuing my M.S. in Information Systems at Cornell Tech, with a concentration in Connective Media. I graduated <em>cum laude</em> from UC San Diego with a B.S. in Cognitive Science, specializing in Design and Interaction.</p>
  <div className="about-profile-stories">
   <div><span className="about-profile-index" aria-hidden="true">01 / DESIGN</span><h3>How I work</h3><p>My work brings together visual design, user experience, and an interest in data. Across startups and larger companies, I’ve worked with different teams to understand what people need and help shape what gets built. I care about the details, from how an interface looks to how easily someone can use it.</p></div>
   <div><span className="about-profile-index" aria-hidden="true">02 / EVERYDAY</span><h3>Outside of design</h3><p>I’ve been dancing for over 10 years. It helps me express myself and look at things differently. I also love photography, making coffee and matcha, baking, café hopping, and flower arranging. I enjoy having room to experiment, and some of that creativity finds its way into my design work.</p></div>
  </div>
  <div className="about-profile-education" aria-label="Education">
   <div><span className="eyebrow">EDUCATION / 01</span><h3>UC San Diego</h3><p>B.S. Cognitive Science<br/>Spec. in Design &amp; Interaction</p></div>
   <div><span className="eyebrow">EDUCATION / 02</span><h3>Cornell Tech</h3><p>M.S. Information Systems<br/>Concentration in Connective Media</p></div>
  </div>
 </section>;
}
