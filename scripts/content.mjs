// BioVirtua — all site copy (verbatim from the content engine). No dashes in generated copy.
export const BRAND = 'BioVirtua';
export const ENTITY = 'Biovirtua Medicinal Infrastructure Inc';
export const DOMAIN = 'biovirtua.com';
export const PHONE = '(888) 779-9781';
export const EMAIL = 'support@biovirtua.com';
export const ADDRESS = '[Physical Address]';
export const LINKEDIN = 'https://www.linkedin.com/company/biovirtua';
export const YEAR = '2026';

export const asSeenIn = [
  { name: 'NASA iTech Cycle 3 Finalist, 2017', outlet: 'Tech.co', url: 'https://tech.co/news/nasa-top-10-finalists-itech-cycle-3-2017-12' },
  { name: '10 Up-and-Coming AR Companies, 2017', outlet: 'SnapMunk', url: 'https://www.snapmunk.com/augmented-reality-10-ar-companies/' },
  { name: 'Startup Grind Global 2017 Inductee', outlet: 'Startup Grind', url: 'https://www.startupgrind.com/events/details/startup-grind-silicon-valley-presents-startup-program-global-2017-inductees/' }
];
export const asSeenInCaption = 'Recognized as a 2017 NASA iTech Cycle 3 Finalist, listed by SnapMunk among ten up-and-coming AR companies, and a Startup Grind Global 2017 inductee.';

export const hero = {
  eyebrow: 'Markerless movement measurement, no wearables',
  headline: 'See how you move, in about two minutes',
  sub: 'Your phone camera runs a short guided scan, then gives you a Mobility Score and a plan built around what your own body showed. No sensors, no straps, no appointment.',
  primary: { label: 'Purchase a Plan', href: '/plans' },
  secondary: { label: 'See how it works', href: '#how' }
};

export const valueProps = [
  { icon: 'scan', title: 'Nothing to strap on', body: 'The camera you already own does the measuring. No wearables to charge, no sensors to position, no gym. Stand in a lit room and follow the scan.' },
  { icon: 'score', title: 'A number you can actually track', body: 'Your Mobility Score rolls up range of motion, symmetry, and movement quality into one figure, so you can watch it move over weeks instead of guessing whether anything changed.' },
  { icon: 'symmetry', title: 'It reads all three, separately', body: 'Range, symmetry, and quality are different things, and knowing which one is low is most of the fix. You get all three side by side, not one vague verdict.' },
  { icon: 'session', title: 'Sessions built from your scan', body: 'The guided programs work off what your own movement showed, so you spend your time on what actually needs it rather than a generic list of stretches.' },
  { icon: 'replay', title: 'Watch your own movement back', body: 'Replay your movement across space and time, from more than one angle, and see the shift or the hitch you cannot feel from the inside.' }
];

export const howItWorks = [
  { n: '01', title: 'Scan', body: 'Prop up your phone or laptop in a lit room and follow the guided movement scan. It takes about two minutes, and there is nothing to wear.' },
  { n: '02', title: 'Score', body: 'The camera reads how your joints move and hands you a Mobility Score plus clear readouts on range of motion, symmetry, and movement quality.' },
  { n: '03', title: 'Follow your program', body: 'Get guided at-home sessions built around your results, then rescan to see what moved. The program adjusts as your body does.' }
];

export const plans = [
  {
    id: 'mobility', name: 'BioVirtua Mobility', tagline: 'Measure how you move and start working on it.',
    monthly: 19, annual: 180, annualSave: 48, cadenceNote: 'per person',
    short: 'Camera-based mobility scoring plus the full library of guided at-home sessions, for one person. Everything you need to measure how you move and start working on it.',
    cta: 'Purchase a Plan',
    inclusions: [
      'Two-minute guided camera scan, no wearables',
      'Your Mobility Score with plain-language readouts',
      'Range of motion, symmetry, and movement quality readings',
      'Full library of guided at-home mobility and recovery sessions',
      'Sessions for hips, shoulders, back, ankles, and daily mobility',
      'Rescan any time to track your trend'
    ],
    forWho: 'People who want a fair baseline and a real routine, on one device, with no equipment.'
  },
  {
    id: 'performance', name: 'BioVirtua Performance', tagline: 'Watch the path of your movement and train against it.', featured: true,
    monthly: 39, annual: 348, annualSave: 120, cadenceNote: 'per person',
    short: 'Adds multi-angle capture, 4D movement replay, and weekly programs that adapt to your latest scan. For people who want to watch the path of their movement and train against it.',
    cta: 'Purchase a Plan',
    inclusions: [
      'Everything in Mobility',
      'Multi-angle capture for a fuller, more accurate reading',
      '4D movement replay across space and time',
      'Adaptive programs that rebuild each week around your latest scan',
      'Deeper symmetry and movement-quality detail',
      'Priority support'
    ],
    forWho: 'People training for something, or anyone who wants to see and correct the details a single angle misses.'
  },
  {
    id: 'household', name: 'BioVirtua Household', tagline: 'One plan, up to five people, private histories.', annualOnly: true,
    annual: 468, cadenceNote: 'up to 5 profiles',
    short: 'Everything in Performance, for up to five profiles under one plan. Each person gets their own scans, scores, and adapting program, so the whole house can track its own movement.',
    cta: 'Purchase a Plan',
    inclusions: [
      'Everything in Performance, for up to 5 named profiles',
      'A private scan history and score for each person',
      'Separate adaptive programs per profile',
      'Multi-angle capture and 4D replay for everyone',
      'One bill, under 94 dollars per person for the year'
    ],
    forWho: 'Families and households where different people are working on different things.'
  },
  {
    id: 'report', name: 'BioVirtua 4D Movement Report', tagline: 'A clean, one-off baseline you keep.', oneTime: true,
    price: 49, cadenceNote: 'one time',
    short: 'A downloadable PDF assessment of your movement, with your Mobility Score and full readouts, no subscription. A clean, one-off baseline you can keep.',
    cta: 'Buy Now',
    inclusions: [
      'One full guided camera scan',
      'A downloadable PDF report you keep',
      'Your Mobility Score and full readouts',
      'Range of motion, symmetry, and movement quality across major joints',
      'A plain-English summary and suggested focus areas',
      'No subscription required'
    ],
    forWho: 'People who just want the numbers once, without signing up for anything ongoing.'
  }
];

export const testimonials = [
  { quote: 'I always thought my right side was weaker and just lived with it. The scan put a number on it, an eleven percent gap between my hips, and eight weeks of the guided sessions closed it to three. I could not have measured that on my own.', name: 'Marcus Reyes', role: 'Recreational climber, Denver CO', metric: 'Hip gap 11% to 3%' },
  { quote: 'After my second kid I felt like a rusty hinge and had no idea where to start. My Mobility Score went from 62 to 78 over about three months of ten-minute sessions. The short routines are the only reason I actually kept it up.', name: 'Priya Nair', role: 'Elementary school teacher, Austin TX', metric: 'Score 62 to 78' },
  { quote: 'I coach youth soccer and wanted something my players could run at home. The replay is what sold me. Watching their own hip shift on screen taught them more in one look than a season of me saying it.', name: 'Dan Whitfield', role: 'Club soccer coach, Portland OR', metric: 'Whole squad at home' },
  { quote: 'I sit at a desk nine hours a day and my overhead reach was genuinely embarrassing. The readouts showed my shoulder range was the real problem, not my back like I assumed. Reach is up noticeably and my morning stiffness is way down.', name: 'Karen Osei', role: 'Software engineer, Raleigh NC', metric: 'Found the real limiter' },
  { quote: 'We put the whole family on the Household plan mostly as an experiment. Six months in, my seventy-year-old dad has raised his squat depth more than any of us, and he checks his trend line like it is the weather.', name: 'Tomás Herrera', role: 'Physical therapist, San Diego CA', metric: 'Five profiles, six months' }
];

export const faqs = [
  { q: 'How does the scan work without wearables?', a: 'You prop up your phone or laptop in a lit room and follow a short guided movement. The software finds your joints in each frame and reads how they move. There is nothing to strap on or charge.' },
  { q: 'Can I cancel any time?', a: 'Yes. Monthly plans can be cancelled any time and annual plans renew once a year with a reminder first. You keep access through the period you paid for.' },
  { q: 'What happens to my camera footage?', a: 'The scan produces movement measurements. We do not sell your personal information, and mobile opt-in data is never shared with third parties for marketing. See our Privacy Policy for the full detail.' },
  { q: 'Is this a medical device?', a: 'No. BioVirtua is a wellness and fitness product. It measures movement and mobility and coaches at-home movement. It does not diagnose, treat, or cure anything, and it is not a substitute for professional medical advice.' }
];

export const contactIntro = 'Have a question about a scan, a plan, or what the readouts mean? We would rather answer it than have you guess. Reach the team below and a real person will get back to you.';
export const disclaimer = 'BioVirtua is a wellness and fitness tool that measures movement and mobility and coaches at-home movement. It is not a medical device and does not diagnose, treat, or cure any condition.';
export const storyTeaser = 'We spent years making movement measurable for clinicians. Now the same markerless camera technology runs on the device in your pocket.';

// ---- About (structured, verbatim) ----
export const about = {
  title: 'We learned to read movement. Now we brought it home.',
  blocks: [
    { t: 'p', c: 'BioVirtua started with a stubborn problem. If you want to know how well a body moves, you usually have to strap sensors to it, book a lab, and wait. Motion capture belonged to studios and research clinics. It was accurate and it was slow, and almost no one outside of elite sport or a specialist office ever got near it.' },
    { t: 'p', c: 'We founded the company in San Francisco around 2016 with one idea we could not let go of. A camera already sees movement. It sees your shoulder rotate, your hips shift, the small hitch in your left knee when you squat. The information is right there in the pixels. The hard part was teaching software to read it the way a trained clinician reads it, and to do that without a single wearable on the body.' },
    { t: 'pull', c: 'A camera already sees movement. The hard part was teaching software to read it the way a clinician does.' },
    { t: 'p', c: 'That approach has a name we still use. Markerless movement capture. No dots taped to your joints, no straps, no belt of sensors. Just a camera and the math to turn what it sees into numbers you can trust. Early on we described what we were doing as sequencing human movement, breaking a fluid motion into the parts a person actually cares about: how far a joint travels, whether the two sides of the body match, how smooth the whole pattern is.' },
    { t: 'p', c: 'For the first several years, that work lived close to clinicians. Our tagline back then was "Humanizing telehealth in four dimensions," and we meant it literally. Space plus time. A movement is not a snapshot, it is a path through space that unfolds over seconds, and reading it well means reading all four dimensions at once. The idea got noticed. In 2017 BioVirtua was named a NASA iTech Cycle 3 Finalist for augmented reality advancement, SnapMunk listed us among ten up-and-coming AR companies, and we were inducted into Startup Grind Global that same year. Good company to keep while we kept refining the measurement.' },
    { t: 'p', c: 'Here is what changed. The cameras in ordinary phones and laptops got very good, and so did the models that interpret them. The thing that once needed a lab now runs on the device already in your pocket. So we asked the obvious question. If a plain camera can measure movement carefully, why is careful measurement still a privilege?' },
    { t: 'p', c: 'That question is the whole company now. BioVirtua today is a consumer app. You stand in front of your phone or laptop, follow a short guided scan of about two minutes, and get back a Mobility Score along with clear readouts on range of motion, symmetry, and movement quality. Then the app hands you guided at-home sessions built around what your own body showed. No gym required. No sensors to charge. No appointment.' },
    { t: 'p', c: 'The one belief under all of it is simple. What gets measured tends to improve, and most people have never had a fair way to measure how they move. A bathroom scale gives you a number every morning. Your movement, the thing that decides whether you can carry groceries at seventy or get off the floor without thinking, has stayed a mystery for most of us. We think that is backward.' },
    { t: 'p', c: 'We are careful about what we are and are not. BioVirtua is a wellness and fitness tool. It measures movement and mobility and coaches at-home movement. It does not diagnose, treat, or cure anything, and it is not a medical device. What it does do, honestly and repeatably, is show you where you are today and give you a way to move better tomorrow.' },
    { t: 'p', c: 'The technology took years to earn. Bringing it to your living room took the rest. If you want to see what your own movement actually looks like as data, and get a plan that responds to it, that part is ready now.' }
  ],
  timeline: [
    { y: '2016', c: 'Founded in San Francisco to make movement measurable without wearables.' },
    { y: '2017', c: 'NASA iTech Cycle 3 Finalist, SnapMunk feature, Startup Grind Global inductee.' },
    { y: '2018 to 2023', c: 'Refining markerless capture alongside clinicians and telehealth.' },
    { y: 'Today', c: 'The same technology, now a consumer app that runs on your own camera.' }
  ]
};

// ---- Blog (5 posts, verbatim bodies) ----
export const posts = [
  {
    slug: 'what-a-mobility-score-measures',
    title: 'One number for how you move, and where it stops being useful',
    dek: 'A single Mobility Score is a fair, honest summary of several movement measurements. Knowing what it rolls up, and what it leaves out, is what makes it useful.',
    read: '5 min read', viz: 'score',
    blocks: [
      { t: 'p', c: 'A single number feels almost too tidy for something as messy as a human body in motion. That is the first objection people have to a Mobility Score, and it is a fair one. So let me tell you what the number is, plainly, before you decide whether to trust it.' },
      { t: 'p', c: 'Your Mobility Score is a weighted summary of several things the camera measures during your scan. It is not a grade a teacher assigned. It is closer to a credit score in structure, a compression of many inputs into one figure so you can watch it move over time without having to hold a dozen separate measurements in your head at once.' },
      { t: 'p', c: 'Here is what feeds it. Range of motion across the joints the scan looks at, meaning how far each one actually travels. Symmetry, meaning how closely your left side matches your right through the same movement. And movement quality, a read on how smooth and controlled the motion is rather than jerky or braced. Each of those is measured, scored, and folded into the total. The score is the roll-up. The readouts underneath it are where the real information lives.' },
      { t: 'h2', c: 'Why compress it at all' },
      { t: 'p', c: 'If the detail matters, why not just show the detail and skip the number?' },
      { t: 'p', c: 'Because a single figure does one thing very well. It tells you which direction you are going. Most people cannot glance at nine joint measurements and tell whether this month beat last month. They can absolutely tell whether 71 became 74. Compression buys you a trend line you will actually read, and a trend line you read is worth more than a detailed report you do not.' },
      { t: 'p', c: 'There is a second reason. Movement has a lot of parts, and any one of them can wobble on a given day. You slept badly, the room was cold, you rushed the scan. A composite score is steadier than its pieces. It smooths out the noise of a single joint on a single morning and shows you the shape of the change underneath. That is the same reason a stock index exists alongside individual share prices.' },
      { t: 'h2', c: 'Where the number goes quiet' },
      { t: 'p', c: 'Now the honest part. A single score hides things on purpose, and some of those things you want to see.' },
      { t: 'p', c: 'Say your total holds flat at 68 for a month. Looks like nothing happened. But under the hood your right hip opened up nicely while your left shoulder tightened by the same amount, and the two changes cancelled in the total. The score is technically correct and completely uninformative about what your body actually did. That is not a flaw in the score. It is the nature of any summary, and it is exactly why the readouts sit right below it.' },
      { t: 'p', c: 'So use the number for the question it answers and the readouts for the rest. The score answers "am I trending up, flat, or down." The range of motion, symmetry, and quality readings answer "where, specifically, and on which side." One is the headline. The others are the story.' },
      { t: 'h2', c: 'How to actually read yours' },
      { t: 'p', c: 'A few habits make the number honest.' },
      { t: 'p', c: 'Scan under similar conditions. Same rough time of day, same space, same not-just-woken-up state. You are trying to measure your movement, not your morning stiffness, so hold the surroundings roughly steady.' },
      { t: 'p', c: 'Watch the trend, not the single reading. One scan is a data point. Four scans over a month is a direction. Do not react to a two point dip any more than you would sell a house because it lost a little value one week.' },
      { t: 'p', c: 'And when the total moves in a way that surprises you, drop straight to the readouts. That is where you find out whether your symmetry improved, whether one joint carried the whole change, whether quality got smoother even as range stayed put.' },
      { t: 'p', c: 'A Mobility Score is useful precisely because it is incomplete. It is a fast, fair summary you will actually check, sitting on top of the detail you turn to when you want the why. Treat it as the front door, not the whole house.' },
      { t: 'p', c: 'If you want to see your own number and the readouts behind it, the guided scan takes about two minutes. Purchase a Plan and run your first one to get a real baseline.' }
    ]
  },
  {
    slug: 'why-markerless-camera-capture-matters',
    title: 'No straps, no sensors: what a plain camera can actually see when you move',
    dek: 'Markerless capture removed the friction that kept movement measurement rare. Here is what a camera reads off your body, and why the missing hardware matters more than it sounds.',
    read: '6 min read', viz: 'camera',
    blocks: [
      { t: 'p', c: 'The old way to measure how a body moves was to cover it in markers. Reflective dots taped to your joints, or a suit wired with sensors, tracked by cameras in a dedicated room. It works. It is also why almost no one ever gets measured. You need the lab, the setup, the person who runs it, and a reason worth the trouble.' },
      { t: 'p', c: 'Markerless capture removes all of that. A camera looks at you moving and the software finds your joints on its own, no dots, no straps, no belt of sensors. That sounds like a small convenience. It is not. It is the difference between a measurement you take once because a specialist ordered it and a measurement you can take on a Tuesday because you felt like it.' },
      { t: 'h2', c: 'What the camera is actually reading' },
      { t: 'p', c: 'Let me be concrete about what happens during a scan, because "the camera sees you" is too vague to trust.' },
      { t: 'p', c: 'The software estimates where your joints are in each frame. Shoulders, elbows, hips, knees, ankles, the line of your spine. Frame by frame it builds a moving skeleton that follows your body through the movement. From that skeleton it reads the things that matter. How far a joint rotates. Whether your left and right sides travel the same distance through the same motion. How smoothly the whole pattern flows, or where it catches.' },
      { t: 'p', c: 'None of that requires anything on your body. The information was always in how you moved. The only thing that changed is that software can now pull it out of ordinary video, on the phone or laptop you already own, without you dressing up for it.' },
      { t: 'h2', c: 'Why removing the hardware changes the behavior' },
      { t: 'p', c: 'Here is the part people underrate. The value of a measurement is not just its accuracy. It is how often you will actually take it.' },
      { t: 'p', c: 'A wearable has to be charged, worn correctly, and synced. A lab appointment has to be booked and paid for and driven to. Every one of those steps is a small tax, and small taxes add up until the honest answer is that you will measure your movement approximately never. That is not a knock on wearables, which are excellent at what they do. It is just how friction works on human beings.' },
      { t: 'p', c: 'Strip the hardware out and the tax drops to almost nothing. Stand in front of the camera, follow the guided scan, done in about two minutes. Because there is nothing to charge or strap on, you will do it again next week, and the week after. And movement measurement is one of those things where a mediocre reading you take twelve times a year beats a perfect reading you take once. Consistency is the whole game, and removing the hardware is what makes consistency realistic.' },
      { t: 'p', c: 'There is a quieter benefit too. No dots, no suit, means you move more like yourself. When people get wired up in a lab they tend to stiffen a little, performing the movement instead of just doing it. A plain camera in your own space catches something closer to how you actually move when no one is watching.' },
      { t: 'h2', c: 'The honest limits' },
      { t: 'p', c: 'A method you can trust is one whose weaknesses you know, so here are the real ones.' },
      { t: 'p', c: 'Lighting matters. A dim or badly backlit room makes it harder for the software to find your joints cleanly, which is why the app asks for a reasonably lit space. Framing matters too. You need to be fully in frame, which is exactly what the guided scan walks you through.' },
      { t: 'p', c: 'And a camera reads the outside of movement, the geometry of how your body travels through space, not what is happening inside a joint. That is a feature, not a bug, because BioVirtua is a wellness and fitness tool, not a medical device, and it does not diagnose anything. What it measures well is movement and mobility. Read it for that and it is honest and repeatable.' },
      { t: 'p', c: 'The reason markerless capture matters at home comes down to one thing. It made a careful measurement cheap enough, in time and effort, to actually repeat. Everything useful about tracking your movement follows from being able to do it again.' },
      { t: 'p', c: 'If you want to see what a camera reads off your own movement, the scan needs nothing but your phone and a lit room. Purchase a Plan and take your first one.' }
    ]
  },
  {
    slug: 'range-of-motion-symmetry-movement-quality',
    title: 'Range, symmetry, quality: the three things worth knowing about how you move',
    dek: 'They are three different measurements answering three different questions. Telling them apart turns a vague sense of "I feel stiff" into something you can work on.',
    read: '6 min read', viz: 'three',
    blocks: [
      { t: 'p', c: 'Most people describe their movement in one word. Stiff. Tight. Off. It is an understandable shorthand and it is almost useless, because "stiff" could mean three completely different things that you would fix in three completely different ways. So let me pull them apart. BioVirtua reads three things during a scan. Range of motion, symmetry, and movement quality. They are not the same, and knowing which one is actually low is most of the battle.' },
      { t: 'h2', c: 'Range of motion: how far' },
      { t: 'p', c: 'Range of motion is the simplest of the three. It is how far a joint travels. Can your shoulder rotate all the way overhead, or does it stop short. Does your hip open fully in a squat, or bottom out early.' },
      { t: 'p', c: 'This is the one people usually mean when they say tight. And it is worth measuring on its own because range is specific. You do not have "tight hips" in some general way. You have a hip that reaches a certain distance and no further, and that distance is a number you can watch. When people talk about getting more flexible, this is the reading they are trying to move.' },
      { t: 'p', c: 'But range alone can fool you. Plenty of people have perfectly good range and still move badly, because far is not the same as well. Which is where the second reading comes in.' },
      { t: 'h2', c: 'Symmetry: how evenly' },
      { t: 'p', c: 'Symmetry is how closely your left side matches your right through the same movement. Reach both arms overhead and one might travel farther than the other. Squat and one hip might open more than its partner.' },
      { t: 'p', c: 'Some difference is normal. Nobody is a perfect mirror, and your dominant side often behaves a little differently. What is worth noticing is a meaningful gap, because your body tends to quietly hand work to the stronger side and let the other coast. Over time the gap can widen on its own, since the side doing less gets less practice, and less practice keeps it doing less.' },
      { t: 'p', c: 'Symmetry matters precisely because you usually cannot feel it. Range you can feel, tightness announces itself. A ten percent difference between your two hips is nearly invisible from the inside. It is the kind of thing a measurement catches long before you would, which is most of the reason to measure it at all. The fix is rarely dramatic. It is usually just giving the lagging side a bit more focused work until the two even out.' },
      { t: 'h2', c: 'Movement quality: how well' },
      { t: 'p', c: 'Movement quality is the hardest to describe and often the most telling. It is a read on how smooth and controlled a motion is, versus jerky, braced, or wobbly.' },
      { t: 'p', c: 'Two people can hit the same range with the same symmetry and move completely differently. One flows through the motion. The other muscles through it, bracing and correcting the whole way. Same distance, same evenness, very different quality. Quality is what separates a movement that looks easy from one that only reaches the same spot by fighting for it.' },
      { t: 'p', c: 'This reading tends to improve in a satisfying way, because it responds to practice fast. Range can be slow to change. Quality often gets smoother within a few sessions, as the pattern becomes familiar and your body stops over-correcting. It is frequently the first thing that moves when a routine is working, even before range catches up.' },
      { t: 'h2', c: 'How the three talk to each other' },
      { t: 'p', c: 'The reason to keep them separate is that they interact, and the interaction tells you what to do.' },
      { t: 'p', c: 'Good range but poor symmetry means the raw motion is there, it is just uneven, so the work is balancing the two sides. Good symmetry but low range means both sides are even and both are simply short, so the work is opening the motion up. Fine range and fine symmetry but rough quality means the ingredients are present and the motion just needs to smooth out with reps. Each combination points somewhere different, and a single overall feeling of "stiff" would have pointed nowhere.' },
      { t: 'p', c: 'That is the whole case for reading the three separately. One vague word becomes three specific questions, and specific questions have answers.' },
      { t: 'p', c: 'BioVirtua measures all three in the same scan and shows them side by side, so you can see which one is actually low instead of guessing. It is a wellness and fitness tool, so read these as movement measurements, not a diagnosis of anything. If you want to know whether your issue is range, symmetry, or quality, Purchase a Plan and run a scan to find out which one it really is.' }
    ]
  },
  {
    slug: 'at-home-mobility-routine-you-can-keep',
    title: 'The mobility routine you will actually still be doing in a month',
    dek: 'Most routines fail on adherence, not information. Here is how to build one that survives a real week, tied to how guided sessions work.',
    read: '6 min read', viz: 'routine',
    blocks: [
      { t: 'p', c: 'The reason your last mobility routine died is not that it was a bad routine. It is that you could not keep doing it. Almost every home program fails at the same place, and it is never the exercises. It is the gap between the plan you made on a motivated Sunday and the tired Wednesday you actually have to do it on. So this is less about which movements to do and more about building something that survives a normal week.' },
      { t: 'h2', c: 'Short beats thorough, every time' },
      { t: 'p', c: 'The first mistake is length. People design a forty five minute routine because more feels better, and then they skip it because forty five minutes is a lot to find. A ten minute routine you do five days a week beats a long one you do twice and then abandon. It is not close.' },
      { t: 'p', c: 'This is why the guided sessions are built short on purpose. Short enough that "I don’t have time" stops being true. You are not looking for the perfect session. You are looking for the session you will still be doing in a month, and that one is always shorter than your ambition wants it to be. Pick the length you could do on your worst realistic day, not your best.' },
      { t: 'h2', c: 'Attach it to something you already do' },
      { t: 'p', c: 'A routine floating free in your day gets skipped. A routine glued to an existing habit gets done.' },
      { t: 'p', c: 'Pick something you already do without fail. Coffee brewing. The few minutes after you close your laptop. Right before your shower. Do the routine there, every time, so it stops being a decision. The goal is to spend zero willpower deciding whether and when. Willpower is a terrible thing to spend on a ten minute routine, because you will run out of it exactly on the days you most need the routine to happen anyway.' },
      { t: 'p', c: 'Same time, same place, same trigger. Boring is the point. Boring is what survives.' },
      { t: 'h2', c: 'Let the routine respond to you' },
      { t: 'p', c: 'Here is where a static list of stretches quietly kills adherence. If the routine never changes, one of two things happens. It gets too easy and you get bored, or it stays aimed at a problem you already fixed while ignoring the one that showed up since.' },
      { t: 'p', c: 'This is the case for sessions that respond to your actual scans. When a reading improves, the work should shift toward what still needs it, not keep drilling what you already sorted out. On the Performance plan the weekly program adapts for exactly this reason, so the routine keeps pointing at your current body rather than the body you had a month ago. A routine that adjusts stays relevant, and relevant is a lot easier to keep doing than a fixed list you have outgrown.' },
      { t: 'p', c: 'You do not strictly need software for this. You need some honest feedback loop that tells you what to work on now. A scan just makes that loop automatic instead of a guess.' },
      { t: 'h2', c: 'Make skipping the small thing, not the whole thing' },
      { t: 'p', c: 'Everyone breaks the streak. The routine that survives is the one where breaking the streak is not a catastrophe.' },
      { t: 'p', c: 'The rule that works: never miss twice. Miss a day, fine, life happened. Just do not let one skip become three, because three is where a routine quietly dies and does not come back. Missing once is a blip. Missing twice is the start of a story you tell yourself about how you fell off. Cut the story off at one.' },
      { t: 'p', c: 'And on the truly awful days, do a shrunk version instead of nothing. Two minutes. One or two movements. The point on those days is not the training effect, it is keeping the habit alive so it is still there when your week calms down. A tiny session protects the streak. Zero breaks it.' },
      { t: 'h2', c: 'Track it so it is real' },
      { t: 'p', c: 'The last piece is feedback, because effort with no visible result fades fast.' },
      { t: 'p', c: 'You want some way to see that the work is working. When range opens up or your two sides even out or the motion just feels smoother, that is the payoff that keeps you going, and it is much more motivating when you can actually see it move rather than vaguely hope it did. A periodic scan gives you that. It turns "I think this is helping" into a number that either moved or did not, and a number that moved is one of the better reasons to do the routine again tomorrow.' },
      { t: 'p', c: 'So the keepable routine looks like this. Short enough for your worst day. Glued to a habit you already have. Responsive to what your body currently needs. Forgiving of one miss but never two. And visibly working, so you can see the point. Notice that only one of those is about the exercises themselves. The rest is design, and design is what adherence actually comes down to.' },
      { t: 'p', c: 'The guided sessions are built around these ideas, short, structured, and tied to what your scans show. If you want a routine that adjusts to you instead of a list you will abandon, Purchase a Plan and start with a scan so the first session already fits.' }
    ]
  },
  {
    slug: 'what-4d-movement-means',
    title: 'Movement is a path, not a pose: what the fourth dimension adds',
    dek: '"4D" is just space plus time. Reading movement across time, instead of as frozen poses, is what makes watching your own replay change how you move.',
    read: '6 min read', viz: 'fourd',
    blocks: [
      { t: 'p', c: '"4D" is the kind of phrase that makes you suspicious, and you are right to be. Most of the time it means nothing. So here is the plain version, no mystery. The fourth dimension is time. Three dimensions describe where your body is in space. The fourth adds when, which means how that position changes from one instant to the next. Movement is not a shape. It is a shape moving, and the moving part is the whole point.' },
      { t: 'h2', c: 'Why a pose is not a movement' },
      { t: 'p', c: 'Think about how movement usually gets analyzed. Someone takes a photo of you at the bottom of a squat, or you freeze in front of a mirror to check your form. Both capture a single instant. Both throw away the thing that actually matters.' },
      { t: 'p', c: 'Because the interesting part of a squat is not the bottom position. It is the path you took to get there and the path back up. Where you sped up, where you stalled, where one hip shifted to compensate as you descended, where the whole thing got wobbly near the end of the range. A photo cannot show any of that. It froze time, and time was the information. This is the difference between a snapshot and a story, and movement is always a story.' },
      { t: 'p', c: 'That is what reading movement in four dimensions means. Not a series of frozen positions checked one at a time, but the continuous path your body travels through space over the seconds the movement takes. The same idea sits behind the old BioVirtua line about telehealth in four dimensions. Space plus time, read together, because reading them apart loses the part that counts.' },
      { t: 'h2', c: 'What time reveals that space hides' },
      { t: 'p', c: 'Once you track movement across time, things show up that a static check simply cannot catch.' },
      { t: 'p', c: 'Timing between your two sides, for one. Maybe both hips reach the same depth, so a photo at the bottom looks perfectly even. But one side got there a beat early and waited for the other. That is a timing difference, invisible in any single frame, obvious the moment you watch the path unfold.' },
      { t: 'p', c: 'Where control breaks down, for another. A lot of movements are fine right up until a specific point, often near the end of the range, where things get shaky. A frozen image at a random instant might miss that moment entirely, or catch it and make it look like your whole movement is rough when really it is fine until one spot. Time tells you where, exactly, along the path the trouble lives. And where is what you need to know to work on it.' },
      { t: 'h2', c: 'Why watching yourself changes what advice cannot' },
      { t: 'p', c: 'Here is the part that surprises people. Seeing your own movement play back changes how you move in a way that being told never does.' },
      { t: 'p', c: 'You can hear "you are shifting to your right side" a dozen times and not really change it, because it stays abstract. Words about your body are strangely easy to nod at and ignore. Then you watch the replay and see your own hips drift right, and something clicks that no instruction could deliver. The feedback stops being someone opinion and becomes something you observed. That is a different kind of knowing, and it tends to stick.' },
      { t: 'p', c: 'There is a reason for this. Most of us have a blurry sense of what our own body is doing mid-movement. What you feel like you are doing and what you are actually doing are often two different things, and the gap is invisible from the inside. A replay closes that gap in a second. You feel centered, the replay shows a drift, and now you can feel for the drift next time because you know it is there. Seeing recalibrates the feeling.' },
      { t: 'p', c: 'This is why the Performance plan includes 4D movement replay. Not as a gimmick, but because watching the path of your own movement, over time and from more than one angle, teaches your body something a score alone cannot. The number tells you that something shifted. The replay shows you what, and where, and lets you catch it happening.' },
      { t: 'p', c: 'So the fourth dimension is not a marketing flourish. It is just time, taken seriously, and taking time seriously is the difference between checking a pose and understanding a movement. One is a photo. The other is what your body actually did.' },
      { t: 'p', c: 'BioVirtua reads and replays your movement across space and time, as a wellness and fitness tool for understanding how you move, not a medical assessment of anything. If you want to watch the path of your own movement instead of guessing at it, Purchase a Plan with replay and see what you have been missing.' }
    ]
  }
];
