import "./LoadingAnimation.scss"

export default function LoadingAnimation() {
  return (
    <div className="loading-container">
      <div className="loading">
        <div className="loading__dot" />
        <div className="loading__dot" />
        <div className="loading__dot" />
      </div>
    </div>
  )
}