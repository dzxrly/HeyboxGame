function shuffle (arr) {
  let i = arr.length
  while (i) {
    let j = Math.floor(Math.random() * i--)
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
} // 洗牌算法
function isEqual (x1, y1, x2, y2, arr) {
  if (arr[x1][y1] === arr[x2][y2]) return true
  else return false
} // 判断两个选择是否相等
function isBlocked (x, y, arr) {
  if (arr[x][y] !== '#') {
    return true
  } else return false
} // 检测该坐标是否有阻挡
function isHorizenClear (x1, y1, x2, y2, arr) {
  if (x1 === x2 && y1 === y2) return false
  if (x1 !== x2) return false
  let startPoint = Math.min(y1, y2)
  let endPoint = Math.max(y1, y2)
  for (let i = startPoint + 1; i < endPoint; i++) {
    if (isBlocked(x1, i, arr)) {
      return false
    }
  }
  return true
} // 检测水平路径是否有阻挡
function isVerticalClear (x1, y1, x2, y2, arr) {
  if (x1 === x2 && y1 === y2) return false
  if (y1 !== y2) return false
  let startPoint = Math.min(x1, x2)
  let endPoint = Math.max(x1, x2)
  for (let i = startPoint + 1; i < endPoint; i++) {
    if (isBlocked(i, y1, arr)) {
      return false
    }
  }
  return true
} // 检测垂直路径是否有阻挡
function turnOnceClear (x1, y1, x2, y2, arr) {
  if (x1 === x2 && y1 === y2) return false
  let cX = x1
  let cY = y2
  let dX = x2
  let dY = y1
  let flagHorizen = false
  let flagVertical = false
  if (isBlocked(cX, cY, arr) === false) {
    flagHorizen = isHorizenClear(x1, y1, cX, cY, arr) && isVerticalClear(cX, cY, x2, y2, arr)
  }
  if (isBlocked(dX, dY, arr) === false) {
    flagVertical = isHorizenClear(x2, y2, dX, dY, arr) && isVerticalClear(dX, dY, x1, y1, arr)
  }
  if (flagHorizen || flagVertical) return true
  return false
} // 检测路径中只有一次拐角的情况
function turnTwiceClear (x1, y1, x2, y2, arr, maxXNumber, maxYNumber) {
  if (x1 === x2 && y1 === y2) return false
  for (let i = 0; i < maxXNumber; i++) {
    for (let j = 0; j < maxYNumber; j++) {
      if (i !== x1 && i !== x2 && j !== y1 && j !== y2) continue
      if ((i === x1 && j === y1) || (i === x2 && j === y2)) continue
      if (isBlocked(i, j, arr)) continue
      if (turnOnceClear(x1, y1, i, j, arr) && (isHorizenClear(i, j, x2, y2, arr) || isVerticalClear(i, j, x2, y2, arr))) return true
      if (turnOnceClear(i, j, x2, y2, arr) && (isHorizenClear(x1, y1, i, j, arr) || isVerticalClear(x1, y1, i, j, arr))) return true
    }
  }
  return false
} // 检测路径中有两次拐角的情况
function isRemove (x1, y1, x2, y2, arr, maxXNumber, maxYNumber) {
  let equalFlag = isEqual(x1, y1, x2, y2, arr)
  if (isHorizenClear(x1, y1, x2, y2, arr) && equalFlag) {
    console.log('水平')
    return true
  }
  if (isVerticalClear(x1, y1, x2, y2, arr) && equalFlag) {
    console.log('垂直')
    return true
  }
  if (turnOnceClear(x1, y1, x2, y2, arr) && equalFlag) {
    console.log('一次拐角')
    return true
  }
  if (turnTwiceClear(x1, y1, x2, y2, arr, maxXNumber, maxYNumber) && equalFlag) {
    console.log('二次拐角')
    return true
  }
  return false
} // 最终判断
export { shuffle, isEqual, isBlocked, isHorizenClear, isVerticalClear, turnOnceClear, turnTwiceClear, isRemove }
