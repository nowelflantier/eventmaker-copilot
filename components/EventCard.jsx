"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const EventCard = ({ event, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          // onClick={handleProfileClick}
        >
          <Image
            className="object-contain rounded-full"
            alt="user_image"
            src={event.photo.url}
            width={40}
            height={40} 
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              Nom : {event.title}
            </h3>
            <p className="font-inter text-sm text-gray-500">
            organizer : {event.organizer}<br/>
            start_date : {event.start_date}<br/>
            end_date : {event.end_date}<br/>
            timezone : {event.timezone}<br/>
            website_domain_name : {event.website_domain_name}<br/>
            guest_count : {event.guest_count}<br/>
            primary_color : {event.primary_color}<br/>
            secondary_color : {event.secondary_color}<br/>
            </p>
          </div>
        </div>
        <div className="copy_button" onClick={handleCopy}>
          <Image
            width={12}
            height={12}
            alt="copy button"
            src={
              copied === event.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      {/* <p className="my-4 font-satoshi text-sm text-gray-700">{event.description}</p> */}
      {/* <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        // onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p> */}
      {/* {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}
    </div>
  );
};

export default EventCard;
