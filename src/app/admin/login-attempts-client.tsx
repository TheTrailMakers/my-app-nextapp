"use client";

import { useEffect, useState } from "react";

interface Attempt {
  id: string;
  email?: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export default function LoginAttempts() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const res = await fetch("/api/admin/login-attempts");
      if (!res.ok) throw new Error("Forbidden");
      const data = await res.json();
      setAttempts(data.attempts || []);
    } catch (e) {
      console.error("Failed to fetch attempts", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-sm text-muted-foreground">Loading attempts...</p>;
  if (!attempts.length)
    return (
      <p className="text-sm text-muted-foreground">No recent failed attempts</p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left">When</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">IP</th>
            <th className="px-4 py-2 text-left">User Agent</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {attempts.map((a) => (
            <tr key={a.id}>
              <td className="px-4 py-2 text-xs text-muted-foreground">
                {new Date(a.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2">{a.email || a.userId || "—"}</td>
              <td className="px-4 py-2">{a.ipAddress || "—"}</td>
              <td className="px-4 py-2 truncate max-w-xs">
                {a.userAgent || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
