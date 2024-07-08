export default function HowToMovie({ image }: { image: string }) {
  return (
    <video
      style={{
        borderRadius: "10px"
      }}
      width="100%" height="auto" controls autoPlay loop muted playsInline>
      <source src={image} type="video/mp4" />
    </video>
  )
}