import { HOTEL } from "@/lib/constants";

export default function GoogleMap() {
  const { lat, lng } = HOTEL.coordinates;

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm">
      <iframe
        title="Desert Moon Hotel Location"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE5JzU0LjUiTiAxMTDCsDEwJzQyLjEiVw!5e0!3m2!1sen!2smx!4v1234567890`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale-[30%]"
      />
    </div>
  );
}
