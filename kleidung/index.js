const waist = 25
const length = 20
const innerRadius = waist / (2 * Math.PI) - 2
const outerRadius = innerRadius + length

const pixelsPerInch = 107

const pageSizes = {
  a4: {
    portrait: {
      inch: {
        width: 8.27,
        height: 11.69
      },
      mm: {
        width: 210,
        height: 297
      }
    },
    landscape: {
      inch: {
        height: 8.27,
        width: 11.69
      },
      mm: {
        width: 297,
        height: 210
      }
    }
  }
}

const size = Math.ceil(outerRadius + 1)

const pagesAcross = Math.ceil(size / 8.27)
const pagesDown = Math.ceil(size / 11.69)

const pageWidthInches = 6.5
const pageHeightInches = 8.6

const getA4Canvas = () => {
  const canvas = document.createElement('canvas')
  canvas.width = pageWidthInches * pixelsPerInch
  canvas.height = pageHeightInches * pixelsPerInch
  return canvas
}

const referenceCanvas = getA4Canvas()
const referenceCanvasContext = referenceCanvas.getContext('2d')
referenceCanvasContext.strokeRect(0, 0, 4 * pixelsPerInch, 4 * pixelsPerInch)
referenceCanvasContext.strokeText('4 inches x 4 inches reference box', 10, 20)
document.body.appendChild(referenceCanvas)

for (let y = 0; y < pagesDown; y++) {
  for (let x = 0; x < pagesAcross; x++) {
    const canvas = getA4Canvas()
    const context = canvas.getContext('2d')
    const originX = -x * pageWidthInches * pixelsPerInch
    const originY = -y * pageHeightInches * pixelsPerInch
    
    //draw coords
    context.strokeText(`x: ${x + 1}, y: ${y + 1}`, pixelsPerInch, pixelsPerInch)

    //draw borders
    context.strokeRect(0, 0, (pageWidthInches * pixelsPerInch) - 1, (pageHeightInches * pixelsPerInch) - 1)

    //draw pattern
    context.arc(originX, originY, innerRadius * pixelsPerInch, 0, Math.PI * 2, true)
    context.stroke()
    context.arc(originX, originY, outerRadius * pixelsPerInch, 0, Math.PI * 2, true)
    context.stroke()

    document.body.appendChild(canvas)
  }
}