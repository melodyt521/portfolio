import { CaseStudyNavigation } from './NextProjectDisc';
import { CaseStudyDuration } from './CaseStudyDuration';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Footer } from './Footer';
import { ImageZoom } from './ImageZoom';
import { LoopingDemo } from './LoopingDemo';
import { CaseStudyContents } from './CaseStudyContents';
import assets from '../../docs/instagram-assets.json';
import './mapsocial.css';
import './instagram.css';

const sections = [
  ['ig-overview', 'Overview'], ['ig-research', 'User research'],
  ['ig-define', 'Pain points'], ['ig-solution', 'Design solution'],
  ['ig-prototype', 'Prototype'], ['ig-testing', 'Comment sharing & testing'],
  ['ig-reels', 'Reels'], ['ig-history', 'Browsing history'],
  ['ig-results', 'Results'], ['ig-takeaways', 'Takeaways'],
] as const;
type AssetName = keyof typeof assets;
function Figure({ name, alt, caption, phone = false, priority = false }: { name: AssetName; alt: string; caption?: string; phone?: boolean; priority?: boolean }) {
  const asset = assets[name];
  return <figure className={`ms-figure ${phone ? 'ms-phone' : ''}`}>
    <ImageZoom src={`/images/instagram/${name}.webp`} alt={alt}>
      <Image src={`/images/instagram/${name}.webp`} alt={alt} width={asset.width} height={asset.height} priority={priority} unoptimized={name === 'core-features'} sizes={phone ? '(max-width:767px) 80vw, 360px' : '(max-width:767px) 92vw, 1000px'}/>
    </ImageZoom>{caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function Demo({ name, label, description }: { name: string; label: string; description: string }) {
  return <figure className="ig-demo">
    <LoopingDemo name={name} label={label} captionId={`demo-${name}-caption`}/>
    <figcaption id={`demo-${name}-caption`}>{description}</figcaption>
  </figure>;
}

export function InstagramCaseStudy() {
  return <><main id="main" className="ms-case ms-original-flow ig-case section-shell">
    <Link href="/#work" className="text-link"><ArrowLeft size={16}/> BACK TO SELECTED WORK</Link>
    <header className="ms-heading">
      <span className="eyebrow">INSTAGRAM REDESIGN · PERSONAL PROJECT</span>
      <h1>Enhancing User Experience<br/>with New Features</h1>
      <p>More control over who you share with, what you watch, and the content you want to find again.</p>
      <dl className="ms-facts"><div><dt>Role</dt><dd>UI/UX Designer</dd></div><div><dt>Team</dt><dd>Personal project</dd></div><div><dt>Tools</dt><dd>Figma</dd></div></dl><CaseStudyDuration projectLength="3 weeks"/>
      <div className="ms-source-actions"><a href="#ig-prototype" className="text-link">See the design explorations <ArrowUpRight size={16}/></a><a href="#ig-results" className="text-link">Read the results <ArrowUpRight size={16}/></a></div>
    </header>
    <div className="ms-image-pair ms-lead-screens ig-lead"><Figure name="custom-group-post" alt="Instagram feed redesign showing a post shared with a custom group" phone priority/><Figure name="audience-preview" alt="Audience selection for sharing an Instagram post with a custom group" phone priority/></div>
    <div className="ms-reading-layout"><aside className="ms-sidebar"><CaseStudyContents items={sections}/></aside><div className="ms-reading-content">
      <section id="ig-overview" className="ms-section"><h2>Project Overview</h2><h3>Making everyday interactions easier</h3><p>This independent redesign explores sharing and content discovery on Instagram. I designed custom audiences, comment sharing, full-screen Reels, faster playback, and browsing history around frustrations surfaced in user interviews.</p></section>
      <section id="ig-research" className="ms-section"><h2>User Research</h2><h3>User interviews</h3><p>I interviewed 10 people aged 18–28, with conversations averaging about 15 minutes. I grouped their feedback into an affinity diagram covering Reels, sharing, messaging, and the feed.</p><Figure name="affinity-diagram" alt="Affinity diagram grouping interview findings about Instagram Reels, sharing, messaging, and feed experiences" caption="Interview themes organized into frustrations and opportunities."/></section>
      <section id="ig-define" className="ms-section"><h2>Define</h2><h3>User pain points</h3><p>The recurring problems were recovering unsaved content, tailoring audiences, and viewing Reels without interface elements getting in the way. I mapped these needs to possible features.</p><Figure name="pain-points" alt="Chart connecting Instagram user pain points to proposed design solutions"/></section>
      <section id="ig-solution" className="ms-section"><h2>Design Solution</h2><h3>Core features</h3><p>The proposed features give people more control while retaining familiar Instagram interaction patterns.</p><p><em>Designed before Instagram launched browsing history and full-screen views.</em></p><Figure name="core-features" alt="Four core features: Custom Groups, Enhanced Reel Controls, Browsing History, and Share Comment"/></section>
      <section id="ig-prototype" className="ms-section"><h2>Prototype</h2><div className="ig-feature-heading"><div><h3>Share with the people you choose</h3><p>Custom Groups extends Close Friends into multiple audiences. People can name circles for family, coworkers, or friends instead of repeatedly editing a single list.</p></div><div className="ig-heading-detail"><Figure name="custom-groups" alt="Custom Groups audience option in the redesigned sharing interface"/></div></div><Demo name="custom-groups" label="Custom group creation demo" description="Select people, name a group, and save the custom audience."/><div className="ms-image-pair ig-phone-pair"><Figure name="add-group" alt="Create a custom Instagram audience group" phone/><Figure name="name-group" alt="Name a custom group and choose its members" phone/></div>
        <article id="ig-stories" className="ms-flow-feature"><div className="ig-feature-heading"><div><h3>Sharing stories</h3><p>A group selector in the sharing flow lets people choose an audience. A puzzle-piece marker identifies custom groups.</p></div><div className="ig-heading-detail ig-story-heading-detail"><Figure name="share-story" alt="Custom group story ring and profile indicator"/></div></div><Demo name="share-story" label="Story sharing demo" description="Choose a custom group before sharing a story."/><div className="ig-story-layout"><Figure name="story" alt="Instagram story with custom audience sharing options" phone/></div></article>
        <article id="ig-posts" className="ms-flow-feature"><h3>Sharing posts</h3><p>The same audience choice carries into posts. A group marker beside the published post makes its audience recognizable.</p><div className="ig-demo-presentation"><Demo name="share-post" label="Post audience selection demo" description="Select an audience and publish a post to that group."/><div className="ig-supporting-screens"><Figure name="home" alt="Instagram feed with the custom group audience indicator" phone/><Figure name="post-audience" alt="Choose an audience before publishing a post" phone/></div></div></article>
      </section>
      <section id="ig-testing" className="ms-section"><h2>Comment Sharing</h2><h3>Keep the comment and its context together</h3><p>Share a comment directly into a conversation with the original content and commenter attached, avoiding a screenshot and extra explanation.</p><Demo name="share-comment" label="Comment sharing demo" description="Share a comment into a chat with its original context."/><h3>A/B testing</h3><p>I compared a share icon with a text-based “Share” action beside “Reply.” Seven of 12 participants preferred the text option, citing clearer placement and less risk of accidentally selecting it beside “Like.”</p><Figure name="comment-comparison" alt="A/B comparison of an icon-based share action and a text Share action next to Reply" caption="7 of 12 participants preferred Option B, the text-based action."/><div className="ms-image-pair ig-phone-pair"><Figure name="comment-sharing" alt="Comment menu with the text Share action" phone/><Figure name="comment-chat" alt="A shared comment displayed in an Instagram conversation" phone/></div></section>
      <section id="ig-reels" className="ms-section"><h2>Reels</h2><div className="ms-flow-subsection"><h3>Full-screen viewing</h3><p>A full-screen option moves profile and caption overlays away from video content, addressing subtitles being obscured.</p><Demo name="full-screen" label="Full-screen Reels demo" description="Recorded prototype: the full-screen action clears the Reel’s profile and caption overlays."/></div><div className="ms-flow-subsection"><h3>2.0× playback</h3><p>Pressing and holding the screen speeds up a Reel, giving viewers a quicker way to move through longer videos.</p><Demo name="double-speed" label="Double-speed Reels demo" description="Recorded prototype: holding activates 2× playback; releasing returns to normal speed."/></div></section>
      <section id="ig-history" className="ms-section"><h2>Browsing History</h2><h3>Find the post you forgot to save</h3><p>A history view and search help people revisit recently viewed posts and Reels, even when they did not save or share them.</p><div className="ig-demo-presentation"><Demo name="browsing-history" label="Browsing history demo" description="Revisit recently viewed content from the profile’s history view."/><div className="ig-supporting-screens"><Figure name="browsing-history" alt="Settings and activity with access to browsing history" caption="Access browsing history from Settings and activity." phone/><Figure name="history-search" alt="History search showing a matching previously viewed post" caption="Search for a previously viewed post."/></div></div></section>
      <section id="ig-results" className="ms-section"><h2>Success Metrics</h2><h3>User testing</h3><p>Across five rounds of testing, the original case study reports 92% overall task success. Three participants needed a second attempt with 2.0× playback; the other tasks were reported as fully successful.</p><div className="ms-nps"><strong>92%</strong><span>Reported task success in user testing</span></div><p className="ms-evidence-note">These results describe prototype testing for a personal redesign, rather than a live Instagram release.</p></section>
      <section id="ig-takeaways" className="ms-section"><h2>Final Takeaways</h2><div className="ms-flow-subsection"><h3>If I had more time…</h3><p>I would explore more granular content filtering and test further iterations with users.</p></div><div className="ms-flow-subsection"><h3>What I learned</h3><p>Improving an established platform means balancing new capabilities with familiar patterns. Specific frustrations helped keep the redesign focused.</p></div></section>
      <CaseStudyNavigation currentSlug="instagram-redesign"/>
    </div></div>
  </main><Footer/></>;
}
