import { ReadingProgress } from '@/components/ReadingProgress';

export default function WorkLayout({ children }: { children: React.ReactNode }) {
 return <><ReadingProgress/>{children}</>;
}
