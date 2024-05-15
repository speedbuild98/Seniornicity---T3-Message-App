interface SubtitleProps {
  text: string;
}

export default function Subtitle({ text }: SubtitleProps) {
  return (
    <h2 className="text-lg text-center">
      {text}
    </h2>
  )
}
