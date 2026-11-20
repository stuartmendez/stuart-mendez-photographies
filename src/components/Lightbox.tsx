import { useEffect } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import type { Photo } from '@/data/site'
import { img, srcSet } from '@/lib/img'

type Props = {
  photos: Photo[]
  index: number | null
  onChange: (index: number | null) => void
}

export function Lightbox({ photos, index, onChange }: Props) {
  const open = index !== null && photos[index] !== undefined
  const photo = open ? photos[index] : null
  const go = (delta: number) => {
    if (index === null) return
    onChange((index + delta + photos.length) % photos.length)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const nav =
    'flex size-12 items-center justify-center border border-foreground/20 text-foreground/80 transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary'

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col p-4 outline-none sm:p-8 data-[state=open]:animate-in data-[state=open]:fade-in-0">
          {photo && (
            <>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="tabular-nums tracking-[0.2em] text-muted-foreground">
                  {String(index! + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                </span>
                <DialogPrimitive.Close className={nav} aria-label="Close">
                  <X className="size-5" />
                </DialogPrimitive.Close>
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
                <img
                  key={photo.id}
                  src={img(photo.file, 1600, 82)}
                  srcSet={srcSet(photo.file, [800, 1200, 1600, 2000])}
                  sizes="90vw"
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="max-h-full max-w-full object-contain shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500 motion-reduce:animate-none"
                />
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <DialogPrimitive.Title className="font-display text-2xl font-light italic sm:text-3xl">{photo.title}</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                    {photo.place} · {photo.year}
                  </DialogPrimitive.Description>
                </div>
                <div className="flex gap-3">
                  <button type="button" className={nav} onClick={() => go(-1)} aria-label="Previous photo">
                    <ChevronLeft className="size-5" />
                  </button>
                  <button type="button" className={nav} onClick={() => go(1)} aria-label="Next photo">
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
