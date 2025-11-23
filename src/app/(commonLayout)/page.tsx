import DoctorListClient from "@/components/modules/Home/DoctorListClient";
import Hero from "@/components/modules/Home/Hero";
import Specialties from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import { getDoctors } from "@/services/admin/doctorManagement";
import Head from "next/head";

export default async function Home() {
  const doctorsResponse = await getDoctors();
  let doctors = doctorsResponse?.data?.data || [];
  // Force convert to pure array → removes custom properties
  doctors = Array.from(doctors);
  // Take only first 6 items
  doctors = doctors.slice(0, 6);


  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Specialties />
        <DoctorListClient doctors={doctors} />
        <Steps />
        <Testimonials />
      </main>
    </>
  );
}
