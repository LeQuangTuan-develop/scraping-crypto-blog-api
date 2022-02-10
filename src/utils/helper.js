const mongoose = require("mongoose");
// const { getByLanguage } = require('./multilingual');

/**
 * Synchronous an array of promise function.
 * @param {Array} array Array of asynchronous function
 * @param {Function} callback
 */
async function forEachAsync(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Generate a random ID.
 * @param {Number} count ID length
 * @param {Function} k Callback
 */
function generateId(count, k) {
  return new Promise((resolve) => {
    var _sym = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; //abcdefghijklmnopqrstuvwxyz1234567890
    var str = "";

    for (var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * _sym.length)];
    }
    if (k) resolve(k(str));
    else resolve(str);
    // base.getID(str, function(err, res) {
    //     if (!res.length) {
    //       k(str)                   // use the continuation
    //     } else generateId(count, k)  // otherwise, recurse on generate
    // });
  });
}

/**
 * Generate a random ID sync.
 * @param {Number} count ID length
 */
function generateIdSync(count = 8) {
  var _sym = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; //abcdefghijklmnopqrstuvwxyz1234567890
  var str = "";

  for (var i = 0; i < count; i++) {
    str += _sym[parseInt(Math.random() * _sym.length)];
  }

  return str;
}

/**
 * Generate a barcode.
 * @param {String} format Barcode format
 * @param {Function} k Callback
 */
function generateBarcode(format = "ean-13", k) {
  return new Promise((resolve) => {
    var _sym = "1234567890";
    var str = "";
    var count = 8;
    switch (format) {
      case "ean-8":
        count = 8;
        break;
      case "ean-13":
        count = 13;
        break;
    }

    for (var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * _sym.length)];
    }
    if (k) resolve(k(str));
    else resolve(str);
  });
}

/**
 * Generate a random password.
 * @param {Number} count Password length
 * @param {Function} k Callback
 */
function generatePassword(count, k) {
  return new Promise((resolve) => {
    var _sym = "abcdefghijklmnopqrstuvwxyz1234567890~!@#$%^&*()_+-=`;:|<>?,."; //ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
    var str = "";

    for (var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * _sym.length)];
    }
    if (k) resolve(k(str));
    else resolve(str);
  });
}

/**
 * Convert Unicode/UTF-8 to ASCII
 * @param {String} alias Input value
 */
function toASCII(alias = "") {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  //str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'| |"|&|#|\[|\]|~|$|-|_/g, "-")
  /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
  str = str.replace(/ + /g, " "); //thay thế 2- thành 1-
  str = str.replace(/^ +| +$/g, "");
  //cắt bỏ ký tự - ở đầu và cuối chuỗi
  return str;
}

/**
 * Convert Unicode/UTF-8 to Hyphens
 * @param {String} alias Input value
 */
function toHyphens(alias = "") {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'| |"|&|#|\[|\]|~|$|-|_/g,
    "-"
  );
  /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
  str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
  str = str.replace(/^-+|-+$/g, "");
  //cắt bỏ ký tự - ở đầu và cuối chuỗi
  return str;
}

/**
 * Convert Unicode/UTF-8 to Hyphens
 * @param {String} alias Input value
 */
function toUnderscore(alias = "") {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'| |"|&|#|\[|\]|~|$|-|_/g,
    "_"
  );
  /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
  str = str.replace(/_+_/g, "_"); //thay thế 2- thành 1-
  str = str.replace(/^_+|_+$/g, "");
  //cắt bỏ ký tự - ở đầu và cuối chuỗi
  return str;
}

/**
 * Convert Unicode/UTF-8 to Hyphens
 * @param {String} alias Input value
 */
function toCamelCase(alias = "") {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'| |"|&|#|\[|\]|~|$|-|_/g,
    "_"
  );
  /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
  str = str.replace(/_+_/g, "_"); //thay thế 2- thành 1-
  str = str.replace(/^_+|_+$/g, "");
  //cắt bỏ ký tự - ở đầu và cuối chuỗi
  // return str
  var words = str
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return words.charAt(0).toLowerCase() + words.slice(1);
}
/*
function drawLetterAvatar(txt) {
	let Canvas = require('canvas')
	let canvas = new Canvas(100, 100)
	let ctx = canvas.getContext('2d')
	ctx.fillStyle = "#039be5"
    ctx.fillRect(0, 0, 100, 100)
	ctx.font = "30px Roboto, sans-serif"
	ctx.fillStyle = "white"
	ctx.textAlign = "center"
	ctx.fillText(txt, canvas.width / 2, (canvas.height / 2) + (15 / 2))
	return canvas
}
*/
/**
 * Calculate number of days between two dates.
 * @param {Date} start
 * @param {Date} end
 */
function dateDiff(start, end) {
  return Math.round(Math.abs(end - start) / (1000 * 60 * 60 * 24));
}

/**
 *
 * @param {*} l Input list
 * @param {*} f Field to sort
 * @param {*} d Direction
 */
function sort(l, f = null, d = 1) {
  l.sort(function (a, b) {
    if (f) {
      if (a[f] < b[f]) return -1 * d;
      if (a[f] > b[f]) return 1 * d;
    } else {
      if (a < b) return -1 * d;
      if (a > b) return 1 * d;
    }
    return 0;
  });
  return l;
}

/**
 *
 * @param {Number} x Value
 * @param {String} c Local format
 */
function currencyFormating(x, c = ",", type = "long") {
  switch (type) {
    case "short":
      if (typeof x === "object" && "length" in x) {
        const ngan = [
          parseFloat((x[0] / 1000).toFixed(1)),
          parseFloat((x[1] / 1000).toFixed(1)),
        ];
        const trieu = [
          parseFloat((x[0] / 1000000).toFixed(1)),
          parseFloat((x[1] / 1000000).toFixed(1)),
        ];
        const ty = [
          parseFloat((x[0] / 1000000000).toFixed(1)),
          parseFloat((x[1] / 1000000000).toFixed(1)),
        ];
        const priceStrings = [x[0].toString(), x[1].toString()];
        if (ngan[0] >= 1)
          priceStrings[0] = `${ngan[0].toFixed(ngan[0] % 1 > 0 ? 1 : 0)} ngàn`;
        if (ngan[1] >= 1)
          priceStrings[1] = `${ngan[1].toFixed(ngan[1] % 1 > 0 ? 1 : 0)} ngàn`;
        if (trieu[0] >= 1)
          priceStrings[0] = `${trieu[0].toFixed(
            trieu[0] % 1 > 0 ? 1 : 0
          )} triệu`;
        if (trieu[1] >= 1)
          priceStrings[1] = `${trieu[1].toFixed(
            trieu[1] % 1 > 0 ? 1 : 0
          )} triệu`;
        if (ty[0] >= 1)
          priceStrings[0] = `${ty[0].toFixed(ty[0] % 1 > 0 ? 1 : 0)} tỷ`;
        if (ty[1] >= 1)
          priceStrings[1] = `${ty[1].toFixed(ty[1] % 1 > 0 ? 1 : 0)} tỷ`;
        const priceStringsSplits = [
          priceStrings[0].split(" "),
          priceStrings[1].split(" "),
        ];
        return priceStringsSplits[0][1] === priceStringsSplits[1][1]
          ? `${priceStringsSplits[0][0]} - ${priceStringsSplits[1][0]} ${priceStringsSplits[1][1]}`
          : `${priceStrings[0]} - ${priceStrings[1]}`;
      } else {
        const ngan = parseFloat((x / 1000).toFixed(1));
        const trieu = parseFloat((x / 1000000).toFixed(1));
        const ty = parseFloat((x / 1000000000).toFixed(1));
        if (ty >= 1) return `${ty.toFixed(ty % 1 > 0 ? 1 : 0)} tỷ`;
        if (trieu >= 1) return `${trieu.toFixed(trieu % 1 > 0 ? 1 : 0)} triệu`;
        if (ngan >= 1) return `${ngan.toFixed(ngan % 1 > 0 ? 1 : 0)} ngàn`;
        return x.toString();
      }
      break;
    case "long":
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, c);
      break;

    default:
      return x.toString();
      break;
  }
  // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, c)
}

/**
 * Get query parameter of location by name
 * @param {String} name Param name
 */
function getQueryParam(name) {
  name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
    window.location.search
  );
  if (name) return decodeURIComponent(name[1]);
}

/**
 *
 * @param {String} value Check a credit card number is valid or not
 */
function validateCard(value) {
  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  var nCheck = 0,
    nDigit = 0,
    bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
}

/**
 * Convert a date to string by format
 * @param {Date} vd Input value
 * @param {String} format Ex: "dd/mm/yyyy"
 */
function toDateString(vd, format) {
  let d = new Date(vd);
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  let dd = d.getDate();
  let mm = d.getMonth() + 1;
  let yy = d.getFullYear();
  if (!format) return d.toLocaleDateString();
  let rs = format;
  rs = rs
    .replace(
      /hh:mm:ss$/g,
      `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`
    )
    .replace(
      /H:mm:ss$/g,
      `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`
    )
    .replace(
      /dd\/mm\/yy$/g,
      `${dd < 10 ? `0${dd}` : dd}/${mm < 10 ? `0${mm}` : mm}/${`${yy}`.slice(
        2,
        4
      )}`
    )
    .replace(
      /dd\/mm\/yyyy$/g,
      `${dd < 10 ? `0${dd}` : dd}/${mm < 10 ? `0${mm}` : mm}/${yy}`
    )
    .replace(
      /mm\/dd\/yy$/g,
      `${mm < 10 ? `0${mm}` : mm}/${dd < 10 ? `0${dd}` : dd}/${`${yy}`.slice(
        2,
        4
      )}`
    )
    .replace(
      /mm\/dd\/yyyy$/g,
      `${mm < 10 ? `0${mm}` : mm}/${dd < 10 ? `0${dd}` : dd}/${yy}`
    )
    .replace(/d\/m\/y$/g, `${dd}/${mm}/${yy}`);
  return rs;
}

/**
 * Parse an Unix permission to CRUD permissions
 * @param {Number} perms Unix permission
 */
function unixPerms(perms) {
  let permissions = ["create", "read", "update", "delete"];
  let result = {};
  let binPerms = parseInt(perms, 10).toString(2).padStart(4, "0");
  for (var i = 0; i < permissions.length; i++) {
    result[permissions[i]] = binPerms[i] === "1";
  }
  return result;
}

/**
 *
 * @param {Object} obj
 * @param {String} path
 */
function deepFind(obj, path) {
  var paths = path.split("."),
    current = obj,
    i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

/**
 *
 * @param {Object} obj
 * @param {String} path
 * @param {String} value
 */
function deepSet(obj, path, value) {
  var paths = path.split("."),
    current = obj,
    i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  current = value;
  return current;
}

/**
 *
 * @param {mongoose.Model} model
 * @param {Object} cond
 * @param {String} fields
 * @param {{pagination, sort, language, populatedFields, multilingualFields, ...others}} options
 * @param {*} callback
 */
function getDataFunc(model, cond, fields, options, callback) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        pagination,
        sort,
        language,
        populatedFields,
        multilingualFields,
      } = options;
      const { page, offset, limit } = pagination || {};
      let pagingOpts = {
        select: fields,
        sort: sort || {},
        limit: limit || 10,
      };
      cond["active"] = true;
      // if (language) cond['languages'] = language;
      // let dfs = Object.keys(cond).filter(f => f.split('.').length > 1);
      // let deepFilter = {};
      // dfs.forEach(df => {
      // 	deepFilter[df] = cond[df];
      // 	delete cond[df];
      // });
      if (offset) pagingOpts["offset"] = offset;
      else pagingOpts["page"] = page || 1;
      let res = !pagination
        ? await model.find(cond, fields, { sort })
        : await model.paginate(cond, pagingOpts);
      // if (res.docs) dfs.forEach(df => {
      // 	res.docs = res.docs.filter(p => {
      // 		let deepExtracted = deepFind(p, df);
      // 		return deepExtracted ? (deepExtracted._id ? deepExtracted._id === deepFilter[df] : deepExtracted === deepFilter[df]) : false;
      // 	});
      // });
      // else dfs.forEach(df => {
      // 	res = res.filter(p => {
      // 		let deepExtracted = deepFind(p, df);
      // 		return deepExtracted ? (deepExtracted._id ? deepExtracted._id === deepFilter[df] : deepExtracted === deepFilter[df]) : false;
      // 	});
      // });
      let finalRes = !pagination ? res.docs || res : res;
      // if (!page && !offset && !limit) finalRes.forEach(r => {
      // 	r._doc = getByLanguage(r._doc, language);
      // });
      // else finalRes.docs.forEach(r => {
      // 	r._doc = getByLanguage(r._doc, language);
      // });
      if (populatedFields)
        await model.populate(res.docs || res, populatedFields);
      if (language && multilingualFields) {
        // console.log('language', language);
        // console.log('multilingualFields', multilingualFields);
        // console.log('model.collection.collectionName', model.collection.collectionName);
        // console.log('finalRes.docs', finalRes.docs);
        // console.log('finalRes', finalRes);
        if (finalRes.docs)
          finalRes.docs = await getByLanguage(
            finalRes.docs,
            language,
            multilingualFields,
            model.collection.collectionName
          );
        else
          finalRes = await getByLanguage(
            finalRes,
            language,
            multilingualFields,
            model.collection.collectionName
          );
      }
      if (callback) resolve(callback(null, finalRes));
      else resolve(finalRes);
    } catch (ex) {
      if (callback) resolve(callback(ex));
      else reject(ex);
    }
  });
}

/**
 *
 * @param {Array} arr Org array
 * @param {any} parent Parent ID
 */
function getNestedChildren(arr, parent) {
  var out = [];
  for (var i in arr) {
    if (!parent ? !arr[i].parent : arr[i].parent === parent) {
      var newObj = arr[i].toObject();
      var children = getNestedChildren(arr, arr[i]._id);
      if (children.length) newObj.children = children;
      out.push(newObj);
    }
  }
  return out;
}

/**
 * Get distance between two coordinates in kilometer (km)
 * @param {Object} location1 First coordinate
 * @param {Object} location2 Second coordinate
 */
function getDistance(location1, location2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Asynchronous function
 * @param {(callback) => {}} fn Function implement
 */
function asyncFunc(fn) {
  return new Promise(function (resolve, reject) {
    try {
      fn(resolve);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  toASCII,
  toHyphens,
  toUnderscore,
  toCamelCase,
  generateId,
  generateIdSync,
  generateBarcode,
  generatePassword,
  forEachAsync,
  dateDiff,
  sort,
  currencyFormating,
  getQueryParam,
  validateCard,
  toDateString,
  unixPerms,
  deepFind,
  getDataFunc,
  getNestedChildren,
  getDistance,
  asyncFunc,
};
