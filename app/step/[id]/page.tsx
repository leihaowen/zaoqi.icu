import StepPageClient from './StepPageClient'

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
  ]
}

interface StepPageProps {
  params: {
    id: string
  }
}

export default function StepPage({ params }: StepPageProps) {
  return <StepPageClient id={params.id} />
}