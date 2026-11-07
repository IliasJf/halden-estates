import type { ReactNode } from 'react'
import Icon, { type IconName } from './Icon'

export default function EmptyState({ title, message, action, icon = 'search' }: { title: string; message: string; action?: ReactNode; icon?: IconName }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone bg-paper px-6 py-16 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-stone/60 text-pine">
        <Icon name={icon} className="size-6" />
      </span>
      <h2 className="mt-5 text-2xl text-ink">{title}</h2>
      <p className="mt-2 max-w-md leading-relaxed text-muted">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
