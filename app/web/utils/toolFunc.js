export const formatDate = (date, fmt) => {
  date = new Date(date)
  if (isNaN(date.getDate())) return date
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}

export const throttle = (delay, fn, args) => {
  let times = true
  return () => {
    if (times) {
      setTimeout(() => {
        fn(args)
        times = true
      }, delay)
    }
    times = false
  }
}

export const ddPostMsg = data => {
  if (typeof dd !== 'undefined') {
    dd.postMessage(data)
  }
}

export const parseQueryString = querystring => {
  querystring = querystring.charAt(0) === '?' ? querystring.substr(1) : querystring
  let queryObj = {}
  let queryList = querystring.split('&')
  for (let i = 0; i < queryList.length; i++) {
    let item = queryList[i].split('=')
    queryObj[item[0]] = item[1]
  }
  return queryObj
}
