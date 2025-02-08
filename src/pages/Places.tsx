
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Phone, Globe, MapPin, Clock, Ticket, User2, Facebook, Instagram, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Place = Database["public"]["Tables"]["places"]["Row"];

const Places = () => {
  useEffect(() => {
    document.title = "Lugares | Vale Notícias";
  }, []);

  const { data: places, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SubNav />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Lugares</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places?.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {place.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 space-y-4">
                  <h2 className="text-xl font-semibold">{place.name}</h2>
                  
                  {place.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {place.description}
                    </p>
                  )}

                  <div className="space-y-2">
                    {place.address && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{place.address}</span>
                      </div>
                    )}

                    {place.owner_name && (
                      <div className="flex items-center gap-2 text-sm">
                        <User2 className="w-4 h-4 text-gray-500" />
                        <span>{place.owner_name}</span>
                      </div>
                    )}

                    {place.opening_hours && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{place.opening_hours}</span>
                      </div>
                    )}

                    {place.entrance_fee && (
                      <div className="flex items-center gap-2 text-sm">
                        <Ticket className="w-4 h-4 text-gray-500" />
                        <span>{place.entrance_fee}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t flex flex-wrap gap-3">
                    {place.phone && (
                      <a
                        href={`tel:${place.phone}`}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}

                    {place.whatsapp && (
                      <a
                        href={`https://wa.me/${place.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}

                    {place.website && (
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}

                    {place.social_media && (
                      <>
                        {(place.social_media as any).facebook && (
                          <a
                            href={(place.social_media as any).facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}
                        {(place.social_media as any).instagram && (
                          <a
                            href={(place.social_media as any).instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-pink-600 hover:text-pink-800"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                      </>
                    )}

                    {place.maps_url && (
                      <a
                        href={place.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                      >
                        <MapPin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Places;
