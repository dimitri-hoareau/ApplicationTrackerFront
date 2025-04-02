"use client";
import { useRef, useState, useEffect } from "react";
import type { ContentType } from "../types/types";
import contentData from "../../data/content.json";

interface ModalProps {
  textSizeLong: boolean;
  link: string;
  companyName: string;
  companyMission: string;
  techSame: TechState;
  techOther: TechState;
  companyTechStack_same: string;
  companyTechStack_other: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  setCompanyMission: React.Dispatch<React.SetStateAction<string>>;
  setTechSame: React.Dispatch<React.SetStateAction<TechState>>;
  setTechOther: React.Dispatch<React.SetStateAction<TechState>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  initialTechSame: TechState;
  initialTechOther: TechState;
}

interface TechState {
  [key: string]: boolean;
}

export default function Modal({
  textSizeLong,
  link,
  companyName,
  companyMission,
  techSame,
  techOther,
  companyTechStack_same,
  companyTechStack_other,
  setCompanyName,
  setCompanyMission,
  setTechSame,
  setTechOther,
  setLink,
  initialTechSame,
  initialTechOther,
}: ModalProps) {
  const content = contentData as ContentType;
  const textRef = useRef<HTMLDivElement>(null);
  const [firstContent, setFirstContent] = useState("");

  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.textContent = firstContent;
    }
  }, [firstContent]);

  useEffect(() => {
    const textContent = content.staticParts.join_company
      .replace("[companyName]", companyName)
      .replace("[companyMission]", content.companyMission[companyMission]);
    setFirstContent(textContent);
  }, [companyMission, companyName]);

  const handleCopy = async () => {
    try {
      if (!textRef.current) {
        alert("Aucun texte à copier");
        return;
      }
      const response = await navigator.clipboard.writeText(
        textRef.current.innerText
      );
      return response;
    } catch (error) {
      alert("Erreur lors de la copie.");
      console.error("Erreur:", error);
    }
  };

  const handleRestore = () => {
    setCompanyName("");
    setLink("");
    setCompanyMission("standard");
    setTechSame(initialTechSame);
    setTechOther(initialTechOther);
  };

  const handlePost = async () => {
    const payload = {
      job_offer_link: link,
      company_name: companyName,
      mission: companyMission,
      ...techSame,
      ...techOther,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/applications/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'envoi : ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Réponse de l'API :", data);
      handleRestore();
    } catch (error) {
      console.error("Erreur lors de la requête POST :", error);
    }
  };

  const handleSubmit = () => {
    handleCopy();
    handlePost();
  };

  return (
    <div className="w-8/10 mx-auto p-6 border border-gray-300 rounded shadow-md bg-white">
      {companyName && (
        <>
          <div ref={textRef}>
            <p className="whitespace-pre-wrap text-lg mb-4">
              {textSizeLong
                ? content.staticParts.base_long
                : content.staticParts.base}
            </p>
            <p
              contentEditable="true"
              ref={contentRef}
              className="whitespace-pre-wrap text-lg mb-4"
            ></p>
            <p
              className={`${
                companyTechStack_other ? "text-lg" : "text-lg mb-4"
              } whitespace-pre-wrap`}
            >
              {content.staticParts.tech_experience.replace(
                "[companyTechStack_same]",
                companyTechStack_same
              )}
            </p>

            <p className="whitespace-pre-wrap text-lg mb-4">
              {companyTechStack_other &&
                content.staticParts.tech_objectives.replace(
                  "[companyTechStack_other]",
                  companyTechStack_other
                )}
            </p>

            <p className="whitespace-pre-wrap text-lg mb-4">
              {content.staticParts.personal_traits}
            </p>
            <p className="whitespace-pre-wrap text-lg mt-6">
              {content.staticParts.closing}
            </p>
            <p className="whitespace-pre-wrap text-lg mt-4">
              {content.staticParts.signature}
            </p>
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Copy & Save
          </button>
        </>
      )}
    </div>
  );
}
