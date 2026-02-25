import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"; // Changed to framer-motion standard
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  LogOut,
  Camera,
  Edit3,
  Check,
  Grid2X2,
  ArrowRight
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Added for Multer
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    image: ""
  });

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("data:") || img.startsWith("blob:")) return img;
    return `http://localhost:8000/${img}`;
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile({
        name: response.data.user_name || "",
        bio: response.data.biography || "",
        image: response.data.image || "https://mediastreet.ie/wp-content/uploads/2017/08/blank-profile-picture.png"
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Use FormData instead of a JSON object for file uploads
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("bio", profile.bio);
      
      if (selectedFile) {
        formData.append("image", selectedFile);
      } else {
        // Send current image path if no new file is selected
        formData.append("image", profile.image);
      }

      await axios.put("http://localhost:8000/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      
      setSelectedFile(null);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Save actual file for API
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result }); // Set preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    updateProfile();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-16 flex justify-center">
      <div className="w-full max-w-4xl">

        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-zinc-100 transition-colors"
          >
            <Grid2X2 size={14} /> My Collections
          </button>

          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-2 border border-zinc-800 hover:border-zinc-500 transition-all text-[10px] font-bold uppercase tracking-widest bg-zinc-900/20"
          >
            {isEditing ? <><Check size={14} /> Save Profile</> : <><Edit3 size={14} /> Edit Identity</>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Avatar Section */}
          <div className="md:col-span-4">
            <div
              onClick={() => isEditing && fileInputRef.current.click()}
              className={`relative group aspect-square bg-zinc-900 overflow-hidden border border-zinc-800 ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="absolute -top-px left-1/4 right-1/4 h-px bg-zinc-950 z-10" />
              <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-zinc-950 z-10" />

              <img
                src={getImageUrl(profile.image)}
                alt="Profile"
                className={`w-full h-full object-cover grayscale transition-all duration-500 ${isEditing ? 'opacity-50 blur-[2px]' : 'opacity-80'}`}
              />

              {isEditing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-20">
                  <Camera size={32} className="text-white animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Upload New</span>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-8 space-y-12">
            <section className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">User Name</label>
                <input
                  disabled={!isEditing}
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-transparent border-b border-zinc-900 py-4 text-3xl font-light outline-none focus:border-zinc-100 disabled:text-zinc-400 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">Biography</label>
                <textarea
                  disabled={!isEditing}
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="w-full bg-transparent border border-zinc-900 p-4 text-sm leading-relaxed outline-none focus:border-zinc-100 disabled:text-zinc-500 transition-colors resize-none"
                />
              </div>
            </section>

            <div className="pt-8 border-t border-zinc-900 space-y-4">
               <button className="flex items-center justify-between w-full group py-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-100 transition-colors">Change Password</span>
                <ArrowRight size={14} className="text-zinc-800 group-hover:text-zinc-100 transition-colors" />
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-between w-full group py-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-900 group-hover:text-red-500 transition-colors">Terminate Session</span>
                <LogOut size={14} className="text-zinc-800 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;