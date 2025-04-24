// src/app/AdminDashboard.tsx
"use client";
import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  update,
  set,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ShieldCheck } from "lucide-react";
import { app } from "@/lib/firebase"; // ✅ this now works

export default function AdminDashboardPage() {
  const [adminUID, setAdminUID] = useState<string | null>(null);
  const [currentUID, setCurrentUID] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
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
          if (data?.role) {
            setUserRole(data.role);
          }
        });

        const adminUIDValue = "oLzPKXNgkAb15T3m3k0uu8KyX0B3";
        setAdminUID(adminUIDValue);

        set(userRef, {
          role: user.uid === adminUIDValue ? "admin" : "member",
        });
      } else {
        setCurrentUID(null);
        setUserRole(null);
      }
    });

    const guestbookRef = ref(db, "guestbook");
    onValue(guestbookRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.entries(data).map(([id, entry]) => 
          typeof entry === "object" && entry !== null ? { id, ...entry } : { id }
        );
        setGuestbookEntries(entries);
      }
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = userRole === "admin";

  const handleGuestbookDelete = (id: string) => {
    const db = getDatabase(app);
    const entryRef = ref(db, `guestbook/${id}`);
    remove(entryRef);
  };

  const handleGuestbookEdit = (id: string, updatedEntry: any) => {
    const db = getDatabase(app);
    const entryRef = ref(db, `guestbook/${id}`);
    update(entryRef, updatedEntry);
  };

  const handleGuestbookSubmit = () => {
    if (!newEntry.name || !newEntry.message) return;
    const db = getDatabase(app);
    const guestbookRef = ref(db, "guestbook");
    push(guestbookRef, newEntry);
    setNewEntry({ name: "", message: "" });
  };

  const renderGuestbook = () => (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-rose-200">
      <h2 className="text-2xl font-bold mb-4 text-rose-800">Guestbook Entries</h2>
      <div className="mb-4 space-y-2">
        <input
          type="text"
          value={newEntry.name}
          onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          placeholder="Your Name"
          className="w-full p-2 border border-rose-300 rounded-lg"
        />
        <textarea
          value={newEntry.message}
          onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
          placeholder="Your Message"
          className="w-full p-2 border border-rose-300 rounded-lg"
          rows={3}
        ></textarea>
        <button
          onClick={handleGuestbookSubmit}
          className="bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition"
        >
          Sign Guestbook
        </button>
      </div>
      {guestbookEntries.map((entry) => (
        <div key={entry.id} className="border-b py-4 px-2 hover:bg-rose-50 transition rounded-lg mb-2">
          <div className="font-semibold text-lg text-rose-700">{entry.name}</div>
          <div className="text-sm text-rose-600 italic">{entry.message}</div>
          {isAdmin && (
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => handleGuestbookDelete(entry.id)}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  const newMessage = prompt("Edit message:", entry.message);
                  if (newMessage) {
                    handleGuestbookEdit(entry.id, { ...entry, message: newMessage });
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-rose-100 text-rose-900 p-8">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-green-600" /> Admin Dashboard
      </h1>

      <div className="space-y-8">
        {renderGuestbook()}
      </div>
    </div>
  );
}
