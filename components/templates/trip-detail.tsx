"use client";

import { Trip } from "@/app/generated/prisma/browser";
import Image from "next/image";

import { Calendar } from "lucide-react";

interface TripDetailClientProps {
  trip: Trip;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-97 overflow-hidden rounded-xl shadow-lg relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}
      <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center ">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-700">
            {trip.title}
          </h1>
        </div>
        <div className="flex items-center text-gray-500 mt-2">
          <Calendar className="mr-2 h-5 w-5" />
          <span className="text-lg">
            {trip.startDate.toLocaleDateString()} -{" "}
            {trip.endDate.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
