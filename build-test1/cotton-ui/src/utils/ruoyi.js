/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

const baseURL = process.env.VUE_APP_BASE_API

// 日期格式化
export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

// 表单重置
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields();
	}
}

// 添加日期范围
export function addDateRange(params, dateRange) {
	var search = params;
	search.beginTime = "";
	search.endTime = "";
	if (null != dateRange && '' != dateRange) {
		search.beginTime = this.dateRange[0];
		search.endTime = this.dateRange[1];
	}
	return search;
}
// 添加日期范围
export function addDateRangeAndAlias(params, dateRange, prefix) {
	var search = params;
	search[prefix + "Begin"] = "";
	search[prefix + "End"] = "";
	if (null != dateRange && '' != dateRange) {
		search[prefix + "Begin"] = dateRange[0];
		search[prefix + "End"] = dateRange[1];
	}
	return search;
}

// 多选框，join
export function joinMultiple(params, key, delimiter, alias) {
	var search = params;

	if (null != params[key] && '' != params[key] && params[key] instanceof Array) {
	   search[alias] = params[key].join(delimiter);
	}
	return search;
}

// json转字符串并移除[]
export function jsonToURL(json) {
  return Object.keys(json).map(function (key) {
    if (json[key] instanceof Array) {
      var tmp = "";
      Object.keys(json[key]).forEach(function(idx) {
        if (json[key][idx]) {
          tmp += encodeURIComponent(key) + "=" + encodeURIComponent(json[key][idx]) + "&";
        }
      })
      if (tmp.length != 0) {
        tmp = tmp.substr(0, tmp.length - 1);
      }
      return tmp;
    } else {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }
  }).join("&");
}

// json clone
export function cloneJSON(params) {
  if (null == params) {
    return null;
  }

  return JSON.parse( JSON.stringify(params) );
}

// textarea 分割
export function splitTextarea(text) {
  if (null == text || "" == text || void 0 == text) {
    return "";
  }

  return text.split(/[(\r\n)\r\n]+/);
}

// 回显数据字典
export function selectDictLabel(datas, value) {
	var actions = [];
	Object.keys(datas).map((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel);
			return false;
		}
	})
	return actions.join('');
}

// 通用下载方法
export function download(fileName) {
	window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}

// 字符串格式化(%s )
export function sprintf(str) {
	var args = arguments, flag = true, i = 1;
	str = str.replace(/%s/g, function () {
		var arg = args[i++];
		if (typeof arg === 'undefined') {
			flag = false;
			return '';
		}
		return arg;
	});
	return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
    if (!str || str == "undefined" || str == "null") {
        return "";
    }
    return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || 0
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData =  cloneData.filter(father => {
	  let branchArr = cloneData.filter(child => {
		//返回每一项的子级数组
		return father[id] === child[parentId]
	  });
	  branchArr.length > 0 ? father.children = branchArr : '';
	  //返回第一层
	  return father[parentId] === rootId;
	});
	return treeData != '' ? treeData : data;
}

//加法
export function arithmeticAdd(operandLeft, operandRight) {
  if (!operandLeft)
  operandLeft = 0
  if (!operandRight)
  operandRight = 0
  var operand1 = operandLeft.toString();
  var operand2 = operandRight.toString();
  var decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0;
  var decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0;
  var multiple = Math.pow(10, Math.max(decimalPlace1, decimalPlace2));
  return(operandLeft * multiple + operandRight * multiple) / multiple;
};

//减法
export function arithmeticSubtract(operandLeft, operandRight) {
  if (!operandLeft)
  operandLeft = 0
  if (!operandRight)
  operandRight = 0
  var operand1 = operandLeft.toString();
  var operand2 = operandRight.toString();
  var decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0;
  var decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0;
  var multiple = Math.pow(10, Math.max(decimalPlace1, decimalPlace2));
  //toFixed避免多出来小数位，如 11.3-10.12000=1.1800000000000015
  var decimalPlace = (decimalPlace1 >= decimalPlace2) ? decimalPlace1 : decimalPlace2;
  return((operandLeft * multiple - operandRight * multiple) / multiple).toFixed(decimalPlace);
};

//乘法
export function arithmeticMultiply(operandLeft, operandRight) {
  if (!operandLeft)
  operandLeft = 0
  if (!operandRight)
  operandRight = 0
  var operand1 = operandLeft.toString();
  var operand2 = operandRight.toString();
  var decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0;
  var decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0;
  var multiple1 = Math.pow(10, decimalPlace1);
  var multiple2 = Math.pow(10, decimalPlace2);
  return((operandLeft * multiple1) * (operandRight * multiple2)) / Math.pow(10, decimalPlace1 + decimalPlace2);
};

//除法
export function arithmeticDivide(operandLeft, operandRight) {
  if (!operandLeft)
  operandLeft = 0
  if (!operandRight)
  operandRight = 0
  var operand1 = operandLeft.toString();
  var operand2 = operandRight.toString();
  var decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0;
  var decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0;
  var multiple1 = Math.pow(10, decimalPlace1);
  var multiple2 = Math.pow(10, decimalPlace2);
  return((operandLeft * multiple1) / (operandRight * multiple2)) * Math.pow(10, decimalPlace2 - decimalPlace1);
};

// 对象按指定字段去重
export function deteleObject(obj, name) {
	let result = [], hash = {};
    for (let i = 0; i<obj.length; i++) {
        let elem = obj[i][name];
        if (!hash[elem]) {
            result.push(obj[i]);
            hash[elem] = true;
        }
	}
	return result
}