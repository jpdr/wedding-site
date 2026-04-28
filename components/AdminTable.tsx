'use client';

import { useMemo, useState } from 'react';
import type { RsvpRow } from '@/lib/actions/admin';

type SortKey = 'name' | 'attending' | 'guest_count' | 'created_at';
type SortDir = 'asc' | 'desc';

interface AdminTableProps {
  rows: RsvpRow[];
}

function formatDate(value: string): string {
  const d = new Date(value);
  return d.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function AdminTable({ rows }: AdminTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let av: string | number | boolean = a[sortKey];
      let bv: string | number | boolean = b[sortKey];
      if (sortKey === 'created_at') {
        av = new Date(a.created_at).getTime();
        bv = new Date(b.created_at).getTime();
      }
      if (av < bv) {
        return sortDir === 'asc' ? -1 : 1;
      }
      if (av > bv) {
        return sortDir === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  function toggle(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const totals = useMemo(() => {
    const yes = rows.filter((r) => r.attending);
    const guests = yes.reduce((sum, r) => sum + r.guest_count, 0);
    return {
      total: rows.length,
      attending: yes.length,
      declined: rows.length - yes.length,
      guests,
    };
  }, [rows]);

  function ariaSort(key: SortKey): 'ascending' | 'descending' | 'none' {
    if (sortKey !== key) {
      return 'none';
    }
    return sortDir === 'asc' ? 'ascending' : 'descending';
  }

  function arrow(key: SortKey): string {
    if (sortKey !== key) {
      return '';
    }
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Total" value={totals.total} />
        <Stat label="Attending" value={totals.attending} accent />
        <Stat label="Declined" value={totals.declined} />
        <Stat label="Guest Count" value={totals.guests} accent />
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow ring-1 ring-turquoise-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-turquoise-50 text-xs uppercase tracking-wider text-turquoise-900">
              <tr>
                <Th onClick={() => toggle('name')} sort={ariaSort('name')}>
                  Name{arrow('name')}
                </Th>
                <Th onClick={() => toggle('attending')} sort={ariaSort('attending')}>
                  Attending{arrow('attending')}
                </Th>
                <Th onClick={() => toggle('guest_count')} sort={ariaSort('guest_count')}>
                  Guests{arrow('guest_count')}
                </Th>
                <th className="px-4 py-3">Message</th>
                <Th onClick={() => toggle('created_at')} sort={ariaSort('created_at')}>
                  Submitted{arrow('created_at')}
                </Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-turquoise-100">
              {sorted.length === 0 ? (
                <tr>
                  <td className="px-4 py-12 text-center text-slate-500" colSpan={5}>
                    No RSVPs yet.
                  </td>
                </tr>
              ) : (
                sorted.map((row) => (
                  <tr key={row.id} className="hover:bg-turquoise-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.name}
                    </td>
                    <td className="px-4 py-3">
                      {row.attending ? (
                        <span className="inline-flex items-center rounded-full bg-turquoise-100 px-2.5 py-1 text-xs font-medium text-turquoise-800">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.guest_count}</td>
                    <td className="max-w-md px-4 py-3 text-slate-600">
                      {row.message ?? <span className="text-slate-400">—</span>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {formatDate(row.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ring-1 ${
        accent
          ? 'bg-turquoise-700 text-white ring-turquoise-600'
          : 'bg-white text-slate-900 ring-turquoise-100'
      }`}
    >
      <div
        className={`text-xs uppercase tracking-[0.2em] ${
          accent ? 'text-white/80' : 'text-turquoise-700'
        }`}
      >
        {label}
      </div>
      <div className="mt-2 text-3xl font-light">{value}</div>
    </div>
  );
}

function Th({
  children,
  onClick,
  sort,
}: {
  children: React.ReactNode;
  onClick: () => void;
  sort: 'ascending' | 'descending' | 'none';
}) {
  return (
    <th
      aria-sort={sort}
      className="cursor-pointer select-none px-4 py-3 transition-colors hover:bg-turquoise-100"
      onClick={onClick}
    >
      {children}
    </th>
  );
}
