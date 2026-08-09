import Hero from '../components/Hero'
import ImpactStats from '../components/ImpactStats'
import AnimalSection from '../components/AnimalSection'
import NearbyAnimals from '../components/NearbyAnimals'

function Home() {
  return (
    <main>
      <Hero />
      <ImpactStats />
      <AnimalSection />
      <NearbyAnimals />
    </main>
  )
}

export default Home