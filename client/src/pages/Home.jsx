import Hero from '../components/Hero'
import ImpactStats from '../components/ImpactStats'
import AnimalSection from '../components/AnimalSection'
import NearbyAnimals from '../components/NearbyAnimals'
import PawHeroes from '../components/PawHeroes'
import SuccessStories from '../components/SuccessStories'
import ReportCTA from '../components/ReportCTA'
import MyReports from '../components/MyReports'
import Footer from '../components/Footer'

function Home() {
  return (
    <main>
      <Hero />

      <ImpactStats />

      <AnimalSection />

      <NearbyAnimals />

      <PawHeroes />

      <SuccessStories />

      <ReportCTA />

      <MyReports />

      <Footer />
    </main>
  )
}

export default Home