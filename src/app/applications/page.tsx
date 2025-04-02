"use client";
import { useEffect, useState } from "react";

export interface Application {
  id: number;
  company_name: string;
  job_offer_link: string;
  date: string;
  mission: string;
  status: string;
  python: boolean;
  django: boolean;
  html_css: boolean;
  javascript: boolean;
  typescript: boolean;
  react: boolean;
  next: boolean;
  tailwind: boolean;
  node: boolean;
  vuejs: boolean;
  devops: boolean;
  java: boolean;
  angular: boolean;
  php: boolean;
  ruby: boolean;
  go: boolean;
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);

  const stackKeys = [
    "python",
    "django",
    "html_css",
    "javascript",
    "typescript",
    "react",
    "next",
    "tailwind",
    "node",
    "vuejs",
    "devops",
    "java",
    "angular",
    "php",
    "ruby",
    "go",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/applications/");
        if (!response.ok) {
          throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Erreur lors du fetch des applications :", error);
      }
    };
    loadData();
  }, []);

  if (!applications.length)
    return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid gap-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">
                {application.company_name}
              </h2>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  application.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {application.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-2">
              Date :{" "}
              {new Date(application.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <a
              href={application.job_offer_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Voir l’offre
            </a>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {Object.entries(application)
                .filter(
                  ([key, value]) => value === true && stackKeys.includes(key)
                )
                .map(([tech]) => (
                  <span
                    key={tech}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
