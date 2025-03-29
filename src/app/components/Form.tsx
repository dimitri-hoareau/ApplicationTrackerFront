"use client";

import { useState } from "react";
import Modal from "../components/Modal";
import type { ContentType } from "../../types/types";
import contentData from "../../../data/content.json";

interface TechState {
  [key: string]: boolean;
}

export default function Form() {
  const content = contentData as ContentType;
  const [companyName, setCompanyName] = useState("");
  const [companyMission, setCompanyMission] = useState("standard");

  const initialTechSame: TechState = {
    python: false,
    django: false,
    html_css: false,
    javascript: false,
    typescript: false,
    react: false,
    next: false,
    tailwind: false,
    node: false,
    vuejs: false,
    devops: false,
  };
  const [techSame, setTechSame] = useState<TechState>(initialTechSame);

  const initialTechOther: TechState = {
    java: false,
    angular: false,
    php: false,
    ruby: false,
    go: false,
  };
  const [techOther, setTechOther] = useState<TechState>(initialTechOther);

  const getTechSameString = () => {
    console.log(techSame);
    const selected = Object.entries(techSame)
      .filter(([_, value]) => value)
      .map(([key]) => content.companyTechStack_same[key]);
    if (selected.length > 1) {
      return (
        selected.slice(0, -1).join(", ") +
        " et " +
        selected[selected.length - 1]
      );
    }
    return selected.join(", ");
  };

  const getTechOtherString = () => {
    const selected = Object.entries(techOther)
      .filter(([_, value]) => value)
      .map(([key]) => content.companyTechStack_other[key]);
    if (selected.length > 1) {
      return (
        selected.slice(0, -1).join(", ") +
        " et " +
        selected[selected.length - 1]
      );
    }
    return selected.join(", ");
  };

  const handleCheckboxChange = (
    type: "same" | "other",
    tech: string,
    checked: boolean
  ) => {
    if (type === "same") {
      setTechSame((prev) => ({ ...prev, [tech]: checked }));
    } else {
      setTechOther((prev) => ({ ...prev, [tech]: checked }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCompanyName("");
    setCompanyMission("standard");
    setTechSame(initialTechSame);
    setTechOther(initialTechOther);
  };

  return (
    <>
      <form className="p-5 max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold">Nom de la société :</label>
          <input
            className={`${
              !companyName && " bg-red-300"
            } block w-full p-2 mt-2 border border-gray-300 rounded`}
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Mission de l'entreprise :</label>
          <select
            className="block w-full p-2 mt-2 border border-gray-300 rounded"
            value={companyMission}
            onChange={(e) => setCompanyMission(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="ed-tech">Ed-Tech</option>
            <option value="ecology">ecology</option>
            <option value="energy">Energy</option>
            <option value="enabling_connections">Connexion</option>
            <option value="health">Health</option>
            <option value="green_mobility">Green mobility</option>
            <option value="géographies">Géographies</option>
            <option value="public">Fonction publique</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold">Technologies maîtrisées :</label>
          <div className="ml-4">
            {Object.entries(techSame).map(([tech, checked]) => (
              <label key={tech} className="block">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    handleCheckboxChange("same", tech, e.target.checked)
                  }
                  className="mr-2"
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold">Technologies à découvrir :</label>
          <div className="ml-4">
            {Object.entries(techOther).map(([tech, checked]) => (
              <label key={tech} className="block">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    handleCheckboxChange("other", tech, e.target.checked)
                  }
                  className="mr-2"
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Copy & Save
        </button>
      </form>

      <Modal
        companyName={companyName}
        companyMission={companyMission}
        companyTechStack_same={getTechSameString()}
        companyTechStack_other={getTechOtherString()}
      />
    </>
  );
}
