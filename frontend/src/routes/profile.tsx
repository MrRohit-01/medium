import { useState, useEffect } from "react";
import axios from "axios";
import { AppBar } from "../components/AppBar";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://backend.rohitkumarbarada.workers.dev/api/v1/user/me/profile", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        setProfile({ name: response.data.name, password: "" }); // Initialize password as empty
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const { name, password } = profile;
      const updateData: { name: string; password?: string } = { name };
      if (password) {
        updateData.password = password; // Include password only if it's provided
      }

      const response = await axios.put(
        "https://backend.rohitkumarbarada.workers.dev/api/v1/user/me/profile",
        updateData,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      alert("Profile updated successfully!");
      setProfile({ name: response.data.name, password: "" }); // Clear password after update
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <AppBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          {!isEditing ? (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Name</h2>
                <p className="text-gray-700">{profile.name}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder={profile.name}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={profile.password}
                  onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                  placeholder="Enter new password"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
