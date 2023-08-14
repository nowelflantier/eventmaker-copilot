"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useUser } from "@utils/UserContext";
import Form from "@components/Form";

const EditProfil = ({params}) => {
  const [submitting, setSubmitting] = useState(false);
const router= useRouter();
    const {user, id, token} = useUser();
    const [userData, setUserData] = useState([]);
    const [userToken, setUserToken] = useState("")

    useEffect(() => {
      setUserData({
        userName: user,
        token: token || "",
        id: id
      })
    }, [user])
    

    const updateToken = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            token: userData.token,       
          }),
        });
        console.log(response);
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <section className="w-full">
    <h1 className="head_text text-left">
    Modifier le token de <span className="green_gradient">{user}</span>
    </h1>
    <p className="desc text-left">Ajoutez votre token Eventmaker pour connecter vos évènements à Eventmaker Copilot.</p>
    <Form
      type="Ajouter"
      setUserData={setUserData}
      submitting={submitting}
      handleSubmit={updateToken}
      userData={userData}
    />
  </section>
  )
}

export default EditProfil


