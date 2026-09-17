import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What kind of projects do you take on?',
    answer:
      'We work across graphic design, photography and web development — from full brand identities and product shoots to complete marketing websites. If it helps a brand be seen, we can likely help.',
  },
  {
    question: 'How does the process work?',
    answer:
      'It starts with a free discovery call to understand your goals. From there we scope the work, agree on a timeline, and move through design, review and delivery in clear, collaborative stages.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      "It depends on scope. A focused logo or shoot can take one to two weeks, while a full brand system with a website usually runs four to eight weeks. We'll give you a clear estimate up front.",
  },
  {
    question: 'Can you work with our existing brand?',
    answer:
      'Absolutely. We can evolve and extend what you already have, or refresh it entirely — whatever serves your goals best. Nothing changes without your sign-off.',
  },
  {
    question: 'How do we get started?',
    answer:
      "Just book a free discovery call. Tell us a little about your project and we'll come back with a suggested approach, timeline and next steps.",
  },
]

export function Faq() {
  return (
    <section
      id="faq"
      className="border-t border-border bg-muted/40"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:py-28 lg:px-8">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Everything you need to know before we begin. Still curious? Reach out
            and we&apos;ll gladly answer.
          </p>
        </div>

        <Accordion className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-5 text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
