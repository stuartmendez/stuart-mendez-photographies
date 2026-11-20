import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'

import { sessionTypes } from '@/data/site'

type State = 'idle' | 'pending' | 'success' | 'error'

const field =
  'w-full border-0 border-b border-input bg-transparent px-0 py-3 text-lg font-light text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus-visible:ring-0 disabled:opacity-60'
const label = 'text-xs uppercase tracking-[0.28em] text-muted-foreground'

export function ContactForm() {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const form = event.currentTarget
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      if (/\bdata-netlify\s*=/i.test(await response.text())) throw new Error('Form handling unavailable')
      form.reset()
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="rise flex flex-col items-start gap-6 border border-border p-8 sm:p-12">
        <span className="flex size-12 items-center justify-center bg-primary text-primary-foreground">
          <Check className="size-5" aria-hidden />
        </span>
        <p className="font-display text-3xl font-light italic sm:text-4xl">Thank you — message received.</p>
        <p className="max-w-reading text-muted-foreground">
          I read every enquiry personally and will reply within two working days with availability and next steps.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="text-sm uppercase tracking-[0.2em] text-primary underline-offset-8 hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      name="contacto"
      method="POST"
      action="/contact-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
    >
      <input type="hidden" name="form-name" value="contacto" />
      <p hidden>
        <label>
          Do not fill this in
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <legend className="sr-only">Contact details</legend>
        <label className="flex flex-col gap-1">
          <span className={label}>Name</span>
          <input name="name" autoComplete="name" required maxLength={100} placeholder="Your full name" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Type of commission</span>
          <select name="session" required defaultValue="" className={`${field} appearance-none`}>
            <option value="" disabled className="bg-card">
              Choose one
            </option>
            {sessionTypes.map((type) => (
              <option key={type} value={type} className="bg-card">
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Approximate date (optional)</span>
          <input name="date" type="date" className={`${field} [color-scheme:dark]`} />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className={label}>Tell me about your project</span>
          <textarea
            name="message"
            required
            maxLength={2000}
            rows={4}
            placeholder="Location, number of people, the story you have in mind…"
            className={`${field} resize-none`}
          />
        </label>
        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-3 border border-primary bg-primary px-10 py-4 text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground transition-[background-color,color,transform] duration-500 hover:bg-transparent hover:text-primary active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-wait motion-reduce:transition-none"
          >
            {state === 'pending' ? (
              <>
                <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden /> Sending…
              </>
            ) : (
              <>
                Send enquiry
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </>
            )}
          </button>
          <p className="text-sm text-muted-foreground">Replies within two working days.</p>
        </div>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className="mt-6 border-l-2 border-destructive pl-4 text-sm text-destructive-foreground">
          Your message could not be confirmed. Your details are still here — please try again in a few minutes or email me directly.
        </p>
      )}
    </form>
  )
}
