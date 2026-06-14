"use server";

import { auth } from "@/auth";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function geocodeaddress(address: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
    {
      headers: {
        "User-Agent": "travel-app/1.0",
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );
  const data = await res.json();
  if (!data.length) {
    throw new Error("Address not found");
  }

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
  };
}

export default async function addLocation(formData: FormData, tripId: string) {
  console.log("acton");
  const session = await auth();
  if (!session) {
    throw new Error("unauthorized!");
  }
  const address = formData.get("address")?.toString();

  if (!address) {
    throw new Error("missing address!");
  }
  const { lat, lng } = await geocodeaddress(address);
  console.log(lat, lng);
  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });
  redirect(`/plans/${tripId}`);
}
