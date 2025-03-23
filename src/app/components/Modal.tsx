"use client";
import { useRef } from "react";
import type { ContentType } from "../../types/types";
import contentData from "../../../data/content.json";

interface ModalProps {
  companyName: string;
  companyMission: string;
  companyTechStack_same: string;
  companyTechStack_other: string;
}

export default function Modal({
  companyName,
  companyMission,
  companyTechStack_same,
  companyTechStack_other,
}: ModalProps) {
  const content = contentData as ContentType;
  const textRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      if (!textRef.current) {
        alert("Aucun texte à copier");
        return;
      }
      const response = await navigator.clipboard.writeText(
        textRef.current.innerText
      );
      alert("Texte copié !");
      return response;
    } catch (error) {
      alert("Erreur lors de la copie.");
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="w-8/10 mx-auto p-6 border border-gray-300 rounded shadow-md bg-white">
      {companyName && (
        <>
          <div ref={textRef}>
            <p className="whitespace-pre-wrap text-lg mb-4">
              {content.staticParts.base
                .replace("[companyName]", companyName)
                .replace(
                  "[companyMission]",
                  content.companyMission[companyMission]
                )}
            </p>
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
            onClick={handleCopy}
          >
            Copier le texte
          </button>
        </>
      )}
    </div>
  );
}
