import { cn } from '@/lib/utils';

export type CutoutOrientation = 'up' | 'down';

type SectionCutoutProps = {
  /** `up` = center tab rises into the previous section; `down` = center valley (previous dips in). */
  orientation: CutoutOrientation;
  className?: string;
};

/** Matches navbar `max-w-6xl` (72rem). */
const VIEW_W = 1152;
const VIEW_H = 48;
/** ~45° chamfer run/rise in viewBox units. */
const CHAMFER = 44;
/** Corner radius on all four cutout corners. */
const RADIUS = 4;
/**
 * Full-height shoulder before the chamfer so the SVG edge stays flush with the
 * flex wings. Must be > RADIUS so the top round sits inset, not on the seam.
 */
const SHOULDER = RADIUS * 2;
const DIAG = RADIUS * Math.SQRT1_2;
const WING_H = VIEW_H - CHAMFER;

/** Left chamfer starts after the shoulder. */
const L0 = SHOULDER;
const L1 = SHOULDER + CHAMFER;
/** Right chamfer (mirrored). */
const R1 = VIEW_W - SHOULDER - CHAMFER;
const R0 = VIEW_W - SHOULDER;

function cutoutPath(orientation: CutoutOrientation): string {
  if (orientation === 'up') {
    // Raised tab: side ledge at y=CHAMFER; rounds on ledge + tab top.
    return [
      `M0 ${VIEW_H}`,
      `V${CHAMFER}`,
      `H${L0 - RADIUS}`,
      // left ledge → chamfer
      `Q${L0} ${CHAMFER} ${L0 + DIAG} ${CHAMFER - DIAG}`,
      `L${L1 - DIAG} ${DIAG}`,
      // left top of tab
      `Q${L1} 0 ${L1 + RADIUS} 0`,
      `H${R1 - RADIUS}`,
      // right top of tab
      `Q${R1} 0 ${R1 + DIAG} ${DIAG}`,
      `L${R0 - DIAG} ${CHAMFER - DIAG}`,
      // right chamfer → ledge
      `Q${R0} ${CHAMFER} ${R0 + RADIUS} ${CHAMFER}`,
      `H${VIEW_W}`,
      `V${VIEW_H}`,
      'Z',
    ].join(' ');
  }

  // Valley: full-height sides flush with wings; rounds inset on the chamfer.
  return [
    `M0 ${VIEW_H}`,
    'V0',
    `H${L0 - RADIUS}`,
    // left top → chamfer
    `Q${L0} 0 ${L0 + DIAG} ${DIAG}`,
    `L${L1 - DIAG} ${CHAMFER - DIAG}`,
    // left valley floor
    `Q${L1} ${CHAMFER} ${L1 + RADIUS} ${CHAMFER}`,
    `H${R1 - RADIUS}`,
    // right valley floor
    `Q${R1} ${CHAMFER} ${R1 + DIAG} ${CHAMFER - DIAG}`,
    `L${R0 - DIAG} ${DIAG}`,
    // right chamfer → top
    `Q${R0} 0 ${R0 + RADIUS} 0`,
    `H${VIEW_W}`,
    `V${VIEW_H}`,
    'Z',
  ].join(' ');
}

/**
 * Clerk-style chamfered trapezoid separator. Fills with the current section's
 * `bg-background` and overlaps upward into the previous band.
 *
 * Center cutout width is capped at `max-w-6xl` (static); side wings flex.
 * Wings/SVG overlap by 2px to hide sub-pixel hairline seams.
 */
export function SectionCutout({ orientation, className }: SectionCutoutProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-10 -mt-12 h-12 w-full',
        className
      )}
    >
      <div className="flex h-full w-full">
        <CutoutWing orientation={orientation} side="left" />
        <svg
          className="text-background relative z-10 -mx-[2px] h-full w-full max-w-6xl flex-[0_1_72rem]"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d={cutoutPath(orientation)} />
        </svg>
        <CutoutWing orientation={orientation} side="right" />
      </div>
      {/* Overlaps 1px into the section body to seal the horizontal join */}
      <div className="bg-background absolute inset-x-0 top-full h-px" />
    </div>
  );
}

function CutoutWing({
  orientation,
  side,
}: {
  orientation: CutoutOrientation;
  side: 'left' | 'right';
}) {
  if (orientation === 'down') {
    return <div className="bg-background min-w-0 flex-1" />;
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col justify-end">
      <div
        className={cn(
          'bg-background w-full',
          // Pull ledge under the SVG edge on the inner side
          side === 'left' ? '-mr-[2px]' : '-ml-[2px]'
        )}
        style={{ height: WING_H }}
      />
    </div>
  );
}
