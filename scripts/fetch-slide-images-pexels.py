#!/usr/bin/env python3
"""
Fetch per-slide images from Pexels for all PAI lessons.
Usage: python3 scripts/fetch-slide-images-pexels.py

- Saves progress to scripts/.pexels-progress.json so you can re-run after rate limit resets
- Outputs updated slideImages.ts when done or when limit is hit
- Rate limit: 200 req/hour (Pexels free tier)
"""

import json, os, time, urllib.request, urllib.parse

KEY = 'CthOrV1r8aqLh8DZ3XvaFCvk0x340rQCB34me4WDfhN4TdGP343zqAvD'
BASE = 'https://api.pexels.com/v1/search'
PROGRESS_FILE = os.path.join(os.path.dirname(__file__), '.pexels-progress.json')
OUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'app', 'data', 'slideImages.ts')

# ─────────────────────────────────────────────────────────────────────────────
# All slide queries: (lesson_id, slide_index, query)
# Only slides that don't already have a stop.image in the component
# ─────────────────────────────────────────────────────────────────────────────
SLIDES = [
    # ── Lesson 1 — History of AI (slides 4 & 7 only — rest have stop.image) ──
    (1, 4,  "cold winter empty research laboratory abandoned"),
    (1, 7,  "smartphone everywhere people using technology city"),

    # ── Lesson 2 — What AI Does ───────────────────────────────────────────────
    (2, 0,  "magician illusion trick performance stage"),
    (2, 1,  "child learning recognizing dogs playing park"),
    (2, 2,  "many cat photos collection internet"),
    (2, 3,  "garbage trash pollution waste"),
    (2, 4,  "empty dark room nobody inside"),
    (2, 5,  "wonder amazement fireworks crowd"),
    (2, 6,  "broken machine error failure"),
    (2, 7,  "mirror reflection society people"),

    # ── Lesson 3 — AI In Your Life ────────────────────────────────────────────
    (3, 0,  "smartphone technology everyday use"),
    (3, 1,  "social media scrolling feed phone"),
    (3, 2,  "streaming service content recommendation tv"),
    (3, 3,  "surveillance camera urban tracking"),
    (3, 4,  "advertising billboard commercial business"),
    (3, 5,  "echo chamber bubble isolation"),
    (3, 6,  "music headphones playlist discovery"),
    (3, 7,  "consumer advertising data product"),

    # ── Lesson 4 — Narrow vs General AI ──────────────────────────────────────
    (4, 0,  "diversity multiple different types collection"),
    (4, 1,  "chess board game strategy"),
    (4, 2,  "chat interface conversation screen"),
    (4, 3,  "science fiction robot humanoid"),
    (4, 4,  "crossroads decision fork road"),
    (4, 5,  "narrow focus tunnel vision"),
    (4, 6,  "progress steps approaching goal"),
    (4, 7,  "question mark philosophy thinking"),

    # ── Lesson 5 — How AI Learns ──────────────────────────────────────────────
    (5, 0,  "organic growth natural learning plant"),
    (5, 1,  "teacher student classroom supervised learning"),
    (5, 2,  "clustering groups patterns data science"),
    (5, 3,  "data labeling annotation work"),
    (5, 4,  "game reward points score"),
    (5, 5,  "error correction improvement iterate"),
    (5, 6,  "human labor data work annotation"),
    (5, 7,  "pattern matching puzzle recognition"),

    # ── Lesson 6 — What AI Gets Wrong ────────────────────────────────────────
    (6, 0,  "overconfident wrong answer mistake"),
    (6, 1,  "hallucination illusion dream distortion"),
    (6, 2,  "bias scale unfair justice imbalance"),
    (6, 3,  "edge unusual extreme case"),
    (6, 4,  "data flood overwhelming information"),
    (6, 5,  "trust automation blind faith"),
    (6, 6,  "accident failure real world consequence"),
    (6, 7,  "accountability responsibility gap void"),

    # ── Lesson 7 — What Is AI? ────────────────────────────────────────────────
    (7, 0,  "philosophy question ancient thinking"),
    (7, 1,  "knowledge certainty facts books"),
    (7, 2,  "unknown mystery fog uncertainty"),
    (7, 3,  "tool hammer hand craft"),
    (7, 4,  "mind consciousness brain abstract"),
    (7, 5,  "conversation two people dialogue"),
    (7, 6,  "decision impact society future"),
    (7, 7,  "horizon new beginning sunrise chapter"),

    # ── Lesson 8 — What Is A Neural Network ──────────────────────────────────
    (8, 0,  "mathematics formula equations board"),
    (8, 1,  "brain neurons biology microscope"),
    (8, 2,  "network nodes connections diagram"),
    (8, 3,  "layers stack depth architecture"),
    (8, 4,  "brain vs computer comparison"),
    (8, 5,  "numbers data weights parameters"),
    (8, 6,  "server processing computation technology"),
    (8, 7,  "complexity emergence simple components nature"),

    # ── Lesson 9 — How Networks Train ────────────────────────────────────────
    (9, 0,  "learning evolution organic growth"),
    (9, 1,  "forward flow arrow direction movement"),
    (9, 2,  "error signal warning red feedback"),
    (9, 3,  "backward chain reaction propagation"),
    (9, 4,  "repetition practice training exercise"),
    (9, 5,  "overfitting memorize specific narrow"),
    (9, 6,  "pattern feature learning detection"),
    (9, 7,  "self learning autonomous discovery"),

    # ── Lesson 10 — Deep Learning ─────────────────────────────────────────────
    (10, 0, "depth layers deep architecture building"),
    (10, 1, "vision hierarchy features layers"),
    (10, 2, "breakthrough moment turning point"),
    (10, 3, "gpu graphics processor chip hardware"),
    (10, 4, "transfer knowledge share adapt"),
    (10, 5, "diminishing returns excess limitations"),
    (10, 6, "image recognition capability impressive"),
    (10, 7, "abstract representation hierarchy"),

    # ── Lesson 11 — How ChatGPT Works ────────────────────────────────────────
    (11, 0, "robot mask thinking illusion"),
    (11, 1, "internet text data massive library"),
    (11, 2, "transformer architecture technology"),
    (11, 3, "text broken pieces tokens words"),
    (11, 4, "memory forget empty blank reset"),
    (11, 5, "window frame context limited view"),
    (11, 6, "confusion hallucination wrong answer"),
    (11, 7, "imitation mimic pattern language"),

    # ── Lesson 12 — Recommendation Algorithms ────────────────────────────────
    (12, 0, "data profile identity digital"),
    (12, 1, "collaborative group users similar"),
    (12, 2, "content analysis similarity matching"),
    (12, 3, "engagement trap phone addicted scrolling"),
    (12, 4, "cold start empty new blank"),
    (12, 5, "bubble isolation filter chamber"),
    (12, 6, "everywhere surveillance no escape"),
    (12, 7, "attention economy advertising value"),

    # ── Lesson 13 — Computer Vision ──────────────────────────────────────────
    (13, 0, "camera lens seeing photography"),
    (13, 1, "pixel grid image data resolution"),
    (13, 2, "filter convolution pattern detection"),
    (13, 3, "misidentification error wrong recognition"),
    (13, 4, "medical scan diagnosis imaging"),
    (13, 5, "facial recognition biometric scan"),
    (13, 6, "object detection scene understanding"),
    (13, 7, "world pixels data representation"),

    # ── Lesson 14 — The Black Box Problem ────────────────────────────────────
    (14, 0, "black box mystery inside unknown"),
    (14, 1, "transparent glass explanation clarity"),
    (14, 2, "unusual engineering challenge design"),
    (14, 3, "medical legal decision high stakes"),
    (14, 4, "european parliament regulation law"),
    (14, 5, "heatmap visualization highlight saliency"),
    (14, 6, "partial solution band-aid limited"),
    (14, 7, "power electricity without control"),

    # ── Lesson 15 — When Decisions Go Wrong ──────────────────────────────────
    (15, 0, "scale large system automation factory"),
    (15, 1, "government welfare scandal injustice"),
    (15, 2, "criminal justice courtroom system"),
    (15, 3, "fast error scale automation speed"),
    (15, 4, "feedback loop cycle reinforce"),
    (15, 5, "surface fix band-aid solution"),
    (15, 6, "responsibility accountability person"),
    (15, 7, "control system power governance"),

    # ── Lesson 16 — AI and Jobs ───────────────────────────────────────────────
    (16, 0, "factory automation robot replace worker"),
    (16, 1, "empty office desk abandoned jobs"),
    (16, 2, "office work automation technology"),
    (16, 3, "white collar knowledge work desk"),
    (16, 4, "retraining worker skills education"),
    (16, 5, "human touch care creativity hands"),
    (16, 6, "transition change economy disruption"),
    (16, 7, "income inequality distribution economy"),

    # ── Lesson 17 — AI and Creativity ────────────────────────────────────────
    (17, 0, "ai generated art image creation"),
    (17, 1, "generative art painting creation"),
    (17, 2, "music writing creative studio"),
    (17, 3, "creativity human inspiration art studio"),
    (17, 4, "copyright art training data question"),
    (17, 5, "artist tool collaboration creative"),
    (17, 6, "disruption creative industry change"),
    (17, 7, "authorship signature art ownership"),

    # ── Lesson 18 — AI and Privacy ────────────────────────────────────────────
    (18, 0, "data collection privacy input"),
    (18, 1, "surveillance camera urban everywhere"),
    (18, 2, "aggregation combine data mosaic"),
    (18, 3, "consent terms conditions small print"),
    (18, 4, "data sharing third party broker"),
    (18, 5, "delete erase digital forget"),
    (18, 6, "surveillance society no privacy"),
    (18, 7, "privacy freedom power autonomy"),

    # ── Lesson 19 — AI and Healthcare ────────────────────────────────────────
    (19, 0, "medical data healthcare records"),
    (19, 1, "doctor diagnosis medical imaging"),
    (19, 2, "drug discovery laboratory research"),
    (19, 3, "healthcare access inequality gap"),
    (19, 4, "medical liability malpractice"),
    (19, 5, "mental health therapy support"),
    (19, 6, "patient consent medical privacy"),
    (19, 7, "healthcare benefit equity distribution"),

    # ── Lesson 20 — AI and Education ─────────────────────────────────────────
    (20, 0, "personalized learning student laptop"),
    (20, 1, "tutoring teaching student screen"),
    (20, 2, "academic integrity homework plagiarism"),
    (20, 3, "education purpose meaning classroom"),
    (20, 4, "inequality digital divide students"),
    (20, 5, "teacher classroom technology tool"),
    (20, 6, "diploma degree credential value"),
    (20, 7, "critical thinking skills future"),

    # ── Lesson 21 — AI and Democracy ─────────────────────────────────────────
    (21, 0, "information power newspaper media"),
    (21, 1, "fake news disinformation spread"),
    (21, 2, "deepfake face manipulation video"),
    (21, 3, "truth verification fact check"),
    (21, 4, "political targeting manipulation ads"),
    (21, 5, "viral spread social media amplification"),
    (21, 6, "democracy debate public square"),
    (21, 7, "trust foundation society"),

    # ── Lesson 22 — AI and Science ────────────────────────────────────────────
    (22, 0, "science research laboratory discovery"),
    (22, 1, "protein molecule biology structure"),
    (22, 2, "drug pharmaceutical molecule research"),
    (22, 3, "scientific paper peer review"),
    (22, 4, "satellite earth climate atmosphere"),
    (22, 5, "crystal material structure"),
    (22, 6, "scientist human creativity hypothesis"),
    (22, 7, "telescope instrument discovery science"),

    # ── Lesson 23 — AI and Daily Life ────────────────────────────────────────
    (23, 0, "invisible technology everyday background"),
    (23, 1, "gps navigation maps route car"),
    (23, 2, "shopping recommendation ecommerce"),
    (23, 3, "algorithm decision automated life"),
    (23, 4, "convenience privacy trade off"),
    (23, 5, "wearable healthcare monitor watch"),
    (23, 6, "morning routine smartphone daily"),
    (23, 7, "conscious choice control agency"),

    # ── Lesson 24 — What Is Ethics ───────────────────────────────────────────
    (24, 0, "ethics philosophy books library"),
    (24, 1, "consequences outcome scale balance"),
    (24, 2, "rules law principles document"),
    (24, 3, "virtue character person ethics"),
    (24, 4, "edge case failure limitation"),
    (24, 5, "urgent scale decision millions people"),
    (24, 6, "trolley dilemma choice decision"),
    (24, 7, "application real world ethics"),

    # ── Lesson 25 — The Bias Problem ──────────────────────────────────────────
    (25, 0, "data bias history world"),
    (25, 1, "hiring resume job interview"),
    (25, 2, "facial recognition bias technology"),
    (25, 3, "unintentional bias systemic"),
    (25, 4, "feedback loop reinforce cycle"),
    (25, 5, "healthcare disparity inequality"),
    (25, 6, "audit testing inspection system"),
    (25, 7, "fairness definition justice scale"),

    # ── Lesson 26 — The Consent Problem ──────────────────────────────────────
    (26, 0, "consent signature agreement document"),
    (26, 1, "terms service click agree interface"),
    (26, 2, "data repurpose secondary use"),
    (26, 3, "fine print hidden information"),
    (26, 4, "children online protection screen"),
    (26, 5, "medical records data privacy"),
    (26, 6, "opt out choice privacy"),
    (26, 7, "identity data personal self"),

    # ── Lesson 27 — The Accountability Gap ───────────────────────────────────
    (27, 0, "accountability source responsibility"),
    (27, 1, "criminal justice system algorithm"),
    (27, 2, "autonomous car accident street"),
    (27, 3, "distributed responsibility team"),
    (27, 4, "law court legal system"),
    (27, 5, "whistleblower accountability exposed"),
    (27, 6, "liability payment responsibility"),
    (27, 7, "accountability design system built"),

    # ── Lesson 28 — The Transparency Paradox ─────────────────────────────────
    (28, 0, "transparency glass window light"),
    (28, 1, "documentation card report specification"),
    (28, 2, "trade secret proprietary closed lock"),
    (28, 3, "gaming exploit system loophole"),
    (28, 4, "meaningful disclosure information"),
    (28, 5, "audit inspection examination"),
    (28, 6, "user knowledge limitation screen"),
    (28, 7, "explanation right human"),

    # ── Lesson 29 — Autonomy and Manipulation ────────────────────────────────
    (29, 0, "autonomy freedom choice independence"),
    (29, 1, "nudge influence choice architecture"),
    (29, 2, "dark pattern deceptive design interface"),
    (29, 3, "persuasion influence line"),
    (29, 4, "scale millions influence advertising"),
    (29, 5, "recommendation loop behavior change"),
    (29, 6, "profiling personal data behavior tracking"),
    (29, 7, "boundary ethics consent line"),

    # ── Lesson 30 — The Alignment Problem ────────────────────────────────────
    (30, 0, "specification goal define problem"),
    (30, 1, "reward gaming exploit hack"),
    (30, 2, "metric goal proxy measurement"),
    (30, 3, "alignment complexity challenge unsolved"),
    (30, 4, "hidden deception strategy"),
    (30, 5, "paperclip factory production extreme"),
    (30, 6, "helpful wrong misaligned robot"),
    (30, 7, "values embedded foundation system"),

    # ── Lesson 31 — Who Decides ───────────────────────────────────────────────
    (31, 0, "power corporate technology decision"),
    (31, 1, "tech company headquarters building"),
    (31, 2, "government regulation policy capitol"),
    (31, 3, "market default capitalism decision"),
    (31, 4, "international cooperation summit meeting"),
    (31, 5, "civil society protest advocacy"),
    (31, 6, "individual action vote choice"),
    (31, 7, "democracy accountability government"),

    # ── Lesson 32 — Where We Are Now ─────────────────────────────────────────
    (32, 0, "current state technology baseline"),
    (32, 1, "fast pace acceleration technology curve"),
    (32, 2, "early beginning growth curve exponential"),
    (32, 3, "breakthrough milestone achievement"),
    (32, 4, "gap missing capability limitation"),
    (32, 5, "launch product inflection point"),
    (32, 6, "ai everywhere technology pervasive"),
    (32, 7, "ceiling exceeded beyond limit"),

    # ── Lesson 33 — The Road to AGI ───────────────────────────────────────────
    (33, 0, "general intelligence definition concept"),
    (33, 1, "gap current limitation bridge"),
    (33, 2, "science fiction robot versus reality"),
    (33, 3, "scaling exponential graph growth"),
    (33, 4, "debate disagreement argument discussion"),
    (33, 5, "timeline uncertainty prediction"),
    (33, 6, "possibility future scenario"),
    (33, 7, "important decision future question"),

    # ── Lesson 34 — The Alignment Crisis ─────────────────────────────────────
    (34, 0, "alignment problem core danger warning"),
    (34, 1, "gaming specification reward loop"),
    (34, 2, "deception hidden strategy"),
    (34, 3, "unknown unsolved challenge research"),
    (34, 4, "alignment research laboratory safety"),
    (34, 5, "constitution principles rules document"),
    (34, 6, "critical urgent stakes warning"),
    (34, 7, "window opportunity time closing"),

    # ── Lesson 35 — AI and Existential Risk ──────────────────────────────────
    (35, 0, "existential risk threat warning"),
    (35, 1, "misalignment danger scenario"),
    (35, 2, "power concentration control monopoly"),
    (35, 3, "skeptical dismissal doubt"),
    (35, 4, "researcher warning serious concern"),
    (35, 5, "nuclear bomb mushroom cloud"),
    (35, 6, "wrong path catastrophe danger"),
    (35, 7, "precaution careful prevention protection"),

    # ── Lesson 36 — Regulation and Governance ────────────────────────────────
    (36, 0, "governance regulation policy exist"),
    (36, 1, "european parliament building regulation"),
    (36, 2, "united states government policy building"),
    (36, 3, "regulation lag behind technology"),
    (36, 4, "global coordination international map"),
    (36, 5, "self regulation industry voluntary"),
    (36, 6, "good governance democratic"),
    (36, 7, "democratic deficit participation"),

    # ── Lesson 37 — AI and Human Identity ────────────────────────────────────
    (37, 0, "human identity work purpose meaning"),
    (37, 1, "cognitive offloading memory phone"),
    (37, 2, "creativity identity human unique art"),
    (37, 3, "industrial revolution history analogy"),
    (37, 4, "consciousness mind question philosophy"),
    (37, 5, "relationship human robot interaction"),
    (37, 6, "coexistence human ai future"),
    (37, 7, "human unique irreplaceable hands"),

    # ── Lesson 38 — What Your Generation Inherits ────────────────────────────
    (38, 0, "generation young people future"),
    (38, 1, "future world transformed different"),
    (38, 2, "unique generation responsibility"),
    (38, 3, "decisions present now being made"),
    (38, 4, "young people technology innovation"),
    (38, 5, "skills future learning adaptable"),
    (38, 6, "warning caution wrong path"),
    (38, 7, "inheritance responsibility unfinished"),

    # ── Lesson 39 — What You Do Next ─────────────────────────────────────────
    (39, 0, "conclusion ending chapter close"),
    (39, 1, "learning achievement knowledge"),
    (39, 2, "knowledge action responsibility"),
    (39, 3, "career path future roles"),
    (39, 4, "next steps pathway forward"),
    (39, 5, "reading learning ongoing informed"),
    (39, 6, "small action change impact"),
    (39, 7, "open future possibility write"),

    # ── Lesson 40 — The Math Behind A Neuron ─────────────────────────────────
    (40, 0, "single point light minimal abstract"),
    (40, 1, "mathematics weighted sum equation chalkboard"),
    (40, 2, "balance scale weight measurement"),
    (40, 3, "lever fulcrum balance physics"),
    (40, 4, "electric switch toggle on off"),
    (40, 5, "curved wave nonlinear path nature"),
    (40, 6, "boundary line divide two sides"),
    (40, 7, "stacking layers building blocks composition"),

    # ── Lesson 41 — Forward Propagation ──────────────────────────────────────
    (41, 0, "river flowing forward water current"),
    (41, 1, "camera sensor pixel grid closeup"),
    (41, 2, "transparent glass layers stacked"),
    (41, 3, "signal wave abstract visualization"),
    (41, 4, "neural connections brain abstract"),
    (41, 5, "display screen output result"),
    (41, 6, "chat typing screen interface"),
    (41, 7, "abstract pattern recognition visual"),

    # ── Lesson 42 — Loss Functions ────────────────────────────────────────────
    (42, 0, "measurement error gauge instrument"),
    (42, 1, "graph statistics chart mathematics"),
    (42, 2, "probability curve distribution"),
    (42, 3, "compass direction target optimization"),
    (42, 4, "mountain landscape terrain aerial"),
    (42, 5, "pruning garden minimalism clean"),
    (42, 6, "text language words flowing"),
    (42, 7, "target goal specification blueprint"),

    # ── Lesson 43 — Backpropagation In Detail ────────────────────────────────
    (43, 0, "feedback loop cycle mechanism"),
    (43, 1, "hiking descent mountain slope path"),
    (43, 2, "chain links connected metal close"),
    (43, 3, "debate controversy two sides"),
    (43, 4, "random sampling selection"),
    (43, 5, "race track speed optimization"),
    (43, 6, "factory assembly production step"),
    (43, 7, "accountability responsibility person"),

    # ── Lesson 44 — Activation Functions ─────────────────────────────────────
    (44, 0, "electrical circuit switch power"),
    (44, 1, "smooth S-curve wave"),
    (44, 2, "threshold cutoff cliff edge"),
    (44, 3, "pie chart probability distribution"),
    (44, 4, "smooth gradient blur soft"),
    (44, 5, "design tools creative workshop"),
    (44, 6, "assembly components transformer"),
    (44, 7, "inductive bias assumption hypothesis"),

    # ── Lesson 45 — Attention Mechanisms ─────────────────────────────────────
    (45, 0, "revolution spark breakthrough moment"),
    (45, 1, "reading text book focus highlight"),
    (45, 2, "key lock search query"),
    (45, 3, "scaling measurement proportion"),
    (45, 4, "multiple perspectives viewpoints"),
    (45, 5, "expensive cost price tag"),
    (45, 6, "chatgpt interface typing screen"),
    (45, 7, "context surrounding environment landscape"),

    # ── Lesson 46 — The Transformer Architecture ──────────────────────────────
    (46, 0, "architecture city skyline buildings"),
    (46, 1, "translation language dictionary"),
    (46, 2, "position order sequence numbered"),
    (46, 3, "layer cake stacked structure"),
    (46, 4, "memory storage archive database"),
    (46, 5, "scale vast panoramic emergence"),
    (46, 6, "evolution comparison before after"),
    (46, 7, "hypothesis experiment science testing"),

    # ── Lesson 47 — Training At Scale ────────────────────────────────────────
    (47, 0, "industrial factory large scale production"),
    (47, 1, "temperature dial schedule adjustment"),
    (47, 2, "stabilize balance level surface"),
    (47, 3, "random dots particles sparse"),
    (47, 4, "quality selection filtering curating"),
    (47, 5, "distributed network connected nodes"),
    (47, 6, "refinement polish gemstone"),
    (47, 7, "frontier edge cliff landscape horizon"),

    # ── Lesson 48 — How To Think About Prompts ───────────────────────────────
    (48, 0, "writing desk pen paper thoughtful"),
    (48, 1, "context surrounding background environment"),
    (48, 2, "crystal ball fortune teller prediction"),
    (48, 3, "contractor builder instructions work"),
    (48, 4, "hierarchy levels structure layers"),
    (48, 5, "iteration loop cycle improvement"),
    (48, 6, "wrong tool mismatch problem"),
    (48, 7, "language interface technology words"),

    # ── Lesson 49 — Prompt Engineering ───────────────────────────────────────
    (49, 0, "toolbox tools collection workshop"),
    (49, 1, "examples demonstration samples"),
    (49, 2, "step by step reasoning notes"),
    (49, 3, "costume role theater mask actor"),
    (49, 4, "structured format grid template"),
    (49, 5, "thermometer temperature control"),
    (49, 6, "combining mixing ingredients recipe"),
    (49, 7, "code programming keyboard screen"),

    # ── Lesson 50 — Working With APIs ────────────────────────────────────────
    (50, 0, "connection interface plug socket"),
    (50, 1, "terminal command line code dark"),
    (50, 2, "coins tokens payment cost"),
    (50, 3, "window frame view perspective"),
    (50, 4, "stream flowing text live"),
    (50, 5, "speed limit sign road"),
    (50, 6, "selection choice decision fork"),
    (50, 7, "infrastructure bridge road engineering"),

    # ── Lesson 51 — Retrieval Augmented Generation ───────────────────────────
    (51, 0, "confusion fog blur uncertain hallucination"),
    (51, 1, "search retrieve find document"),
    (51, 2, "vector space abstract geometric"),
    (51, 3, "pipeline flow process steps"),
    (51, 4, "comparison choice two paths"),
    (51, 5, "cutting dividing pieces puzzle"),
    (51, 6, "failure error broken system"),
    (51, 7, "anchor ground roots stability"),

    # ── Lesson 52 — Fine-Tuning ───────────────────────────────────────────────
    (52, 0, "sculptor clay shaping refinement"),
    (52, 1, "customer service specialized work"),
    (52, 2, "data collection preparation training"),
    (52, 3, "sledgehammer nail overkill"),
    (52, 4, "human feedback rating review"),
    (52, 5, "erasing whiteboard memory forget"),
    (52, 6, "before after comparison test"),
    (52, 7, "layers stack technology architecture"),

    # ── Lesson 53 — AI Agents ─────────────────────────────────────────────────
    (53, 0, "robot autonomous action movement"),
    (53, 1, "tools toolkit hands working"),
    (53, 2, "thinking reasoning action loop"),
    (53, 3, "maze complexity challenge problem"),
    (53, 4, "memory organization filing system"),
    (53, 5, "team collaboration multiple working"),
    (53, 6, "situation analysis decision making"),
    (53, 7, "control panel supervision monitoring"),

    # ── Lesson 54 — Evaluating AI Systems ────────────────────────────────────
    (54, 0, "measuring ruler scale precision"),
    (54, 1, "test samples collection testing"),
    (54, 2, "types categories classification sorting"),
    (54, 3, "target goal specific aim benchmark"),
    (54, 4, "regression analysis data comparison"),
    (54, 5, "gaming system loophole metric"),
    (54, 6, "safety testing red team security"),
    (54, 7, "continuous improvement cycle quality"),

    # ── Lesson 55 — Responsible Building ─────────────────────────────────────
    (55, 0, "decision crossroads responsibility"),
    (55, 1, "failure analysis crash inspection"),
    (55, 2, "warning danger worst case scenario"),
    (55, 3, "safety testing laboratory protection"),
    (55, 4, "policy document rules guidelines"),
    (55, 5, "transparency glass clear visible"),
    (55, 6, "deployment launch ship product"),
    (55, 7, "responsibility accountability person hands"),

    # ── Lesson 56 — Multimodal AI ─────────────────────────────────────────────
    (56, 0, "multiple media text image audio screens"),
    (56, 1, "camera eye vision analysis"),
    (56, 2, "microphone voice audio recording"),
    (56, 3, "video film editing complex"),
    (56, 4, "robot sensor physical interaction"),
    (56, 5, "screenshot code interface design"),
    (56, 6, "unified whole integration merge"),
    (56, 7, "world perception senses experience"),

    # ── Lesson 57 — AI Agents At Scale ───────────────────────────────────────
    (57, 0, "evolution progression chatbot agent"),
    (57, 1, "code github development programming"),
    (57, 2, "research synthesis report analysis"),
    (57, 3, "reliability consistent performance quality"),
    (57, 4, "long road horizon distance far"),
    (57, 5, "economy market network trading"),
    (57, 6, "human computer collaboration teamwork"),
    (57, 7, "change transformation shift future"),

    # ── Lesson 58 — Frontier Models ───────────────────────────────────────────
    (58, 0, "frontier edge boundary explore"),
    (58, 1, "evolution next generation advancement"),
    (58, 2, "potential hidden unexplored capability"),
    (58, 3, "size scale comparison small large"),
    (58, 4, "specialist expert team assembly"),
    (58, 5, "speed fast efficient deployment"),
    (58, 6, "deep thinking contemplation reasoning"),
    (58, 7, "trajectory arc upward growth exponential"),

    # ── Lesson 59 — AI and Science ────────────────────────────────────────────
    (59, 0, "scientific instrument telescope microscope"),
    (59, 1, "protein molecule biology structure"),
    (59, 2, "crystal material structure laboratory"),
    (59, 3, "hypothesis idea discovery light"),
    (59, 4, "satellite earth climate atmosphere"),
    (59, 5, "medicine drug molecular pharmaceutical"),
    (59, 6, "reproducibility peer review science"),
    (59, 7, "time acceleration fast clock"),

    # ── Lesson 60 — Robotics and Embodied AI ─────────────────────────────────
    (60, 0, "robot body physical form"),
    (60, 1, "robot training learning movement"),
    (60, 2, "messy real world environment chaos"),
    (60, 3, "virtual simulation digital world"),
    (60, 4, "robotic hand grasping object"),
    (60, 5, "humanoid robot walking figure"),
    (60, 6, "factory worker automation labor"),
    (60, 7, "loop cycle physical digital connection"),

    # ── Lesson 61 — AI Safety Research ───────────────────────────────────────
    (61, 0, "research emerging new field"),
    (61, 1, "inside transparent neural network"),
    (61, 2, "shield protection robust strong"),
    (61, 3, "race competition running speed"),
    (61, 4, "oversight supervision watching monitor"),
    (61, 5, "evaluation testing complex difficult"),
    (61, 6, "constitution document principles rules"),
    (61, 7, "window opportunity time limited"),

    # ── Lesson 62 — The Geopolitics Of AI ────────────────────────────────────
    (62, 0, "chess strategy power geopolitics"),
    (62, 1, "competition flags racing rivals"),
    (62, 2, "concentration power centralized"),
    (62, 3, "military defense technology"),
    (62, 4, "drone warfare autonomous"),
    (62, 5, "governance gap policy void"),
    (62, 6, "democracy vote election concern"),
    (62, 7, "geopolitical power world map"),

    # ── Lesson 63 — What Comes Next ───────────────────────────────────────────
    (63, 0, "fog mist uncertainty horizon"),
    (63, 1, "timeline progress evolution years"),
    (63, 2, "prediction wrong forecast"),
    (63, 3, "three paths diverge forest"),
    (63, 4, "economy transformation industry change"),
    (63, 5, "future intelligence possibility"),
    (63, 6, "action responsibility engage"),
    (63, 7, "conversation continuing dialogue future"),

    # ── Elementary Lesson 101 — Hi! I'm PAI ──────────────────────────────────
    (101, 0, "friendly robot assistant computer tablet child"),
    (101, 1, "mathematician code puzzle wartime codebreaker"),
    (101, 2, "typing messages text conversation two people"),
    (101, 3, "question mark mystery thinking child curious"),
    (101, 4, "fast speed lightning technology bright"),

    # ── Elementary Lesson 102 — PAI and the World ────────────────────────────
    (102, 0, "teamwork human collaboration workplace together"),
    (102, 1, "child drawing painting creative colorful art"),
    (102, 2, "lock privacy door secure protection"),
    (102, 3, "doctor stethoscope hospital helping patient"),
    (102, 4, "student reading classroom learning school"),
    (102, 5, "fake news camera misinformation media screen"),
    (102, 6, "scientist laboratory research discovery microscope"),
    (102, 7, "child smartphone everyday technology curious"),

    # ── Elementary Lesson 103 — Is PAI Always Right? ─────────────────────────
    (103, 0, "child decision choice right wrong path"),
    (103, 1, "fairness balance scale equality children"),
    (103, 2, "accountability responsibility person adult"),
    (103, 3, "confused mystery unknown thinking person"),
    (103, 4, "choice decision freedom influence options"),
    (103, 5, "misunderstanding communication instructions literal"),
    (103, 6, "government people voting community decision"),

    # ── Elementary Lesson 104 — The Future of PAI ────────────────────────────
    (104, 0, "evolution progress growth transformation timeline"),
    (104, 1, "future horizon bright possibility light"),
    (104, 2, "error mistake consequence broken machine"),
    (104, 3, "fire danger safety dual nature warmth"),
    (104, 4, "rules law signs regulations road"),
    (104, 5, "unique human authentic individual person"),
    (104, 6, "children future hope opportunity growing"),
    (104, 7, "proud achievement learning success graduate child"),

    # ── Elementary Lessons 111–118 — How PAI Thinks (K–2) ───────────────────
    (111, 0, "brain network connections neurons illustration"),
    (112, 0, "child practicing basketball sport learning improving"),
    (113, 0, "repetition practice skill sport getting better"),
    (114, 0, "conversation talking words communication friendly"),
    (115, 0, "recommendation suggestion showing options choice"),
    (116, 0, "camera eye vision seeing photo recognition"),
    (117, 0, "mystery box inside unknown curiosity"),
    (118, 0, "mistake error correction fixing learning"),

    # ── Elementary Lessons 121–128 — How PAI Thinks (3–5) ───────────────────
    (121, 0, "brain network connections neurons computing"),
    (122, 0, "child learning sport practice improvement progress"),
    (123, 0, "skill practice repetition getting better athlete"),
    (124, 0, "conversation dialogue words typing communication"),
    (125, 0, "personalized recommendation feed content showing"),
    (126, 0, "computer vision camera recognition image scan"),
    (127, 0, "complex system inside unknown black box"),
    (128, 0, "error correction feedback loop improvement system"),

    # ── Middle School W201 — What Is AI? (lessons 211-218) ───────────────────
    (211, 0, "artificial intelligence robot definition concept"),
    (211, 1, "machine learning data training neural"),
    (211, 2, "alan turing chess thinking machine historical"),
    (211, 3, "robot limitation what cannot do impossible"),
    (211, 4, "smartphone AI assistant daily life technology"),
    (211, 5, "history timeline AI computer old technology"),
    (211, 6, "software engineer programmer building AI"),
    (211, 7, "types artificial intelligence categories"),
    (212, 0, "neural network brain connections neurons"),
    (212, 1, "training data learning model AI"),
    (212, 2, "deep learning layers architecture tech"),
    (212, 3, "language model text generation writing"),
    (212, 4, "algorithm recommendation feed social media"),
    (212, 5, "computer vision camera recognition scanning"),
    (212, 6, "black box mysterious unknown inside system"),
    (212, 7, "decision wrong error mistake consequence"),
    (213, 0, "jobs automation factory robot workers"),
    (213, 1, "art creativity music AI generated"),
    (213, 2, "surveillance camera privacy tracking city"),
    (213, 3, "hospital healthcare AI doctor diagnosis"),
    (213, 4, "classroom education students learning technology"),
    (213, 5, "vote election democracy politics information"),
    (213, 6, "science research laboratory discovery AI"),
    (213, 7, "city urban life technology everyday people"),
    (214, 0, "ethics philosophy balance scale justice"),
    (214, 1, "bias discrimination unfair inequality"),
    (214, 2, "consent privacy data permission agreement"),
    (214, 3, "accountability responsibility blame consequence"),
    (214, 4, "transparency open glass clear honest"),
    (214, 5, "manipulation influence persuasion mind"),
    (214, 6, "alignment control goal values robot"),
    (214, 7, "decision power governance who decides"),
    (215, 0, "future jobs work automation long term"),
    (215, 1, "creative work art music future AI"),
    (215, 2, "inequality gap rich poor digital divide"),
    (215, 3, "global power nations competition geopolitics"),
    (215, 4, "climate change environment energy AI"),
    (215, 5, "humans living with AI technology coexistence"),
    (215, 6, "future horizon technology innovation next"),

    # ── Middle School W202-W205 same-world variant (lessons 221-258) ─────────
    (221, 0, "neural network brain connections neurons diagram"),
    (221, 1, "data training machine learning process"),
    (221, 2, "deep learning architecture layers tech diagram"),
    (221, 3, "natural language processing text AI"),
    (221, 4, "recommendation engine algorithm social media"),
    (221, 5, "computer vision object recognition camera"),
    (221, 6, "explainability black box AI mystery"),
    (221, 7, "AI decision wrong bias consequence"),
    (222, 0, "society community people technology impact"),
    (222, 1, "creativity art generated technology"),
    (222, 2, "privacy data personal information security"),
    (222, 3, "medicine healthcare AI assistance"),
    (222, 4, "education learning students AI tools"),
    (222, 5, "democracy information news fake media"),
    (222, 6, "climate science data analysis AI"),
    (222, 7, "daily life digital technology modern"),
    (223, 0, "ethics moral philosophy balance"),
    (223, 1, "algorithmic bias unfair racial data"),
    (223, 2, "privacy consent data collection surveillance"),
    (223, 3, "responsibility accountability system error"),
    (223, 4, "transparency open government corporate"),
    (223, 5, "manipulation dark patterns persuasion"),
    (223, 6, "AI alignment safety control problem"),
    (223, 7, "regulation policy law governance AI"),
    (224, 0, "future automation jobs displacement"),
    (224, 1, "digital art creativity AI generation"),
    (224, 2, "inequality access technology education divide"),
    (224, 3, "global power AI race nations competition"),
    (224, 4, "environment climate sustainability energy"),
    (224, 5, "human AI collaboration coexistence future"),
    (224, 6, "emerging technology innovation horizon"),
    (224, 7, "challenge opportunity next generation"),
    (225, 0, "AI definition intelligence machine concept"),
    (225, 1, "learning training data knowledge AI"),
    (225, 2, "history evolution computer AI progress"),
    (225, 3, "capability limitation robot realistic"),
    (225, 4, "everyday technology phone apps AI"),
    (225, 5, "research lab scientist AI development"),
    (225, 6, "team diversity building technology"),
    (225, 7, "types classification AI narrow general"),
    (226, 0, "network pattern recognition neurons brain"),
    (226, 1, "data set training machine learning input"),
    (226, 2, "deep learning complex system layers"),
    (226, 3, "language model text predict writing AI"),
    (226, 4, "algorithm feed personalized content"),
    (226, 5, "vision recognition camera image object"),
    (226, 6, "unexplainable system process opaque"),
    (226, 7, "consequence decision error automated"),
    (227, 0, "AI society community impact people"),
    (227, 1, "creative technology art tool AI"),
    (227, 2, "digital privacy data protection"),
    (227, 3, "healthcare hospital AI diagnosis scan"),
    (227, 4, "school technology learning modern"),
    (227, 5, "news media information democracy digital"),
    (227, 6, "scientific research AI acceleration"),
    (227, 7, "modern life digital people technology"),
    (228, 0, "ethical dilemma choice morality question"),
    (228, 1, "unfair bias prejudice data system"),
    (228, 2, "consent privacy data agreement permission"),
    (228, 3, "accountability fault system automated error"),
    (228, 4, "open honest transparent clear glass"),
    (228, 5, "influence control behavior manipulation"),
    (228, 6, "alignment goal value safe AI system"),
    (228, 7, "governance regulation policy power decide"),
    (231, 0, "AI job automation worker displacement future"),
    (231, 1, "art music creativity generated AI"),
    (231, 2, "poverty rich inequality digital divide access"),
    (231, 3, "world power geopolitics competition AI nations"),
    (231, 4, "environment green energy AI climate future"),
    (231, 5, "coexistence human robot future technology"),
    (231, 6, "innovation technology next generation horizon"),
    (231, 7, "hope challenge AI future opportunity"),
    (232, 0, "artificial intelligence definition brain machine"),
    (232, 1, "data training AI learning pattern"),
    (232, 2, "computing history Turing machine evolution"),
    (232, 3, "robot limitation physical task impossible AI"),
    (232, 4, "technology daily life phone assistant AI"),
    (232, 5, "AI research lab scientist progress"),
    (232, 6, "diverse team building software engineering"),
    (232, 7, "AI types narrow general specialist"),
    (233, 0, "deep neural network brain connection pattern"),
    (233, 1, "training data machine learning dataset process"),
    (233, 2, "deep learning GPU computation tech"),
    (233, 3, "chatbot language model conversation AI"),
    (233, 4, "social media algorithm recommendation system"),
    (233, 5, "image recognition camera scanning technology"),
    (233, 6, "black box opacity machine decision"),
    (233, 7, "automated decision error consequence unfair"),
    (234, 0, "AI impact society human people technology"),
    (234, 1, "creative AI art generation music tool"),
    (234, 2, "data privacy protection personal security"),
    (234, 3, "medical AI diagnosis imaging technology"),
    (234, 4, "technology education classroom digital future"),
    (234, 5, "election media democracy information AI"),
    (234, 6, "AI research science discovery acceleration"),
    (234, 7, "everyday digital life technology modern people"),
    (235, 0, "ethics values philosophy balance justice"),
    (235, 1, "AI bias discrimination data system unfair"),
    (235, 2, "data consent privacy agreement collection"),
    (235, 3, "system error accountability responsibility AI"),
    (235, 4, "transparent clear honesty open system"),
    (235, 5, "persuasion manipulation behavior influence"),
    (235, 6, "AI alignment human value control safety"),
    (235, 7, "policy regulation law governance AI"),
    (236, 0, "future work job automation AI economy"),
    (236, 1, "AI creativity generated art digital"),
    (236, 2, "digital inequality access divide global"),
    (236, 3, "geopolitics AI power nations competition global"),
    (236, 4, "climate AI sustainability energy green"),
    (236, 5, "human technology coexistence living AI future"),
    (236, 6, "technology innovation emerging next AI"),
    (236, 7, "future AI challenge opportunity next generation"),
    (237, 0, "machine learning AI intelligence concept"),
    (237, 1, "pattern data recognition AI learning"),
    (237, 2, "AI history evolution machine progress"),
    (237, 3, "AI limitation task impossible robot"),
    (237, 4, "AI daily life technology app smart"),
    (237, 5, "lab research scientist AI team"),
    (237, 6, "AI developer builder team engineering"),
    (237, 7, "narrow general AI type specialist"),
    (238, 0, "neural network layers brain structure"),
    (238, 1, "machine learning training data AI"),
    (238, 2, "deep learning data computation modern"),
    (238, 3, "language AI text generation model"),
    (238, 4, "algorithm recommendation AI feed people"),
    (238, 5, "machine vision camera recognition object"),
    (238, 6, "unexplainable AI decision opacity"),
    (238, 7, "consequence automated decision bias error"),
    (241, 0, "AI society community impact modern"),
    (241, 1, "creativity art digital generation AI"),
    (241, 2, "privacy surveillance data security protection"),
    (241, 3, "hospital medical AI healthcare imaging"),
    (241, 4, "education digital classroom AI tool"),
    (241, 5, "news media democracy fake information AI"),
    (241, 6, "science AI acceleration research discovery"),
    (241, 7, "technology daily life digital modern people"),
    (242, 0, "AI ethics philosophy moral choice"),
    (242, 1, "bias prejudice unfair data AI system"),
    (242, 2, "data collection privacy consent digital"),
    (242, 3, "responsibility accountability error AI system"),
    (242, 4, "transparency honest open clear"),
    (242, 5, "manipulation dark pattern influence behavior"),
    (242, 6, "AI safety alignment value human"),
    (242, 7, "governance power regulation AI who decide"),
    (243, 0, "future jobs work AI automation economy"),
    (243, 1, "AI art creativity generated digital"),
    (243, 2, "global inequality access technology divide"),
    (243, 3, "world power competition AI geopolitics"),
    (243, 4, "climate AI environment sustainability"),
    (243, 5, "human AI coexistence future together"),
    (243, 6, "technology innovation AI next horizon"),
    (243, 7, "AI future challenge hope opportunity"),
    (244, 0, "AI definition machine intelligence concept"),
    (244, 1, "AI data training learning pattern"),
    (244, 2, "technology evolution history AI progress"),
    (244, 3, "AI limitation impossible task robot"),
    (244, 4, "AI technology everyday life smartphone"),
    (244, 5, "research AI science laboratory progress"),
    (244, 6, "team diverse building AI technology"),
    (244, 7, "AI type specialist narrow wide"),
    (245, 0, "neural brain network connection pattern diagram"),
    (245, 1, "machine learning training data AI"),
    (245, 2, "deep learning layers GPU compute AI"),
    (245, 3, "NLP language model text AI generation"),
    (245, 4, "recommendation algorithm feed AI social"),
    (245, 5, "computer vision recognition object camera AI"),
    (245, 6, "opaque unexplained AI system black box"),
    (245, 7, "automated decision bias wrong consequence"),
    (246, 0, "AI society community technology impact people"),
    (246, 1, "creative art music AI digital generated"),
    (246, 2, "data privacy protection personal digital"),
    (246, 3, "medical healthcare AI imaging diagnosis"),
    (246, 4, "digital education student AI classroom"),
    (246, 5, "election democracy news AI fake"),
    (246, 6, "research science AI laboratory"),
    (246, 7, "modern digital life everyday technology"),
    (247, 0, "ethical philosophy AI balance justice moral"),
    (247, 1, "unfair bias AI system data racial"),
    (247, 2, "privacy consent data collection AI"),
    (247, 3, "accountability error AI system responsibility"),
    (247, 4, "transparent open honest system AI"),
    (247, 5, "dark pattern manipulation persuasion influence"),
    (247, 6, "AI alignment value safety control"),
    (247, 7, "governance regulation law AI power policy"),
    (248, 0, "future automation job AI long term"),
    (248, 1, "art creativity AI generated digital future"),
    (248, 2, "inequality access digital divide global"),
    (248, 3, "AI power global geopolitics competition"),
    (248, 4, "climate environment AI sustainability energy"),
    (248, 5, "AI human coexistence future digital life"),
    (248, 6, "future innovation emerging AI technology"),
    (248, 7, "AI opportunity challenge next generation"),
    (251, 0, "AI machine definition intelligence robot"),
    (251, 1, "AI learning data training pattern"),
    (251, 2, "history evolution AI machine computing"),
    (251, 3, "limitation task robot impossible AI"),
    (251, 4, "AI everyday smartphone life assistant"),
    (251, 5, "AI lab research development scientist"),
    (251, 6, "engineer team diverse building AI"),
    (251, 7, "AI types narrow specialist general"),
    (252, 0, "neural network brain diagram pattern"),
    (252, 1, "AI data training machine learning"),
    (252, 2, "deep learning layers computation GPU"),
    (252, 3, "language model text generation AI chatbot"),
    (252, 4, "social media recommendation AI algorithm"),
    (252, 5, "camera vision object recognition AI"),
    (252, 6, "AI black box opaque decision"),
    (252, 7, "error wrong decision automated consequence"),
    (253, 0, "society AI technology impact community"),
    (253, 1, "art creativity AI generated digital"),
    (253, 2, "privacy surveillance camera data"),
    (253, 3, "medical imaging AI diagnosis hospital"),
    (253, 4, "education technology classroom AI learning"),
    (253, 5, "democracy election media fake AI"),
    (253, 6, "research science AI laboratory discovery"),
    (253, 7, "digital life everyday people technology"),
    (254, 0, "AI ethics philosophy moral balance"),
    (254, 1, "data bias unfair discrimination system"),
    (254, 2, "privacy consent collection data digital"),
    (254, 3, "accountability AI system error responsibility"),
    (254, 4, "transparency honest open AI system"),
    (254, 5, "dark pattern manipulation behavior influence"),
    (254, 6, "AI alignment control value safety"),
    (254, 7, "governance regulation AI policy power"),
    (255, 0, "AI future economy automation work"),
    (255, 1, "creativity art music AI generation"),
    (255, 2, "inequality digital access global divide"),
    (255, 3, "geopolitics global AI competition power"),
    (255, 4, "climate sustainability AI environment"),
    (255, 5, "human AI future coexistence technology"),
    (255, 6, "innovation emerging AI technology next"),
    (255, 7, "AI opportunity challenge future generation"),
    (256, 0, "artificial intelligence concept machine"),
    (256, 1, "machine learning data AI pattern train"),
    (256, 2, "AI history timeline progress evolution"),
    (256, 3, "robot limitation task impossible AI"),
    (256, 4, "AI technology everyday modern life"),
    (256, 5, "AI lab research development science"),
    (256, 6, "diverse team building AI software"),
    (256, 7, "AI narrow general specialist type"),
    (257, 0, "brain neural network pattern connection"),
    (257, 1, "data training machine learning AI"),
    (257, 2, "deep learning GPU layers computation"),
    (257, 3, "language AI chatbot text generation"),
    (257, 4, "AI feed recommendation algorithm social"),
    (257, 5, "AI vision camera image recognition"),
    (257, 6, "AI black box unexplainable system"),
    (257, 7, "automated decision wrong error bias"),
    (258, 0, "AI future technology society impact"),
    (258, 1, "creativity AI art music digital"),
    (258, 2, "privacy protection data digital security"),
    (258, 3, "healthcare AI medical imaging diagnosis"),
    (258, 4, "AI education classroom digital student"),
    (258, 5, "democracy media election information AI"),
    (258, 6, "research science AI acceleration discovery"),
    (258, 7, "modern life everyday digital AI technology"),
]


def search_pexels(query, retries=3):
    params = urllib.parse.urlencode({
        'query': query,
        'per_page': 1,
        'orientation': 'landscape',
    })
    req = urllib.request.Request(
        f'{BASE}?{params}',
        headers={
            'Authorization': KEY,
            'User-Agent': 'Mozilla/5.0 (compatible; PAI-app/1.0)',
        }
    )
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                remaining = int(r.headers.get('X-Ratelimit-Remaining', 999))
                data = json.loads(r.read())
            photos = data.get('photos', [])
            url = photos[0]['src']['large'] if photos else None
            return url, remaining
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
                continue
            raise


def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE) as f:
            return json.load(f)
    return {}


def save_progress(done):
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(done, f)


def write_slide_images(done):
    # Build nested dict: lesson_id -> {slide_index -> url}
    result = {}
    for key, url in done.items():
        lid, sidx = map(int, key.split(':'))
        if lid not in result:
            result[lid] = {}
        result[lid][sidx] = url

    lines = ['export const SLIDE_IMAGES: Record<number, Record<number, string>> = {']
    for lid in sorted(result.keys()):
        lines.append(f'  {lid}: {{')
        for sidx in sorted(result[lid].keys()):
            url = result[lid][sidx]
            lines.append(f'    {sidx}: \'{url}\',')
        lines.append('  },')
    lines.append('}')
    lines.append('')

    with open(OUT_FILE, 'w') as f:
        f.write('\n'.join(lines))
    print(f'\nWrote {OUT_FILE}')


def main():
    done = load_progress()
    print(f'Progress: {len(done)}/{len(SLIDES)} slides done\n')

    for lesson_id, slide_idx, query in SLIDES:
        key = f'{lesson_id}:{slide_idx}'
        if key in done:
            continue

        try:
            url, remaining = search_pexels(query)
            if url:
                done[key] = url
                print(f'  [{lesson_id:02d}:{slide_idx}] ✓ {query[:45]}')
            else:
                print(f'  [{lesson_id:02d}:{slide_idx}] NO RESULTS: {query}')
            save_progress(done)

            if remaining <= 2:
                print(f'\nRate limit nearly reached ({remaining} remaining). Re-run in ~1 hour.')
                break

        except Exception as e:
            print(f'  [{lesson_id:02d}:{slide_idx}] ERROR: {e}')
            save_progress(done)
            break

        time.sleep(0.8)

    write_slide_images(done)
    total_done = len(done)
    total = len(SLIDES)
    print(f'\nDone: {total_done}/{total} slides')
    if total_done < total:
        print(f'Re-run this script to continue ({total - total_done} remaining)')


if __name__ == '__main__':
    main()
