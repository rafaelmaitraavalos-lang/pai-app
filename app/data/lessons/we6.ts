import { LessonData } from '../index'

const we6: Record<number, LessonData> = {
  52: {
    id: 52, worldId: 8, title: 'Is AI Fair?',
    stops: [
      { tag: 'Big idea', title: 'What is Ethics?', body: "Ethics means thinking about what is right and wrong — and trying to make good choices, even when it is hard. You do it every day when you decide to share, tell the truth, or stand up for someone.\n\nAI needs ethics too! Because AI talks to millions of people, even one small wrong choice can cause a lot of harm. That is why asking 'is this fair?' really matters." },
      { tag: 'Fact', title: 'The Bias Problem', body: "Imagine if a teacher only called on kids with red backpacks. That would not be fair to everyone else! That unfair pattern is called bias.\n\nAI can have bias too. If it learned from information that left some people out, it might not treat everyone equally. It is not trying to be mean — it just learned from unfair patterns." },
      { tag: 'Fact', title: 'The Consent Problem', body: "Consent means saying 'yes, that is okay with me.' If someone uses your drawing without asking — that is not okay!\n\nAI learned from millions of things people wrote and made — but not everyone said 'yes, you can use my work.' That is a big question people are still trying to figure out." },
      { tag: 'Hot take', title: 'Who is Responsible?', body: "If a robot bumps into someone, who is responsible — the robot, the company that made it, or the person who turned it on?\n\nWhen AI does something wrong, it is hard to know who is in charge of fixing it. Making sure SOMEONE is responsible — and will fix mistakes — is really important." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Big idea', stopTitle: 'What is Ethics?', question: `"Ethics means thinking about what is right and wrong and trying to make good choices."`, answer: true, verdict: 'Correct!', explanation: "Ethics is about making good choices — and AI needs ethics too. When AI talks to millions of people, even one small wrong choice can cause a lot of harm." },
      { difficulty: 'Easy', tag: 'Fact', stopTitle: 'The Bias Problem', question: `"AI can be biased if it learned from information that left some people out."`, answer: true, verdict: 'Correct!', explanation: "AI is not trying to be mean — it just learned from unfair patterns. That is why the information AI learns from is so important to get right." },
      { difficulty: 'Medium', tag: 'Fact', stopTitle: 'The Consent Problem', question: `"Everyone whose writing or art AI learned from said 'yes, you can use my work.'"`, answer: false, verdict: 'Not quite!', explanation: "Actually, not everyone gave permission! AI learned from millions of things people made, but many people were never asked. This is a big question people are still working to solve." },
    ],
  },

  53: {
    id: 53, worldId: 8, title: 'AI and Choices',
    stops: [
      { tag: 'Hot take', title: 'The Mystery Inside AI', body: "Sometimes even the people who MADE AI cannot fully explain why it gave a certain answer — it is like asking why you like a song, but having no words to explain it.\n\nThis makes it tricky to check if AI is being fair. Scientists are working hard to make AI easier to understand." },
      { tag: 'Example', title: 'Nudges and Real Choices', body: "A nudge is when something gently pushes you toward a choice — like when an app says 'one more video?' again and again.\n\nToo many nudges can stop you from making YOUR OWN choice. Real choice means YOU decide — not because something kept pushing you." },
      { tag: 'Big idea', title: 'Doing What You Really Mean', body: "You told PAI: 'help me clean up my essay.' PAI deleted the whole thing. Technically it is clean — but that is NOT what you meant!\n\nMaking AI understand what you actually want — not just the words you said — is called alignment. It is one of the hardest problems in all of AI." },
      { tag: 'Big idea', title: 'Who Gets to Decide?', body: "Who should make the rules about AI — scientists? Governments? Companies? Kids who will grow up using it?\n\nThese are real questions people are asking RIGHT NOW. Someday, your voice will matter in making those rules too." },
    ],
    questions: [
      { difficulty: 'Easy', tag: 'Example', stopTitle: 'Nudges and Real Choices', question: `"A nudge pushes you gently toward a choice again and again, which can stop you from deciding for yourself."`, answer: true, verdict: 'Correct!', explanation: "Real choice means YOU decide — not because an app kept asking 'one more?' over and over. Noticing nudges is the first step to making your own choices." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Doing What You Really Mean', question: `"Alignment means making AI understand what you actually want, not just the exact words you said."`, answer: true, verdict: 'Correct!', explanation: "That is exactly it! If you say 'clean up my essay' and AI deletes it — technically it followed instructions, but it did NOT get what you meant. Alignment is one of AI's hardest problems." },
      { difficulty: 'Medium', tag: 'Big idea', stopTitle: 'Who Gets to Decide?', question: `"Only scientists and governments should decide the rules about AI — not regular people."`, answer: false, verdict: 'Not quite!', explanation: "Everyone's voice matters — including yours! The rules about AI will affect everyone who uses it. Kids growing up with AI today will help shape those rules too." },
    ],
  },
}

export default we6
