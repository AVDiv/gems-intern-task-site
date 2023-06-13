//  Predefined Components
import Image from "next/image"
// Custom Components
import { Navbar } from "../components/Navbar"
import { ContactForm } from "../components/ContactForm"
import { Footer } from "../components/Footer"
// Images
import BackgroundImage from "../public/background.jpg"

export default function FrontendTask() {
  return (
    <>
      <Navbar />
      <div className="flex items-stretch min-h-screen">
        <div className="min-h-screen hidden lg:block">
          <Image 
          src={BackgroundImage}
          alt="Background Image"
          loading="lazy"
          className="min-h-full"
          style={{objectFit: "cover"}}
          />
        </div>
        <div className="flex w-full justify-center items-center">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  )
}