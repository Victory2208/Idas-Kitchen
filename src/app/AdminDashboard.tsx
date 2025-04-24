"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, remove, update, push } from "firebase/database";
import { app } from "@/lib/firebase";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentUID, setCurrentUID] = useState<string | null>(null);
  const [guestbookEntries, setGuestbookEntries] = useState<any[]>([]);
  const [newEntry, setNewEntry] = useState({ name: "", message: "" });

  useEffect(() => {
    const auth = getAuth(app);
    const db = getDatabase(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUID(user.uid);
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data?.role) setUserRole(data.role);
        });
      }
    });

    const guestbookRef = ref(db, "guestbook");
    onValue(guestbookRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.entries(data).map(([id, entry]) => ({ id, ...entry }));
        setGuestbookEntries(entries);
      }
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = userRole === "admin";

  const handleSubmit = () => {
    if (!newEntry.name || !newEntry.message) return;
    const db = getDatabase(app);
    const guestbookRef = ref(db, "guestbook");
    push(guestbookRef, newEntry);
    setNewEntry({ name: "", message: "" });
  };

  const handleDelete = (id: string) => {
    const db = getDatabase(app);
    remove(ref(db, `guestbook/${id}`));
  };

  return (
    <div className="p-6 text-rose-900 bg-gradient-to-br from-yellow-50 to-rose-100 min-h-screen">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-green-600" />
        Admin Dashboard
      </h1>

      <div className="my-6 space-y-4">
        <input
          className="p-2 border border-rose-300 rounded w-full"
          placeholder="Your Name"
          value={newEntry.name}
          onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
        />
        <textarea
          className="p-2 border border-rose-300 rounded w-full"
          placeholder="Your Message"
          rows={3}
          value={newEntry.message}
          onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          Sign Guestbook
        </button>
      </div>

      <div className="space-y-2">
        {guestbookEntries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded shadow-md">
            <strong>{entry.name}</strong>
            <p className="text-sm italic">{entry.message}</p>
            {isAdmin && (
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-red-500 text-sm underline mt-1"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
