"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useUser } from "@utils/UserContext";
import Form from "@components/Form";
import { useSession } from "next-auth/react";

const EditProfil = ({ params }) => {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { user, userName, id, token, setToken,setLast_name ,setFirst_name,last_name, first_name } = useUser();
  const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   {!session && router.push('/')}
  // }, [])
  
  useEffect(() => {
    setUserData({
      userName: userName,
      token: user?.token || "",
      id: id,
      last_name: user?.last_name|| "",
      first_name: user?.first_name|| "",
    });
  }, [user]);

  const updateUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: userData.token,
          first_name: userData.first_name,
          last_name: userData.last_name,
        }),
      });
      console.log(response);
      if (response.ok) {
        setToken(token)
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        Modifier le token de <span className="green_gradient">{userName}</span>
      </h1>
      <p className="desc text-left">
        Ajoutez votre token Eventmaker pour connecter vos évènements à
        Eventmaker Copilot.
      </p>
      <Form
        type="Ajouter"
        setUserData={setUserData}
        submitting={submitting}
        handleSubmit={updateUser}
        userData={userData}
        setToken={setToken}
        setFirst_name={setFirst_name}
        setLast_name={setLast_name}
      />
    </section>
  );
};

export default EditProfil;
