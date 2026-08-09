import Hero from '../components/Hero'
import ImpactStats from '../components/ImpactStats'
import AnimalSection from '../components/AnimalSection'
import NearbyAnimals from '../components/NearbyAnimals'
import PawHeroes from '../components/PawHeroes'

function Home() {
  return (
    <main>
      <Hero />
      <ImpactStats />
      <AnimalSection />
      <NearbyAnimals />
      <PawHeroes />
    </main>
  )
}

export default Home