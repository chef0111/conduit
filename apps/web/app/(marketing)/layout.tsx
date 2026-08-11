import { ForcedThemeProvider } from '@/components/forced-theme-provider';
import SiteFooter from '@/features/marketing/components/site-footer';
import SiteHeader from '@/features/marketing/components/site-header';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ForcedThemeProvider theme="dark">
      <div className="group/layout">
        <SiteHeader />
        <main className="max-w-screen overflow-x-hidden">{children}</main>
        <SiteFooter />
        <ScrollFadeOverlay align="top" />
      </div>
    </ForcedThemeProvider>
  );
}

function ScrollFadeOverlay({ align }: { align: 'top' | 'bottom' }) {
  const isTop = align === 'top';

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 z-50',
        isTop
          ? 'scroll-fade-effect-top -top-0.5'
          : 'scroll-fade-effect-bottom -bottom-0.5'
      )}
      aria-hidden
    >
      <div
        className={cn(
          'relative',
          isTop ? 'h-(--header-height)' : 'h-(--fade-bottom-height)'
        )}
      >
        {isTop ? (
          <>
            <div className="absolute inset-0 mask-linear-[to_bottom,black_0%,black_18%,transparent_50%] backdrop-blur-[48px]" />
            <div className="absolute inset-0 mask-linear-[to_bottom,black_0%,black_30%,transparent_65%] backdrop-blur-[24px]" />
            <div className="absolute inset-0 mask-linear-[to_bottom,transparent_8%,black_28%,black_45%,transparent_80%] backdrop-blur-[12px]" />
            <div className="absolute inset-0 mask-linear-[to_bottom,transparent_25%,black_50%,transparent_90%] backdrop-blur-[4px]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 mask-linear-[to_top,black_0%,black_18%,transparent_50%] backdrop-blur-[48px]" />
            <div className="absolute inset-0 mask-linear-[to_top,black_0%,black_30%,transparent_65%] backdrop-blur-[24px]" />
            <div className="absolute inset-0 mask-linear-[to_top,transparent_8%,black_28%,black_45%,transparent_80%] backdrop-blur-[12px]" />
            <div className="absolute inset-0 mask-linear-[to_top,transparent_25%,black_50%,transparent_90%] backdrop-blur-[4px]" />
          </>
        )}
      </div>
    </div>
  );
}
