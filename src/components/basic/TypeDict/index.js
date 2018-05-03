class TypeDict {
  static getDescByData = (data, value) => {
    if (data == null) { return ''; }
    for (const tmp of data) {
      if (String(tmp.value) === String(value)) {
        return tmp.cesc;
      }
    }
    return '';
  }

  static getDescByRData = (valueName, descName, data, value) => {
    if (data == null) { return ''; }
    for (const tmp of data) {
      if (String(tmp[valueName]) === String(value)) {
        return tmp[descName];
      }
    }
  }
}

export default TypeDict;
