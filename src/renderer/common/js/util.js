// fmt: yyyy-MM-dd hh:mm:ss
export function formatTime(str, fmt = 'yyyy-MM-dd') {
    if (!str) return null;
    let date = new Date(parseInt(str))
    let obj = {
      'y': date.getFullYear(),
      'M': date.getMonth() + 1,
      'd': date.getDate(),
      'h': date.getHours(),
      'm': date.getMinutes(),
      's': date.getSeconds()
    }
  
    return fmt.replace(/(y+|M+|d+|h+|m+|s+)/g, function ($0, $1) {
      let time = obj[$1.substr(0, 1)] + ''
      time = time.length == 1 ? ('0' + time) : time;
      return time.substr(time.length - $1.length, $1.length)
    })
  }