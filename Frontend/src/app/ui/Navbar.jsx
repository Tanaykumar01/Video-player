'use client'
import Link from "next/link";
import Search from "./Search";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState , useEffect } from "react";
import { checkUserLogin } from "@/api/auth";
import Image from "next/image";
import User from "./navbar/User";

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
            Icon
          </Link>
          <Link href="/" className="text-xl font-bold text-white">
            Streami
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
            <div className="text-white hover:text-gray-300 cursor-pointer transition-colors duration-200">
              Create
            </div>
            <div className="text-white hover:text-gray-300 cursor-pointer transition-colors duration-200">
              Notification
            </div>
            <div className="text-white hover:text-gray-300 cursor-pointer transition-colors duration-200 relative">
              <Image
                alt="user avatar"
                src={user.avatar}
                height={50}
                width={50}
                className="rounded-full w-12 h-12"
                onClick={() => {
                  setUserSetting(!userSetting);
                }}
              />
              {userSetting && (
                <div className="absolute top-[60px] w-[20vw] bg-[#383838] shadow-md rounded-lg z-50">
                  <User />
                </div>
              )}
            </div>
          </div>
      ) : (
        <div>login</div>
      )}
    </div>
  );
};

export default Navbar;
