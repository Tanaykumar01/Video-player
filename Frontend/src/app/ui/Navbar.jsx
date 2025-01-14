"use client";
import Link from "next/link";
import Search from "./Search";
import { BellIcon, HamburgerMenuIcon, ViewGridIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { checkUserLogin } from "@/api/auth";
import Image from "next/image";
import User from "./navbar/User";
import { LogInIcon, LucideVideo } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userSetting, setUserSetting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check user login status
  useEffect(() => {
    const checkLoginStatus = async () => {
      const currentUser = await checkUserLogin();
      setUser(currentUser);
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const handleUserSetting = (userSetting) => {
    setUserSetting(!userSetting);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="relative flex items-center justify-between px-6 py-4 bg-[#0f0f0f] border-b-2 border-[#383838]">
      {/* Start Section */}
      <div className="flex items-center space-x-6 w-[15vw]">
        <button className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
          <HamburgerMenuIcon className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-white">
            <ViewGridIcon className="w-6 h-6" />
          </Link>
          <Link href="/" className="text-xl font-bold text-white">
            Streamline
          </Link>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex-1 max-w-lg mx-10">
        <Search placeholder={"Search..."} />
      </div>

      {/* End Section */}
      {user ? (
        <div className="flex items-center space-x-6 relative">
          <div className="relative group">
            <Link href="/user/studio/content">
              <div className="text-white hover:text-gray-300 hover:bg-[#383838] p-2 rounded-full cursor-pointer transition-colors duration-200">
                <LucideVideo className="w-6 h-6" />
              </div>
              <span className="absolute mt-2 right-0.5 hidden group-hover:block bg-[#383838] text-white text-sm p-2 rounded-md z-50">
                Create
              </span>
            </Link>
          </div>
          <div className="relative group">
            <div className="text-white hover:text-gray-300 hover:bg-[#383838] p-2 rounded-full cursor-pointer transition-colors duration-200">
              <BellIcon className="w-6 h-6" />
            </div>
            <span className="absolute mt-2 right-0.5 hidden group-hover:block bg-[#383838] text-white text-sm p-2 rounded-md z-50">
              Notifications
            </span>
          </div>
          <div className="text-white hover:text-gray-300 cursor-pointer transition-colors duration-200 relative">
            <Image
              alt="user avatar"
              src={user.avatar}
              height={50}
              width={50}
              className="rounded-full w-12 h-12"
              priority
              onClick={() => {
                setUserSetting(!userSetting);
              }}
            />
            {userSetting && (
              <div className="absolute transform -translate-x-1/2 top-full bg-[#383838] z-50 w-[20vw] h-[90vh] max-w-xs rounded-lg shadow-lg">
                <User onClickDiv={handleUserSetting} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link href="/user/login" className="text-white">
          <div className="flex flex-row gap-2">
            <LogInIcon className="w-6 h-6 text-white" />
            Login
          </div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
