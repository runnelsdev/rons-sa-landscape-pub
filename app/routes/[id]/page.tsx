import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import DataRow from "@/components/DataRow";
import { Chip } from "@/components/Chip";
import { routes, clients, contracts, crews, equipment } from "@/lib/data";
import { fmtMoney } from "@/lib/utils";

export default function RouteDetail({ params }: { params: { id: string } }) {
  const route = routes.find((r) => r.id === params.id);
  if (!route) return notFound();

  const crew = crews.find((c) => c.id === route.crewId);
  const truck = equipment.find((e) => e.id === route.truckId);
  const trailer = equipment.find((e) => e.id === route.trailerId);

  const totalMinutes = route.estimatedDriveMinutes + route.estimatedJobMinutes;
  const profitPerHour = (route.weeklyRevenue / (totalMinutes / 60)) || 0;

  return (
    <>
      <PageHeader
        eyebrow={`Route · ${route.dayOfWeek}`}
        title={route.name}
        subtitle={`Serving ZIP ${route.zipCodes.join(", ")} · ${route.stops.length} stop${route.stops.length !== 1 ? "s" : ""}`}
        backHref="/routes"
        action={
          <div className="flex gap-2">
            <button className="btn btn-secondary">Edit</button>
            <button className="btn">Optimize Order</button>
          </div>
        }
      />

      <div className="px-8 py-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Stops */}
          <Panel eyebrow="Itinerary" title="Stops" dense>
            <ol className="divide-y divide-ink/10">
              {route.stops.map((stop) => {
                const cl = clients.find((c) => c.id === stop.clientId);
                const ct = contracts.find((c) => c.id === stop.contractId);
                return (
                  <li key={stop.clientId} className="px-5 py-4 flex items-start gap-4">
                    <div className="display text-[28px] text-clay leading-none w-10 shrink-0 text-center">
                      {stop.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/clients/${cl?.id}`}
                        className="display text-[18px] hover:text-moss"
                      >
                        {cl?.name}
                      </Link>
                      <div className="text-[12px] text-slate mt-0.5">
                        {cl?.address}
                      </div>
                      {cl?.gateCode && (
                        <div className="inline-block mt-2 mono text-[10px] px-2 py-0.5 bg-sun/30 border border-ink rounded">
                          Gate: {cl.gateCode}
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="mono text-[13px] font-semibold">
                        ~{stop.estimatedMinutes}m
                      </div>
                      {ct && (
                        <div className="mono text-[11px] text-slate mt-0.5">
                          {fmtMoney(ct.recurringPrice)}/visit
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Panel>

          {/* Time analysis */}
          <Panel eyebrow="Time Budget" title="Where the Day Goes">
            <div className="space-y-4">
              <TimeBar
                label="On-property"
                minutes={route.estimatedJobMinutes}
                total={totalMinutes}
                color="bg-moss"
              />
              <TimeBar
                label="Driving"
                minutes={route.estimatedDriveMinutes}
                total={totalMinutes}
                color="bg-clay"
              />
              <div className="pt-3 border-t border-dashed border-ink/20 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="display text-[24px]">{Math.round(totalMinutes / 60 * 10) / 10}h</div>
                  <div className="label text-[9px] mt-1">Total Day</div>
                </div>
                <div>
                  <div className="display text-[24px] text-moss">
                    {fmtMoney(route.weeklyRevenue)}
                  </div>
                  <div className="label text-[9px] mt-1">Weekly Revenue</div>
                </div>
                <div>
                  <div className="display text-[24px] text-clay">
                    {fmtMoney(profitPerHour)}
                  </div>
                  <div className="label text-[9px] mt-1">/ Hour</div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel eyebrow="Logistics" title="Assignment">
            <DataRow label="Day of Week">
              <Chip tone="good">{route.dayOfWeek}</Chip>
            </DataRow>
            <DataRow label="Crew">
              {crew && (
                <Link href={`/crew/${crew.id}`} className="hover:text-moss">
                  {crew.name}
                </Link>
              )}
            </DataRow>
            <DataRow label="Truck">
              {truck && (
                <Link
                  href={`/equipment/${truck.id}`}
                  className="mono hover:text-moss"
                >
                  {truck.year} {truck.make} {truck.model}
                </Link>
              )}
            </DataRow>
            <DataRow label="Trailer">
              {trailer ? (
                <Link
                  href={`/equipment/${trailer.id}`}
                  className="mono hover:text-moss"
                >
                  {trailer.make} {trailer.model}
                </Link>
              ) : (
                <span className="text-slate text-[12px]">—</span>
              )}
            </DataRow>
            <DataRow label="ZIP Codes">
              <div className="flex flex-wrap gap-1">
                {route.zipCodes.map((z) => (
                  <span key={z} className="chip">{z}</span>
                ))}
              </div>
            </DataRow>
          </Panel>

          <Panel eyebrow="Profit Lens" title="Performance">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="border border-dashed border-ink/30 p-3">
                <div className="display text-[22px] text-moss">
                  {fmtMoney(route.weeklyRevenue * 4)}
                </div>
                <div className="label text-[9px] mt-1">Per Month</div>
              </div>
              <div className="border border-dashed border-ink/30 p-3">
                <div className="display text-[22px] text-moss">
                  {fmtMoney(route.weeklyRevenue * 52)}
                </div>
                <div className="label text-[9px] mt-1">Per Year</div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function TimeBar({
  label,
  minutes,
  total,
  color,
}: {
  label: string;
  minutes: number;
  total: number;
  color: string;
}) {
  const pct = (minutes / total) * 100;
  return (
    <div>
      <div className="flex justify-between text-[12px] mb-1.5">
        <span className="font-semibold">{label}</span>
        <span className="mono text-slate">
          {minutes} min ({pct.toFixed(0)}%)
        </span>
      </div>
      <div className="h-3 bg-cream border border-ink rounded-sm overflow-hidden">
        <div
          className={`${color} h-full`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
