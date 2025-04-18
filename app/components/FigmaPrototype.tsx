import type React from "react"

const FigmaPrototype: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-video">
      <iframe
        className="w-full h-full"
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
        src="https://embed.figma.com/proto/iYN0cwmAGPiKj8PPxSGz5Y/Prototype?node-id=110-19931&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A46&show-proto-sidebar=1&embed-host=share"
        allowFullScreen
      />
    </div>
  )
}

export default FigmaPrototype
