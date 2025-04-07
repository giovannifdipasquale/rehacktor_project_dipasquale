import { useState, useEffect } from "react";
import supabase from "../../supabase/supabase-client";
import { useSession } from "../../context/SessionContext";
import Avatar from "../../components/Avatar";

export default function AccountPage() {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      if (!session) return; // 🔐 aspetta che session venga caricata
      setLoading(true);
      const { user } = session;
      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }
      console.log("session is:", session);

      setLoading(false);
    };

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile = async (event, avatarUrl) => {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center bg-gray-50">
      <form
        onSubmit={updateProfile}
        className="space-y-4 w-full max-w-md border border-gray-300 rounded-xl p-6 bg-white shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Profile Settings</h2>
        <Avatar url={avatar_url} size={150} onUpload={updateProfile} />
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={session ? session.user.email : "Loading..."}
            disabled
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium mb-1"
          >
            First name
          </label>
          <input
            id="first_name"
            type="text"
            value={first_name || ""}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium mb-1">
            Last name
          </label>
          <input
            id="last_name"
            type="text"
            value={last_name || ""}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </form>
    </div>
  );
}
