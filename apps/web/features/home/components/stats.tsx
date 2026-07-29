export default function Stats() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
          <h2 className="text-muted-foreground max-w-4xl text-4xl font-medium tracking-tight text-balance lg:text-5xl">
            <span className="text-foreground">Ship more projects.</span> <br />{' '}
            Know every thread signal.
          </h2>
          <div className="flex flex-col gap-24 md:mx-auto xl:gap-32">
            <p className="text-muted-foreground text-lg text-balance">
              Modern dev teams move faster when every project, conversation, and
              next step lives in one place. Conduit brings pipeline, outreach,
              and chat history into a focused workspace where devs can spot
              momentum, prioritize follow-up, and turn ideas into production.
            </p>

            <div className="grid gap-12 md:grid-cols-3 md:gap-12">
              <div className="space-y-3 border-t pt-6">
                <div className="text-4xl font-semibold tracking-tight">21k</div>
                <p className="text-muted-foreground">Deals tracked</p>
              </div>
              <div className="space-y-3 border-t pt-6">
                <div className="text-4xl font-semibold tracking-tight">22m</div>
                <p className="text-muted-foreground">Customer signals</p>
              </div>
              <div className="space-y-3 border-t pt-6">
                <div className="text-4xl font-semibold tracking-tight">
                  +500
                </div>
                <p className="text-muted-foreground">Sales teams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
