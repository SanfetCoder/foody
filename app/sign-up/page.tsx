"use client";
import { signUp } from "@/libs/auth.service";
import { createRestaurant } from "@/libs/restaurants.service";
import { uploadImage } from "@/libs/storage.service";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [restaurantAddress, setRestaurantAddress] = useState("");

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }

      if (!password.trim()) {
        toast.error("Password is required");
        return;
      }

      if (!confirmPassword.trim()) {
        toast.error("Confirm password is required");
        return;
      }

      if (!restaurantName.trim()) {
        toast.error("Restaurant name is required");
        return;
      }

      if (!profileImage) {
        toast.error("Profile image is required");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (!restaurantAddress.trim()) {
        toast.error("Restaurant address is required");
        return;
      }

      const {user} = await signUp(email, password);

      if (!user) throw new Error("No user found")

      await createRestaurant({
        id : user.id,
        name: restaurantName,
        address: restaurantAddress,
        email,
      });

      await uploadImage("restaurants",  `${user.id}/image.png`, profileImage)

      toast.success("Sign up successfully");
    } catch (error: any) {
      toast.error(error.message)
    }
  };

  const handleImageUpload = (e: any) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <label htmlFor="profile-image" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profile-image"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="restaurant-name" className="block font-medium mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurant-name"
              placeholder="Enter your restaurant name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="restaurant-address"
              className="block font-medium mb-2"
            >
              Restaurant Address
            </label>
            <input
              type="text"
              id="restaurant-address"
              placeholder="Enter your restaurant address"
              value={restaurantAddress}
              onChange={(e) => setRestaurantAddress(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
