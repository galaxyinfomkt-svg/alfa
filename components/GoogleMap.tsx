export default function GoogleMap() {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2958.933614404526!2d-71.4432248!3d42.13030439999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47298644955b972f%3A0x8c1725e39d846b9d!2sAlfa%20Construction%20Inc.!5e0!3m2!1sen!2sbr!4v1772039393624!5m2!1sen!2sbr"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Alfa Construction Inc Location"
        className="w-full"
      />
    </div>
  );
}
