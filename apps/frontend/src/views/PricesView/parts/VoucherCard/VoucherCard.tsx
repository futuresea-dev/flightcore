import { Button } from '@flightcore/uikit'
import type { CollectionEntry } from 'astro:content'
import clsx from 'clsx'
import type { FC } from 'react'
import { CheckList } from '../../../../components/shared/CheckList'

export type VoucherCardProps = {
  content: CollectionEntry<'prices'>['data']['vouchers'][number]
}

export const VoucherCard: FC<VoucherCardProps> = ({ content }) => {
  return (
    <article className="flex-1 bg-extra-dark rounded-3xl overflow-hidden">
      <div
        className={clsx(
          'bg-gradient-to-b min-h-[313px] p-[48px]',
          mapVoucherVariantToBackground[content.background] || mapVoucherVariantToBackground.unknown,
        )}>
        <div className="text-blue-dark text-center mb-[40px]">
          <h1 className="text-heading3 mb-[-3px]">{content.title}</h1>
          <h2 className="text-heading2 font-bold">{content.price}</h2>
        </div>
        <Button
          onClick={() => alert(':)')}
          tabIndex={0}
          aria-label="Order a voucher"
          aria-describedby={`voucherCard-${content.key}-footer`}
          role="button"
          color="dark-blue"
          variant="outline">
          ZAMÓW VOUCHER
        </Button>
      </div>
      <footer className="px-[40px] py-[24px]">
        <CheckList id={`voucherCard-${content.key}-footer`} items={content.footerCheckList} />
      </footer>
    </article>
  )
}

const mapVoucherVariantToBackground: Record<string, string> = {
  bronze: 'from-bronze-dark to-bronze-dark',
  silver: 'from-silver-dark to-silver-light',
  gold: 'from-gold-dark to-gold-light',
  unknown: 'bg-blue-medium',
}
