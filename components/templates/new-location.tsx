"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import addLocation from "@/lib/actions/add-location";

function NewLocationClient({ tripId }: { tripId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl font-bold relative inline-block pb-3">
              Add new location
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-68 h-[2px] bg-gray-200 rounded-full"></span>
            </h1>
          </div>

          <form
            action={(formData: FormData) => {
              startTransition(() => {
                addLocation(formData, tripId);
              });
            }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Address
            </label>

            <input
              name="address"
              type="text"
              required
              className="w-full border mb-3 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                      <Button type="submit" className="w-full cursor-pointer ">
            {isPending ? "adding location..." : "Add"}
          </Button>
          </form>

        </div>
        
      </div>
    </div>
  );
}

export default NewLocationClient;
