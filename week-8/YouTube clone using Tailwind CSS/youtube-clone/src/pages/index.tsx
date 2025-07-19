import { Geist_Mono } from 'next/font/google'
import { VideoGrid } from '@/components/VideoGrid'
import { AppBar } from '@/components/AppBar'

const geistMono = Geist_Mono({ subsets: ['latin'] }) 

export default function Home() {
  return (
    <main className={geistMono.className}>
      <AppBar/>
      <VideoGrid />
    </main>
  )
}