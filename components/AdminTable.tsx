'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  deleteRsvpAction,
  updateRsvpAction,
  type RsvpRow,
} from '@/lib/actions/admin';

type SortKey = 'name' | 'attending' | 'guest_count' | 'created_at';
type SortDir = 'asc' | 'desc';

interface AdminTableProps {
  rows: RsvpRow[];
}

interface EditState {
  id: number;
  name: string;
  attending: boolean;
  guest_count: number;
  message: string;
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
  const [editing, setEditing] = useState<EditState | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let av: string | number | boolean = a[sortKey];
      let bv: string | number | boolean = b[sortKey];
      if (sortKey === 'created_at') {
        av = new Date(a.created_at).getTime();
        bv = new Date(b.created_at).getTime();
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
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
    if (sortKey !== key) return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  }

  function arrow(key: SortKey): string {
    if (sortKey !== key) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  }

  function startEdit(row: RsvpRow) {
    setActionError(null);
    setEditing({
      id: row.id,
      name: row.name,
      attending: row.attending,
      guest_count: row.guest_count,
      message: row.message ?? '',
    });
  }

  function cancelEdit() {
    setEditing(null);
    setActionError(null);
  }

  function saveEdit() {
    if (!editing) return;
    setActionError(null);
    setPendingId(editing.id);
    startTransition(async () => {
      const result = await updateRsvpAction({
        id: editing.id,
        name: editing.name,
        attending: editing.attending,
        guest_count: editing.guest_count,
        message: editing.message,
      });
      setPendingId(null);
      if (!result.ok) {
        setActionError(result.error);
        return;
      }
      setEditing(null);
    });
  }

  function deleteRow(id: number, name: string) {
    if (!confirm(`Delete RSVP from "${name}"? This cannot be undone.`)) return;
    setActionError(null);
    setPendingId(id);
    startTransition(async () => {
      const result = await deleteRsvpAction(id);
      setPendingId(null);
      if (!result.ok) {
        setActionError(result.error);
      }
    });
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Total" value={totals.total} />
        <Stat label="Attending" value={totals.attending} accent />
        <Stat label="Declined" value={totals.declined} />
        <Stat label="Guest Count" value={totals.guests} accent />
      </div>

      {actionError && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {actionError}
        </div>
      )}

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
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-turquoise-100">
              {sorted.length === 0 ? (
                <tr>
                  <td className="px-4 py-12 text-center text-slate-500" colSpan={6}>
                    No RSVPs yet.
                  </td>
                </tr>
              ) : (
                sorted.map((row) => {
                  const isEditing = editing?.id === row.id;
                  const isPending = pendingId === row.id;
                  if (isEditing && editing) {
                    return (
                      <tr key={row.id} className="bg-turquoise-50/40">
                        <td className="px-4 py-3 align-top">
                          <input
                            type="text"
                            value={editing.name}
                            maxLength={100}
                            onChange={(e) =>
                              setEditing({ ...editing, name: e.target.value })
                            }
                            className="w-full rounded-lg border border-turquoise-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200"
                          />
                        </td>
                        <td className="px-4 py-3 align-top">
                          <select
                            value={editing.attending ? 'yes' : 'no'}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                attending: e.target.value === 'yes',
                              })
                            }
                            className="w-full rounded-lg border border-turquoise-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200"
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <select
                            value={editing.guest_count}
                            disabled={!editing.attending}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                guest_count: Number(e.target.value),
                              })
                            }
                            className="w-full rounded-lg border border-turquoise-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200 disabled:opacity-50"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <textarea
                            value={editing.message}
                            maxLength={1000}
                            rows={2}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                message: e.target.value,
                              })
                            }
                            className="w-full rounded-lg border border-turquoise-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200"
                          />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 align-top text-slate-500">
                          {formatDate(row.created_at)}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={saveEdit}
                              disabled={isPending}
                              className="rounded-lg bg-turquoise-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-turquoise-800 disabled:opacity-60"
                            >
                              {isPending ? 'Saving' : 'Save'}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={isPending}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                  return (
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
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(row)}
                            disabled={isPending || editing !== null}
                            className="rounded-lg border border-turquoise-200 bg-white px-3 py-1.5 text-xs font-medium text-turquoise-800 transition-colors hover:bg-turquoise-50 disabled:opacity-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteRow(row.id, row.name)}
                            disabled={isPending || editing !== null}
                            className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
                          >
                            {isPending ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
