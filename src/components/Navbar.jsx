import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import { toast } from "react-toastify";
 import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize")
      ? parseInt(localStorage.getItem("fontSize"))
      : 16
  );

  const [showSettings, setShowSettings] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "Guest"
  );
  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("profilePhoto") || null
  );

  // Apply dark mode and font size whenever they change
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }, [ fontSize]);

  // Reset everything
  const resetDefaults = () => {
    setFontSize(16);
    localStorage.setItem("fontSize", "16");
    alert("Settings reset to default!");
  };

  const handleReload = () => {
    if (window.confirm("Are you sure you want to start fresh?")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  // Update user name
  const changeName = () => {
    const name = prompt("Enter your name:", userName);
    if (name) {
      setUserName(name);
      localStorage.setItem("userName", name);
      toast.success("Username updated!")
    }
  };

  // Update profile photo
  const changePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Make sure it's an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result); // This is the base64 string
      localStorage.setItem("profilePhoto", reader.result);
      toast.success("Profile photo updated!");
    };
    reader.readAsDataURL(file);
  };


  const navigate = useNavigate();

  return (
    <div className="nav relative flex items-center justify-between px-[100px] h-[90px] border-b border-gray-800">
      {/* Logo Section */}
      <div className="logo flex items-center gap-[10px]">
        <h3 className="text-[25px] font-[700] sp-text cursor-pointer" onClick={() => navigate('/')}>SnapUI</h3>
        <h6 className="text-xs bg-[#17171C] p-[5px] font-thin rounded-xl">
          AI Components
        </h6>
      </div>

      {/* Icons */}
      <div className="icons flex items-center gap-[15px] relative">
        {/* User Profile */}
        {userName === "Guest" ? 
          "": 
          <p
            className="font-bold bg-white/10 backdrop-blur-md border border-white/20 
                  rounded-xl shadow-xl px-2 py-1 z-50
                  hover:scale-95 
                text-gray-400 cursor-pointer
                transition-all duration-200"
          >{userName}</p>
        }
         <div
          className="icon cursor-pointer relative flex items-center gap-2 hover:text-cyan-400 transition-colors"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUser />
          )}
          {showUserMenu && (
            <div className="absolute right-0 top-[40px] w-[200px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-3 z-50 gap-[10px]">
              <p className="text-white font-medium mb-2">Hello, {userName}!</p>

              {/* Change Name */}
              <button
                className="w-full px-2 py-1 
                bg-white/10 backdrop-blur-md 
                  border border-white/20 
                  rounded-xl shadow-xl p-4 z-50
                  hover:scale-95
                text-gray-200
                 mb-3 transition-all duration-200"
                onClick={changeName}
              >
                Change Name
              </button>

              {/* Change Photo */}
              {/* <label className="w-full px-2 py-1
              bg-white/10 backdrop-blur-md 
                  border border-white/20 
                  rounded-xl shadow-xl p-4 z-50
                  hover:scale-95
                text-gray-200
               mb-1 cursor-pointer text-center transition-all duration-200">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={changePhoto}
                />
              </label> */}
            </div>
          )}
        </div>

        {/* Settings Icon */}
        <div
          className="icon cursor-pointer hover:text-cyan-400 transition-colors"
          onClick={() => setShowSettings(!showSettings)}
        >
          <RiSettings3Fill />
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div
            className="absolute right-0 top-[90px] w-[260px] 
                  bg-white/10 backdrop-blur-md 
                  border border-white/20 
                  rounded-2xl shadow-xl p-4 z-50"
          >
            <h4 className="text-white font-semibold mb-3">⚙️ Settings</h4>

            {/* Start New */}
            <button
              onClick={handleReload}
              className="w-full px-3 py-2 
              bg-white/10 backdrop-blur-md 
                  border border-white/20 
                  rounded-2xl shadow-xl p-4 z-50  text-gray-900 hover:scale-95 font-medium transition mb-2"
            >
               Start New
            </button>

            {/* Font Size Adjuster */}
            <div className="mb-2">
              <label className="text-white font-medium mb-1 block">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                className="w-full"
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>

            {/* Reset Defaults */}
            <button
              onClick={resetDefaults}
              className="w-full px-3 py-2 
              bg-white/10 backdrop-blur-md 
                  border border-white/20 
                  rounded-2xl shadow-xl p-4 z-50
                  hover:scale-95
                text-gray-900 font-medium transition"
            >
               Reset Defaults
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
