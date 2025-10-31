import React from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

const posts = [
  {
    id: 1,
    name: "Harsh Zadafiya",
    username: "@harshzadafiya",
    time: "2h ago",
    content: "Just finished building my Netflix Clone 🚀🔥",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    id: 2,
    name: "CodeMaster",
    username: "@codemaster",
    time: "5h ago",
    content: "React + Tailwind combo is pure magic ✨",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
];

const HomeFeed = () => {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-2xl shadow p-5 border border-gray-100"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${post.name}`}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.name}</p>
                <p className="text-gray-500 text-sm">
                  {post.username} • {post.time}
                </p>
              </div>
            </div>
            <MoreHorizontal className="text-gray-500 w-5 h-5" />
          </div>

          {/* Content */}
          <p className="text-gray-800 mb-3">{post.content}</p>

          {/* Image (optional) */}
          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="w-full rounded-xl mb-3 object-cover max-h-80"
            />
          )}

          {/* Actions */}
          <div className="flex justify-between text-gray-500 text-sm">
            <button className="flex items-center gap-2 hover:text-pink-500">
              <Heart className="w-5 h-5" /> Like
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500">
              <MessageCircle className="w-5 h-5" /> Comment
            </button>
            <button className="flex items-center gap-2 hover:text-green-500">
              <Share2 className="w-5 h-5" /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;
