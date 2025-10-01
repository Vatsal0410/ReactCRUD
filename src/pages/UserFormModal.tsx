import type { FC } from "react";
import UserForm from "./UserForm";
import type { User } from "../store/userStore";

interface UserFormModalProps {
  user: User | null;
  onSave: (user: {
    id?: string;
    name: string;
    email: string;
    department: string;
  }) => void;
  onClose: () => void;
}

const UserFormModal: FC<UserFormModalProps> = ({ user, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-105">
        <div className="absolute -top-4 -right-4">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:rotate-90"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-1">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl p-6 text-white">
            <h2 className="text-2xl font-bold">
              {user ? "Update User" : "Add New User"}
            </h2>
            <p className="text-blue-100 mt-1">
              {user
                ? "Update user information"
                : "Add a new team member to your organization"}
            </p>
          </div>

          <div className="p-6">
            <UserForm
              user={user || undefined}
              onSave={onSave}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
