
import wordlist from './wordlist.js'

export function colorsToBits(data) {
    let out = []
    for (var x of data) {
        let str = num2binstr(x.color).substr(-4)
        let bin = binstr2arr(str)
        out.push(...bin)
    }
    return out
}

export function bitsToColors(data) {
    let out = []
    for (var i = 0; i < data.length; i+=4) {
        let str = data.slice(i, i + 4).join('')
        out.push({color: parseInt(str, 2)})
    }
    return out
}

export function bitsToHexKey(data) {
    let out = ''
    for (var i = 0; i < data.length; i+=8) {
        let str = data.slice(i, i + 8).join('')
        out += parseInt(str, 2).toString(16)
    }
    return out
}

// First version (loop the password)
/*export function passToBits(str) {
    let out = []
    for (var i = 0; i < str.length; i++) {
        let num = str.charCodeAt(i) - 32
        let arr = binstr2arr(num.toString(2))
        out.push(...arr)
    }
    return loopPass(out)
}*/

// Second version (hash the password)
export async function passToBits2(str) {
    let out = []
    if (str.length === 0) return Array(256).fill(0)
    const encoder = new TextEncoder()
    const data = encoder.encode(str + 'SBW')
    const hash = await crypto.subtle.digest('SHA-256', data)
    let hview = new Uint8Array(hash)
    for (var x of hview) {
        out.push(...binstr2arr(pad(x.toString(2), 8)))
    }
    return out
}

export function XOR(base, mod) {
    let out = []
    if (base.length !== mod.length) return []
    for (var i = 0; i < base.length; i++) {
        let a = base[i]
        let b = mod[i]
        out.push(+(a !== b)) // Emulates XOR
    }
    return out
}

export async function bitsToSeedPhrase(data) {
    let out = []
    let buff = new Uint8Array(bitsToBytes(data))
    let hash = await crypto.subtle.digest('SHA-256', buff);
    let hview = new Uint8Array(hash)
    let sum = binstr2arr(pad(hview[0].toString(2), 8))
    let bits = data.concat(sum)
    for (var i = 0; i < bits.length; i+=11) {
        let str = bits.slice(i, i + 11).join('')
        let index = parseInt(str, 2)
        out.push(wordlist[index])
    }
    return out
}

function binstr2arr(str) {
    let out = []
    for (var i = 0; i < str.length; i++) {
        out.push(parseInt(str.charAt(i)))
    }
    return out
}

function num2binstr(nMask) {
    // nMask must be between -2147483648 and 2147483647
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
        nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask;
}

function loopPass(arr) {
    if (arr.length >= 256) return arr.slice(0, 256)
    if (arr.length === 0) return Array(256).fill(0)
    let out = []
    while (out.length < 256) {
        out.push(...arr)
    }
    return out.slice(0, 256)
}

export function bitsToBytes(data) {
    let out = []
    for (var i = 0; i < data.length; i+=8) {
        let str = data.slice(i, i + 8).join('')
        out.push(parseInt(str, 2))
    }
    return out
}

function pad(num, size) {
    return ('000000000' + num).substr(-size)
}
