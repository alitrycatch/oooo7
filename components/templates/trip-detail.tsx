"use client";

import { Location, Trip } from "@/lib/prisma/client";
import Image from "next/image";

import { Calendar, MapPin, Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import TripMap from "../modules/Map";

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActivTab] = useState("overview");
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
        <div className="mt-4 md:mt-0">
          <Link href={`/plans/${trip.id}/itinerary/new`}>
            <Button>
              <Plus className="mr-2 h-5 w-5" /> Add Location
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 shadow rounded-xl">
        <Tabs value={activeTab} onValueChange={setActivTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-lg">
              Overview 😂
            </TabsTrigger>
            <TabsTrigger
              value="itinerary"
              className="text-lg bg-amber-200 text-amber-950"
            >
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg">
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-6 w-6 mr-3 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-700">Dates</p>
                    <p className="text-sm text-gray-500">
                      {trip.startDate.toLocaleDateString()} -{" "}
                      {trip.endDate.toLocaleDateString()}
                      <br />
                      {`${Math.round((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))} days(s)`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 text-gray-600" />
                  <div>
                    <p>Destination</p>
                    <p>
                      {trip.locations.length}{" "}
                      {trip.locations.length === 1 ? "Location" : "Locations"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-72 rounded-lg overflow-hidden shadow">
              <TripMap itineraries={trip.locations} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
