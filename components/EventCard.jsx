"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const EventCard = ({ event, isFavorite, handleTagClick, handleAddFavorite,handleRemoveFavorite, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
// console.log({event, isFavorite});
  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  // const handleCopy = () => {
  //   setCopied(post.prompt);
  //   navigator.clipboard.writeText(post.prompt);
  //   setTimeout(() => setCopied(""), 3000);
  // };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          // onClick={handleProfileClick}
        >
          {/* <Image
            className="object-contain"
            alt="user_image"
            src={event.photo.url}
            width={60}
            height={60}
          /> */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              📆 - {event.title}
            </h3>
            {/* <p className="font-inter text-sm text-gray-500">
              start_date : {event.start_date}
              <br />
              end_date : {event.end_date}
              <br />
              Guests inscrits : {event.guest_count}
            </p> */}
          </div>
        </div>
        <div className="flex flex-col gap-3">
        <button onClick={() => isFavorite ? handleRemoveFavorite(event) : handleAddFavorite(event)} className="copy_button">
            <Image
              width={20}
              height={20}
              alt="copy button"
              src={isFavorite ? "/assets/icons/filled-star.svg" : "/assets/icons/empty-star.svg"}
              />
          </button>
          <a
            target="_blank"
            className="copy_button"
            href={`https://app.eventmaker.io/?locale=fr&redirected_event_id=${event._id}`}
            rel="noopener noreferrer"
          >
            <Image
              width={20}
              height={20}
              alt="copy button"
              src={"/assets/icons/external-link.svg"}
            />
          </a>

          <a
            target="_blank"
            className="copy_button"
            href={`https://${event.website_domain_name}`}
            rel="noopener noreferrer"
          >
            <Image
              width={20}
              height={20}
              alt="copy button"
              src={"/assets/icons/website.svg"}
            />
          </a>
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
