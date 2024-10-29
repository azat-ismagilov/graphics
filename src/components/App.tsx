import { useEffect, useRef } from 'react'
import { saveAs } from 'file-saver'
import { split } from 'canvas-hypertxt'
import svgImage from 'assets/region.svg'

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const img = new Image()
    img.src = svgImage
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const drawText = (text: string, x: number, y: number, width: number) => {
        const fontSize = 38
        const font = `${fontSize}px Helvetica`
        ctx.font = font
        ctx.textBaseline = 'top'
        const lines = split(ctx, text, font, width, false)
        for (const line of lines) {
          ctx.fillText(line, x, y)
          y += fontSize
        }
      }
      drawText('foundation', 75, 134, 171)
    }
  }, [])

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, 'canvas-image.png')
      }
    })
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={246}
        height={400}
        style={{ border: '1px solid #000' }}
      />
      <button type="button" onClick={saveCanvasAsImage}>
        Save Canvas as Image
      </button>
    </div>
  )
}

export default App
